import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import { DELETE, GET, PATCHFILE, POST, POSTFILE, UPDATE } from '../../api/AXIOS';

const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => total + parseFloat(product.totalPrice), 0);
}

const calculateGST = (totalPrice,is_service,gst_percentage) => {
    if(!is_service){
        return 0;
    }
    return parseFloat(totalPrice * gst_percentage).toFixed(2);
}

const calculateGrandTotal = (totalPrice, gst, discount) => {
    let grandTotal = totalPrice + parseFloat(gst);
    if (grandTotal > 0 && grandTotal > discount) {
        grandTotal -= parseFloat(discount);
    }
    return grandTotal.toFixed(2);
}


export const CreateOnsiteOrder=createAsyncThunk('CreateOnsiteOrder',async (data)=>{
    try {
        const placeOrder=await POST('order',data);
        console.log(placeOrder)
        return placeOrder.data;
    } catch (error) {
        toast.error(error)
        console.log(error)
        throw error;
    }
})


const OnsiteOrders = createSlice({
    name: 'OnsiteOrders',
    initialState: {
        OnsiteOrderloading: false,
        submitting: false,
        products: [],
        totalPrice: 0,
        gst: 0,
        discount: 0,
        grandTotal: 0,
        is_Service:true,
        payment_method:"cash",
        gst_percentage:0.14,
        customer:{
            name:"",
            phone:"",
        },
        orderDetail:null
    },
    reducers: {
        addProduct: (state, action) => {
            const product = { ...action.payload };
            const existingProductIndex = state.products.findIndex(item => item._id === product._id);

            if (existingProductIndex === -1) {
                state.products.push(product);
            } else {
                state.products[existingProductIndex].quantity += parseInt(product.quantity || 1);
                state.products[existingProductIndex].totalPrice += parseFloat(product.totalPrice);
            }

            state.totalPrice = calculateTotalPrice(state.products);
            state.gst = calculateGST(state.totalPrice,state.is_Service,state.gst_percentage);
            state.grandTotal = calculateGrandTotal(state.totalPrice, state.gst, state.discount);
        },
        removeProduct: (state, action) => {
            const id = action.payload;
            const indexToRemove = state.products.findIndex(product => product._id === id);

            if (indexToRemove !== -1) {
                const removedProduct = state.products.splice(indexToRemove, 1)[0];
                state.totalPrice -= parseFloat(removedProduct.totalPrice);
                state.gst = calculateGST(state.totalPrice,state.is_Service,state.gst_percentage);
                state.grandTotal = calculateGrandTotal(state.totalPrice, state.gst, state.discount);
            } else {
                console.error("Product not found.");
            }
        },
        changeQuantity: (state, action) => {
            const { id, value } = action.payload;
            const product = state.products.find(item => item._id === id);

            let quantity = parseInt(value);
            if (quantity < 0) {
                toast.warning('The minimum order quantity is 1!');
                return;
            }
            if (!Number.isInteger(parseFloat(quantity))) {
                product.quantity = 0;
            } else {
                product.quantity = quantity;
            }

            const newTotalPrice = parseFloat(product.price * product.quantity);
            state.totalPrice = Math.abs((state.totalPrice - product.totalPrice) + newTotalPrice);
            product.totalPrice = newTotalPrice;
            state.gst = calculateGST(state.totalPrice,state.is_Service,state.gst_percentage);
            state.grandTotal = calculateGrandTotal(state.totalPrice, state.gst, state.discount);
        },
        handleChangeDiscount: (state, action) => {
            state.discount = action.payload;
            state.grandTotal = calculateGrandTotal(state.totalPrice, state.gst, state.discount);
        },
        updateIsService:(state)=>{
            state.is_Service = !state.is_Service;
            if(state.is_Service && state.payment_method=="cash"){
                state.gst_percentage=0.14
            }
            else if(state.is_Service && state.payment_method=="online"){
                state.gst_percentage=0.04
            }else{
                state.gst_percentage=0
            }
            state.gst = calculateGST(state.totalPrice,state.is_Service,state.gst_percentage);
        },
        updatePaymentMethod:(state,action)=>{
            state.payment_method = state.payment_method=="cash"?"online":"cash";
            if(state.is_Service && state.payment_method=="cash"){
                state.gst_percentage=0.14
            }
            else if(state.is_Service && state.payment_method=="online"){
                state.gst_percentage=0.04
            }else{
                state.gst_percentage=0
            }
            state.gst = calculateGST(state.totalPrice,state.is_Service,state.gst_percentage);
            state.grandTotal = calculateGrandTotal(state.totalPrice, state.gst, state.discount);
        },
        updateCustomer:(state,action)=>{
            state.customer={...state.customer,...action.payload};
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(CreateOnsiteOrder.fulfilled,(state,action)=>{
            state.OnsiteOrderloading=false;
            state.orderDetail=action.payload;
        }).addCase(CreateOnsiteOrder.pending,(state,action)=>{
            state.OnsiteOrderloading=true;
        }).addCase(CreateOnsiteOrder.rejected,(state,action)=>{
            state.OnsiteOrderloading=false;
        })

    }
});

export const OnsiteOrdersActions = OnsiteOrders.actions;
export default OnsiteOrders.reducer;
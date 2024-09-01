import makePayment from "../Helper/payment.js";
import Order from "../models/orders.js";


export const CreateOrder=async (req,res)=>{
    const orderDetails=req.body;
    const orderBy=req.user_id;
    try {

        if (!orderDetails) throw new Error("No Order Details Provided");

        let transactionDetails=null;
        
        // if(orderDetails.paymentMethod=='card' || orderDetails.paymentMethod=='jazzcash',orderDetails.paymentMethod=='easypaisa'){
        //     transactionDetails=makePayment(orderDetails.paymentMethod,orderDetails.paymentdetails);
        //     if(!transactionDetails){
        //         throw new Error("Unable to make Payment");
        //     }
        // }


        const createOrder= new Order({...orderDetails,"transactionDetails":transactionDetails,orderBy:orderBy});
        const orderCreated=await createOrder.save()
        if(!orderCreated){
            throw new Error("Unable to Create Order");
        }
        
        res.status(200).json({message:"Order Placed Successfully..."})

    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: error });
    }
    //   console.log(req.body);
    //   res.send("hello");
}

export const GetAllOrders=async (req,res)=>{
    try {
        const orderType= req.params.orderType
        const orderBy=req.user_id;
        const orders=await Order.find({orderType,orderBy})
        if(!orders.length<0){
            return res.status(404).json({message:"No Order Found..."})
        }
        res.status(200).json(orders)
        
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: error });
    }
}

export const GetSingleOrder=async (req,res)=>{
    try {
        const orderId= req.params.orderId
        const order=await Order.findOne({_id:orderId})
        if(!order){
            return res.status(404).json({message:"No Order Found..."})
        }
        res.status(200).json(order)
        
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: error });
    }
}

export const UpdateOrder=async (req,res)=>{
    const orderDetails=req.body;
    const orderBy=req.user_id;
    const {orderId}=req.params
    try {
        if(!orderId) return res.status(400).json({message:'Order id not found'})
        if (!orderDetails) throw new Error("No Order Details Provided");

        let transactionDetails=null;

        // if(orderDetails.paymentMethod=='card' || orderDetails.paymentMethod=='jazzcash',orderDetails.paymentMethod=='easypaisa'){
        //     transactionDetails=makePayment(orderDetails.paymentMethod,orderDetails.paymentdetails);
        //     if(!transactionDetails){
        //         throw new Error("Unable to make Payment");
        //     }
        // }
        console.log(req.body)
        const updatedOrder= await Order.findByIdAndUpdate(
            orderId,
            orderDetails,
            {
                new:true
            }
        );
        if(!updatedOrder){
           return res.status(400).json({message:'Order not found with given id'})
        }
        
        res.status(200).json({message:"Order Updated Successfully...",order:updatedOrder})

    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: error });
    }
   
}
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
            if (!orderDetails) throw new Error("Unable to Create Order");
        }
        
        res.status(200).json({message:"Order Placed Successfully..."})

    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: error });
    }
    //   console.log(req.body);
    //   res.send("hello");
}

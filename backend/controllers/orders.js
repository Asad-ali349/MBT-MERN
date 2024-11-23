import makePayment from "../Helper/payment.js";
import Order from "../models/orders.js";
import { io } from '../index.js';


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
        
        // Emit socket event for new order
        io.emit('newOrder', orderCreated);
        
        res.status(200).json({message:"Order Placed Successfully...",order:orderCreated})

    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: error });
    }
}

export const GetAllOrders=async (req,res)=>{
    try {
        const { date, status } = req.query;
        const validStatuses = ['pending', 'completed'];

        // Validate status if provided
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status. Must be either 'pending' or 'completed'" });
        }

        // Create a new Date object for the current date
        const now = new Date();
        // If start date is provided, use it; otherwise, set to the first day of the current month at 3 PM
        let startDate;
        if (date) {
            startDate = new Date(date);
            // Set the time to 3 PM
            startDate.setHours(10, 0, 0, 0); //  10AM = 3pm on server
        } else {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0); // 3 PM on the 1st of the month
        }

        // If end date is provided, use it; otherwise, set to 7 AM of the next day
        let endDate;
        if (date) {
            endDate = new Date(date);
            // Set the time to 7 AM of the next day
            endDate.setHours(6, 0, 0, 0); // 6 AM
            endDate.setDate(endDate.getDate() + 1); // Next day
        } else {
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 7, 0, 0, 0); // 7 AM of the next day
        }

        const orderType= req.params.orderType
        const orderBy=req.user_id;
        // const orders=await Order.find({orderType,orderBy})
        const matchQuery = {
            orderType,
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        };

        if (status) {
            matchQuery.status = status;
        }

        const orders=await Order.aggregate([
            {
                $match: matchQuery
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

       
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

export const UpdateOrderStatus=async (req,res)=>{
    const {status}=req.body;
    const {orderId}=req.params
    
    try {
        if(!orderId) return res.status(400).json({message:'Order id is required'})
        const updatedOrder= await Order.findByIdAndUpdate(
            orderId,
            {status},
            {
                new:true
            }
        );
        if(!updatedOrder){
           return res.status(400).json({message:'Order not found with given id'})
        }
        
        // Emit socket event for order status update
        io.emit('orderStatusUpdate', updatedOrder);
        
        res.status(200).json({message:"Order Status Updated Successfully...",order:updatedOrder})

    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: error });
    }
   
}

export const DeleteOrder= async (req,res)=>{
    const {orderId} = req.params;
    try {
        // const product=await products.find({category_id:id});
        // if(product.length>0){
        //     return res.status(400).json({ message: "This categpory is used by any product..."}); 
        // }
        const deleteOrder=await Order.findOneAndDelete({_id:orderId});
        return res.status(200).json({ message: "Order Deleted Successfully",order:deleteOrder});
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ message: error });
    }

}

export const GetProductStats = async (req, res) => {
    try {
        const { date } = req.query;

        // Create a new Date object for the current date
        const now = new Date();
        // If start date is provided, use it; otherwise, set to the first day of the current month at 3 PM
        let startDate;
        if (date) {
            startDate = new Date(date);
            // Set the time to 3 PM
            startDate.setHours(10, 0, 0, 0); //  10AM = 3pm on server
        } else {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0); // 3 PM on the 1st of the month
        }

        // If end date is provided, use it; otherwise, set to 7 AM of the next day
        let endDate;
        if (date) {
            endDate = new Date(date);
            // Set the time to 7 AM of the next day
            endDate.setHours(6, 0, 0, 0); // 6 AM
            endDate.setDate(endDate.getDate() + 1); // Next day
        } else {
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 7, 0, 0, 0); // 7 AM of the next day
        }


        // Aggregation pipeline to calculate the total quantity sold for each product
        const productStats = await Order.aggregate([
            { $match: {
                createdAt: {
                    $gte: startDate, // Greater than or equal to start date
                    $lte: endDate // Less than or equal to end date
                }
            } }, // Apply date filter
            { $unwind: "$products" }, // Unwind the products array to handle each product separately
            { 
                $group: {
                    _id: "$products._id", // Group by product ID
                    totalSold: { $sum: "$products.quantity" }, // Sum the quantity for each product
                    productName: { $first: "$products.name" }, // Get the product name
                    soldAmount: { $sum: "$products.price" } // Get the product name
                }
            },
            {
                $lookup: {
                    from: "products", // Reference the Product collection (adjust if needed)
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" }, // Unwind the product details if needed
            { 
                $project: {
                    _id: 1,
                    productName: 1,
                    totalSold: 1,
                    soldAmount:1,
                }
            }
        ]);

        res.status(200).json(productStats);
    } catch (error) {
        console.log('Error:===>', error);
        res.status(505).json({ message: error.message });
    }
};

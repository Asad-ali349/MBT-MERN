
import mongoose from "mongoose";
import sequence from 'mongoose-sequence';

const Schema = mongoose.Schema;

// Initialize the plugin
const AutoIncrement = sequence(mongoose);

const OrderSchema = new Schema({
    customer:{
        name:{
            type:String,
            default:""
        },
        phone:{
            type:String,
            default:""
        },
        table_number:{
            type:String,
            default:""
        }      
    },
    orderType: {
        type: String,
        enum: ['onsite', 'online'],
        required: true
    },
    is_Service:{
        type:Boolean,
        default:false
    },
    products: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
       
        category_id: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        name: {
            type: String,
            required: true
        },
        image: {
            public_id:{type:String},
            url: {type:String}
        },
        description: {
            type: String
        },
        discount: {
            type: Number
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        
    }],
    discount: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    gst: {
        type: Number,
        default: 0
    },
    deliveryCharges: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentDetails: {
        type: String,
    },
    orderBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default:'pending'
    },
    orderNumber: { type: Number },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

// Apply the AutoIncrement plugin to your schema
OrderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });

const Order = mongoose.model('Order', OrderSchema);

export default Order;

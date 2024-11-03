import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category_id:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'Category'
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        default:null
    },
    discount:{
        type:String,
        default:null
    },
    status:{
        type: String,
        enum:['available', 'notAvailable'],
        default:'available'
    }
},{
    timestamps:true
});

export default mongoose.model('Product', ProductSchema);



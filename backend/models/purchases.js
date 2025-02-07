import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    product:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'Product'
    },
    purchase_price:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    unit:{
        type:String,
        required:true
    },
},{
    timestamps:true
});

export default mongoose.model('Purchase', purchaseSchema);



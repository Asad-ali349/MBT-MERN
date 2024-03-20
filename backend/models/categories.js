import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        default:null
    },
    
},{
    timestamps:true
});

export default mongoose.model('Category', UserSchema);



import mongoose from "mongoose";
import sequence from 'mongoose-sequence';
import cron from 'node-cron';

const Schema = mongoose.Schema;

// Initialize the plugin
const AutoIncrement = sequence(mongoose);

const OrderSchema = new Schema({
    customer: {
        name: { type: String, default: "" },
        phone: { type: String, default: "" },
        table_number: { type: String, default: "" }
    },
    orderType: {
        type: String,
        enum: ['onsite', 'online'],
        required: true
    },
    is_Service: { type: Boolean, default: false },
    products: [{
        _id: { type: Schema.Types.ObjectId, ref: 'Product' },
        category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
        name: { type: String, required: true },
        image: { public_id: { type: String }, url: { type: String } },
        description: { type: String },
        discount: { type: Number },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }],
    discount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    gst: { type: Number, default: 0 },
    deliveryCharges: { type: Number, default: 0 },
    paymentMethod: { type: String, required: true },
    paymentDetails: { type: String },
    orderBy: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    orderNumber: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

// Apply AutoIncrement plugin
OrderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber', start: 0 });

const Order = mongoose.model('Order', OrderSchema);

// Schedule a cron job to reset the counter at 12:00 PM local time
cron.schedule('0 12 * * *', async () => {
    console.log("Resetting order number counter at 12:00 PM...");

    if (mongoose.connection.readyState !== 1) {
        console.log("Database not connected. Skipping reset.");
        return;
    }

    try {
        const result = await mongoose.connection.db.collection("counters").updateOne(
            { id: "orderNumber" }, // ✅ Corrected field to match MongoDB Compass data
            { $set: { seq: 0 } }
        );

        if (result.modifiedCount > 0) {
            console.log("✅ Order number counter reset successfully.");
        } else {
            console.log("⚠️ No counter found or already reset.");
        }
    } catch (error) {
        console.error("❌ Error resetting order number counter:", error);
    }
});

export default Order;

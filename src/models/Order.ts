import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    fullName: { type:String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    deliveryArea: { type: String, required: true},
    cartItems: [
        {
            title: String,
            price: Number,
            quantity: Number,
            selectedSize: String,
            image: String,
        }
    ],
    subtotal: Number,
    deliveryFee: Number,
    totalAmount: Number,
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now },
})

const Order = models.Order || model("Order", OrderSchema);
export default Order;
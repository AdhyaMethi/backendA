import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price:{
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true}
);

cartSchema.pre("save", function(next){
    this.totalPrice = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
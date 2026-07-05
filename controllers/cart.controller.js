import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            cart = Cart.create({ userId: req.user._id, items: [] });
        }
        return res.status(200).json({
            message: "Cart retrieved successfully",
            success: true,
            cart: cart
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Product ID and quantity are required",
                success: false
            })
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                message: "Insufficient stock",
                success: false
            })
        }

        let cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            cart = await Cart.create({ userId: req.user._id, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price: product.price });
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.equals(productId));
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price: product.price });
        }

        await cart.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            success: true,
            cart: cart
        })


    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}

export const updateCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1",
                success: false
            })
        }
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            })
        }
        const item = cart.items.find(item => item.productId.toString() === itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found in cart",
                success: false
            })
        }

        const product = await Product.findById(item.productId);
        if (product.stock < quantity) {
            return res.status(400).json({
                message: "Insufficient stock",
                success: false
            })
        }
        item.quantity = quantity;
        await cart.save();

        return res.status(200).json({
            message: "Cart updated successfully",
            success: true,
            cart: cart
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            })
        }
        const item = cart.items.find(item => item.productId.toString() === itemId);
        if (!item) {
            return res.status(404).json({
                message: "Item not found in cart",
                success: false
            })
        }
        cart.items = cart.items.filter(item => item.productId.toString() !== itemId);
        await cart.save();
        return res.status(200).json({
            message: "Item removed from cart successfully",
            success: true,
            cart: cart
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            })
        }
        cart.items = [];
        await cart.save();
        return res.status(200).json({
            message: "Cart cleared successfully",
            success: true,
            cart: cart
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}
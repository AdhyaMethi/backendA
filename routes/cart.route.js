import express from "express";
import { getCart, addToCart, updateCart, removeFromCart, clearCart } from "../controllers/cart.controller";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/getCart",verifyToken,getCart);
router.post("/add", verifyToken, addToCart);
router.put("/update/:itemId", verifyToken, updateCart);
router.delete("/remove/:itemId", verifyToken, removeFromCart);
router.delete("/clear", verifyToken, clearCart);

export default router;
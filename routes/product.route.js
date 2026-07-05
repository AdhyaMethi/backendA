import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct  } from "../controllers/product.controller";

const router = express.Router();

router.get("/", getAllProducts); /api/products/
router.get("/:id", getProductById);
router.post("/create", createProduct); // /api/products/create
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
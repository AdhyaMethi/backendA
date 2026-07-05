import Product from "../models/product.model";

export const getAllProducts = async (req, res) => {
    try {
        const { search="",category="", minPrice, maxPrice, sort, page=1 } = req.query;
        const pageSize = 10;
        let filter = {};

        const total = await Product.countDocuments();
        const totalPages = Math.ceil(total / pageSize);

        const products = await Product.find({});
        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products,
            total,
            totalPages,
            currentPage: parseInt(page)
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        // const product = await Product.findOne({_id: productId});
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const {name, description, price, category, stock, imageUrl} = req.body;
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                message: "All fields required",
                success: false
            })
        }
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });
        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {name, description, price, category, stock, imageUrl} = req.body;
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        const updatedProduct = await Product.UpdateOne({_id: productId}, {
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        }, { new: true });
        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product: updatedProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
             success: false,
            error: error
        })
    }
        
}

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            product: deletedProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}
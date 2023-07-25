"use strict";

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Product = require("../models/Product")
const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        console.log("Error occured trying to add new product", error);
        res.status(500).json(error);
    }
})

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {        
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        console.log(`Attempting to update product ID: ${req.params.id}. with`, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log("Error occurred when updating product.", error);
        res.status(500).json(error);
    }
})

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    try {
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            if (qCategory === "all") {
                products = await Product.find();
            } else {
                products = await Product.find({
                    categories: {
                        $in: [qCategory],
                    }
                })
            }
        }


        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await Product.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data);
    } catch (error) {
        console.log("Error occurred getting user stats", error);
        res.status(500).json(error);
    }
})

module.exports = router;
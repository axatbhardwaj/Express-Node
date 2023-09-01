const { json } = require('express');
const Product = require('../models/product');
const moment = require('moment');


const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ products });
}

const getAllProducts = async (req, res) => {

    const timeStamp = moment().format('HH:mm:ss,DD-MM-YYYY');
    console.log(`function called : getAllProducts ,TIMESTAMP:${timeStamp}`);
    const { name: productName } = req.query;
    if (!productName) {
        const products = await Product.find({});
        res.status(200).json({
            count: products.length
            , products: products
        });
    }
    const products = await Product.find({ name: productName });
    res.status(200).json({ products })
}

const getProduct = async (req, res) => {
    // console.log(productName);
    const product = await Product.findOne({ name: productName });
    if (!product) {
        res.status(404).json({ message: `no product with name: ${productName}` });
    }
    res.status(200).json({ product });
}

const getFeaturedProducts = async (req, res) => {
    const product = await Product.find({ featured: true });
    if (!product) {
        res.status(404).json({ message: `no featured products` });
    }
    res.status(200).json({ product });
}

module.exports = { getFeaturedProducts, getAllProducts, getAllProductsStatic, getProduct };
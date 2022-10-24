import { Category, City, Product } from "../../models/index.js";

const cust_controller = {
    // categories
    async getAllCategories(req,res,next){
        try {
            let categories = await Category.find().limit(req.query.params)
            res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    },
    async getSingleCategory(req,res,next){
        let cat_product
        try {
            let category = await Category.findOne({_id:req.params.id})
            try {
                 cat_product = await Product.find({pro_category:category._id}).populate(['pro_category','seller_id','discount','pro_addon','pro_attr'])
            } catch (error) {
                next(error)
            }
            res.status(200).json([category,cat_product])
        } catch (error) {
            next(error)
        }
    },

    // products
    async getAllProducts(req,res,next){
        try {
            let product = await Product.find().limit(req.query.params).populate(['pro_category','seller_id','discount','pro_addon','pro_attr'])
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    },
    async getSingleProduct(req,res,next){
        try {
            let product = await Product.findOne({_id:req.params.id}).populate(['pro_category','seller_id','discount','pro_addon','pro_attr'])
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    },

    // cities
     async getAllCities(req,res,next){
        try {
            let city = await City.find().limit(req.query.params)
            res.status(200).json(city)
        } catch (error) {
            next(error)
        }
    },
    async getSingleCity(req,res,next){
        try {
            let city = await City.findOne({_id:req.params.id})
            res.status(200).json(city)
        } catch (error) {
            next(error)
        }
    },
}

export default cust_controller
import { Category, City, Product, User,Addon,Attr } from "../../models/index.js";

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
        let city_business
        try {
            let city = await City.findOne({_id:req.params.id})

            try {
                city_business = await User.find({$and:[{city:city._id},{role:"seller"}]}).populate(['city','business_type','business_category'])
            } catch (error) {
                next(error)
            }
            res.status(200).json([city,city_business])
        } catch (error) {
            next(error)
        }
    },

    // Businesses
    async getAllBusiness(req,res,next){
        try {
            let businesses = await User.find({role : "seller" }).limit(req.query.params).populate(['city','business_type','business_category'])
            res.status(200).json(businesses)
        } catch (error) {
            next(error)
        }
    },
    async getSingleBusiness(req,res,next){
        let business_product
        let business_category
        try {
            let business = await User.findOne({$and:[{_id:req.params.id},{role : "seller" }]}).populate(['city','business_type','business_category'])

            try {
                business_product = await Product.find({seller_id:business._id}).populate(['pro_category','seller_id','discount','pro_addon','pro_attr'])
            } catch (error) {
                next(error)
            }

            try {
                business_category = await Category.find({seller_id:business._id})
            } catch (error) {
                next(error)
            }

            res.status(200).json([business,business_product,business_category])
        } catch (error) {
            next(error)
        }
    },
    async getCartDetails(req,res,next){
        try {
            let cart_product = await Product.findOne({_id:req.params.id},{pro_category:0,pro_addon:0,pro_attr:0,discount:0})

            let cart_pro_category = await Category.findOne({_id:req.params.id})
            let cart_pro_addon = await Addon.findOne({_id:req.params.id})
            let cart_pro_attr = await Attr.findOne({_id:req.params.id})
            let cart_pro_seller = await User.findOne({_id:req.params.id})




            res.status(200).json([cart_product,cart_pro_addon,cart_pro_attr,cart_pro_category,cart_pro_seller])
        } catch (error) {
            next(error)
        }
    },

}

export default cust_controller
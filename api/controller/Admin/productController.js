import { Product } from "../../models/index.js";
import upload from "../../utils/multer.js"
import {cloudinary} from "../../utils/cloudinary.js"
import path from "path"
// import multer from "multer"



const productController = {
    async getProduct(req,res,next){
        let product
        try {
            if(req.query.user_role === "admin"){
                 product = await Product.find().populate(['pro_category','seller_id','discount','pro_addon','pro_attr'])
            }
            else if(req.query.user_role === "seller"){
                 product = await Product.find({seller_id:req.query.user_id}).populate(['pro_category','seller_id','discount','pro_addon','pro_attr'])

            }
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    },
    async getSingleProduct(req,res,next){
        try {
            const single_product = await Product.findOne({_id:req.params.id}).populate(['pro_category','seller_id','discount','pro_addon','pro_attr'])
            res.status(200).json(single_product)
        } catch (error) {
            next(error)
            
        }
    },
    async addProduct(req,res,next){

        const {pro_name,pro_desc,pro_price,pro_addon,discount,pro_attr,pro_category} = JSON.parse(req.body.name)


        try {
            const exists = await Product.exists({pro_name:pro_name})

            if(exists){
                return res.status(409).send("Product name already exists.")
            }
        } catch (error) {
            next(error)
        }

       try {

        // upload image to cloudinary
        const image_file = req.file.path
          const result = await cloudinary.uploader.upload(image_file, {
              upload_preset: 'upload',
              use_filename: true,
              unique_filename: false,
              overwrite: true,
          });

        //   const {pro_name,pro_desc,pro_price,pro_addon,discount,pro_attr,pro_category} = JSON.parse(req.body.name)

        const product = new Product({
            pro_name,
            pro_desc,
            pro_price,
            pro_addon,
            discount,
            pro_attr,
            pro_category,
            seller_id : req.query.user_id,
            pro_image : result.secure_url,
            cloudinary_id : result.public_id
        })

        try {
           product.save().then((product)=>{
            res.status(200).json(["Product Added Successfully.",product])
           })
        } catch (error) {
            next(error)
        }


         // image upload
        //  var storage =  multer.diskStorage({
        //     destination:(req,file,cb)=>{
        //         cb(null,"../uploads/")
        //     },
        //     filename : (req,file,cb)=>{
        //         cb(null,file.fieldname + "_" + Date.now() + "_" + file.originalname)
        //     }
        // })

        // var upload = multer({
        //     storage: storage,
        //     fileFilter:(req,file,cb)=>{
        //         if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
        //             cb(null,true)
        //         }else{
        //             cb(null,false)
        //             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        //         }
                
        //     },
        //     limits: {fileSize: 2097152}
        // }).single("pro_image")

        // upload(req,res,(err)=>{
        //     if(err){
        //         console.log(err);
        //         return next(err)
        //     }

        //     const product = new Product({
        //         ...req.body,
        //         seller_id : req.query.user_id,
        //     })

        //     try {
        //        product.save().then((product)=>{
        //         res.status(200).json(product)
        //        })
        //     } catch (error) {
        //         next(error)
        //     }

        // })
        
       } catch (error) {
        next(error);
       }
    },
   async deleteProduct(req,res,next){
    try {
        // get product details
        let product = await Product.findOne({_id:req.params.id})

        // delete image from cloudinary
        await cloudinary.uploader.destroy(product.cloudinary_id)

        // finally delete product
        await Product.deleteOne({_id:req.params.id})
        res.status(200).json("Product Deleted.")
    } catch (error) {
        next(error)
    }
    }
}

export default productController
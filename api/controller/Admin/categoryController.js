import { Category } from "../../models/index.js";

const categoryController = {
    async getCategory(req,res,next){
        let category
        try {
            if(req.query.user_role === "admin"){
                 category = await Category.find(null,null,{sort : {'createdAt' : -1}}).populate('seller_id')
            }
            else if(req.query.user_role === "seller"){
                 category = await Category.find({seller_id:req.query.user_id},null,{sort : {'createdAt' : -1}})

            }
            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    },
    async getSingleCategory(req,res,next){

        try {
                 const single_category = await Category.findOne({_id:req.params.id})
                
            res.status(200).json(single_category)
        } catch (error) {
            next(error)
        }
    },
    async addCat(req,res,next){
        
        try {
            const exists = await Category.exists({cat_name:req.body.cat_name})

            if(exists){
                return res.status(409).send("Category name already exists.")
            }

        } catch (error) {
            next(error)
        }

        const newCategory = new Category({
            cat_name : req.body.cat_name,
            seller_id : req.query.user_id
           
        })

        try {
           await newCategory.save()
           res.status(200).json(["New Category Added.",newCategory])
        } catch (error) {
            next(error)
        }
    },
    async deleteCat(req,res,next){
        try {
            const deleteCat = await Category.deleteOne({_id:req.params.id})

            res.status(200).json("Category Deleted.")
        } catch (error) {
            next(error)
        }
    },
    async updateCat(req,res,next){

        try {
            const exists = await Category.exists({$and:[{cat_name:req.body.cat_name},{_id:{$ne:req.query.category_id}}]})

            if(exists){
                return res.status(409).send("Category name already exists.")
            }

        } catch (error) {
            next(error)
        }

        try {
            const updateCat = await Category.updateOne({_id:req.query.category_id},{$set:req.body})

            res.status(200).json("Category Updated.")

        } catch (error) {
            next(error)
        }
    }
}

export default categoryController
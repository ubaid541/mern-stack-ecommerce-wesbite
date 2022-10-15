import { Attr } from "../../models/index.js";

const attrController = {
    async getAttr(req,res,next){
        let attribute
        try {
            if(req.query.user_role === "admin"){
                 attribute = await Attr.find(null,null,{sort : {'createdAt' : -1}}).populate('seller_id')
            }
            else if(req.query.user_role === "seller"){
                 attribute = await Attr.find({seller_id:req.query.user_id},null,{sort : {'createdAt' : -1}})

            }
            res.status(200).json(attribute)
        } catch (error) {
            next(error)
        }

    },
    async getSingleAttr(req,res,next){

        try {
                 const single_attr = await Attr.findOne({_id:req.params.id})
                
            res.status(200).json(single_attr)
        } catch (error) {
            next(error)
        }
    },
    async addAttr(req,res,next){
        try {
            const exists = await Attr.exists({attr_name:req.body.attr_name})

            if(exists){
                return res.status(409).send("Attribute name already exists.")
            }

        } catch (error) {
            next(error)
        }

        const newAttr = new Attr({
            ...req.body,
            seller_id : req.query.user_id
        })

        try {
           await newAttr.save()
           res.status(200).json(["New Attribute Added",newAttr])
        } catch (error) {
            next(error)
        }
    },
    async deleteAttr(req,res,next){
        try {
            const deleteAttr = await Attr.deleteOne({_id:req.params.id})
            res.status(200).json("Attribute Deleted.")
        } catch (error) {
            next(error)
        }
    },
    async updateAttr(req,res,next){

        try {
            const exists = await Attr.exists({$and :[{attr_name:req.body.attr_name},{_id : {$ne : req.query.attr_id}}]})

            if(exists){
                return res.status(409).send("Attribute name already exists.")
            }

        } catch (error) {
            next(error)
        }

        try {
            const updateAttr = await Attr.updateOne({_id:req.query.attr_id},{$set:req.body})

            res.status(200).json("Attribute Updated.")

        } catch (error) {
            next(error)
        }
    }
}

export default attrController
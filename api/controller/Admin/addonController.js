import { Addon } from "../../models/index.js";

const addonContoller = {
    async getAddons(req,res,next){
        let addons
        try {
            if(req.query.user_role === "admin"){
                 addons = await Addon.find(null,null,{sort : {'createdAt' : -1}}).populate('seller_id')
            }
            else if(req.query.user_role === "seller"){
                 addons = await Addon.find({seller_id:req.query.user_id},null,{sort : {'createdAt' : -1}})
            }
            res.status(200).json(addons)
        } catch (error) {
            next(error)
        }

    },
    async getSingleAddon(req,res,next){

        try {
                 const single_addon = await Addon.findOne({_id:req.params.id})
                
            res.status(200).json(single_addon)
        } catch (error) {
            next(error)
        }
    },
    async addAddon(req,res,next){
        try {
            const exists = await Addon.exists({addon_name:req.body.addon_name})

            if(exists){
                return res.status(409).send("Addon name already exists.")
            }

        } catch (error) {
            next(error)
        }

        const {addon_name,addon_price} = req.body

        const newAddon = new Addon({
            ...req.body,
            seller_id : req.query.user_id
        })


        try {
           await newAddon.save()
           res.status(200).json(["New Addon Added",newAddon])
        } catch (error) {
            next(error)
        }
    },
    async deleteAddon(req,res,next){
        try {
            const deleteAddon = await Addon.deleteOne({_id:req.params.id})
            res.status(200).json("Addon Deleted.")
        } catch (error) {
            next(error)
        }
    },
    async updateAddon(req,res,next){

        try {
            const exists = await Addon.exists({$and : [{addon_name:req.body.addon_name},{_id : {$ne : req.query.addon_id}}]})

            if(exists){
                return res.status(409).send("Addon name already exists.")
            }

        } catch (error) {
            next(error)
        }

        try {
            const updateAddon = await Addon.updateOne({_id:req.query.addon_id},{$set:req.body})
            res.status(200).json("Addon Updated.")

        } catch (error) {
            next(error)
        }
    }

}

export default addonContoller


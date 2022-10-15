import { Coupon } from "../../models/index.js";


const couponController = {
    async getCoupon(req,res,next){
        let coupon
        try {
            if(req.query.user_role === "admin"){
                 coupon = await Coupon.find(null,null,{sort : {'createdAt' : -1}}).populate('seller_id')
            }
            else if(req.query.user_role === "seller"){
                 coupon = await Coupon.find({seller_id:req.query.user_id},null,{sort : {'createdAt' : -1}})

            }
            res.status(200).json(coupon)
        } catch (error) {
            next(error)
        }
    },
    async getSingleCoupon(req,res,next){

        try {
                 const single_coupon = await Coupon.findOne({_id:req.params.id})
                
            res.status(200).json(single_coupon)
        } catch (error) {
            next(error)
        }
    },
    async addCoupon(req,res,next){
        try {
            const exists = await Coupon.exists({coupon_name:req.body.coupon_name})

            if(exists){
                return res.status(409).send("Coupon name already exists.")
            }

        } catch (error) {
            next(error)
        }

        const newCoupon = new Coupon({
            ...req.body,
            seller_id : req.query.user_id
        })

        try {
           await newCoupon.save()
           res.status(200).json(["New Coupon Added",newCoupon])
        } catch (error) {
            next(error)
        }
    },
    async deleteCoupon(req,res,next){
        try {
            const deleteCoupon = await Coupon.deleteOne({_id:req.params.id})
            res.status(200).json("Coupon Deleted.")
        } catch (error) {
            next(error)
        }
    },
    async updateCoupon(req,res,next){

        try {
            const exists = await Coupon.exists({$and :[{coupon_name:req.body.coupon_name
            },{_id : {$ne : req.query.coupon_id}}]})

            if(exists){
                return res.status(409).send("Coupon name already exists.")
            }

        } catch (error) {
            next(error)
        }

        try {
            const {coupon_name,coupon_desc,coupon_value,coupon_expired,coupon_status} = req.body.updated_coupon

            const updateCat = await Coupon.updateOne({_id:req.query.coupon_id},{$set:{coupon_name : coupon_name,coupon_desc:coupon_desc,coupon_value:coupon_value,coupon_expired : coupon_expired,coupon_status:coupon_status}})

            res.status(200).json("Coupon Updated.")

        } catch (error) {
            next(error)
        }
    }
}

export default couponController
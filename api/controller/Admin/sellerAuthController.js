import { User } from "../../models/index.js";
import bcrypt from "bcryptjs"
import {createError} from "../../utils/error.js"
import jwt from "jsonwebtoken"

const sellerAuthController = {
    async register(req,res,next){

        //Check if username,email or business name exists
        try {
            const exists = await User.exists({$or:[{email:req.body.email},{username:req.body.username},{business_name:req.body.business_name}]})

            if(exists){
                return res.status(409).json("Email,username or business name already exists.")
            }

        } catch (error) {
            next(error)
        }


        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const newSeller = new User({
            ...req.body,
            password:hashedPassword
        })

        try {
           const new_seller = await newSeller.save()
           res.status(200).json(["Successfully registered as seller.",new_seller])
        } catch (error) {
            next(error)
        }
    },
    async login(req,res,next){
        try {
            const seller = await User.findOne({username: req.body.username})

            if(!seller){
                return next(createError(404,"User not found!"))
            }

            const checkPassword = await bcrypt.compare(req.body.password,seller.password)

            if(!checkPassword) return next(createError(400,"Wrong password or username!!"))

            // create token
            const token = jwt.sign(
                {id:seller._id,role : seller.role},
                process.env.JWT,{expiresIn:'1d'}
                )

            const {password,role,...otherDetails} = seller._doc


            res.cookie("access_token",token,{
                httpOnly : true,
            }).status(200).send({details:{...otherDetails},role})

        } catch (error) {
            next(error)
        }
    },
    async logout(req,res,next){
       try {
        res.cookie("access_token",'',{maxAge: 1}).send("Logged out.")
       } catch (error) {
        console.log(error);
       }
    }
}

export default sellerAuthController

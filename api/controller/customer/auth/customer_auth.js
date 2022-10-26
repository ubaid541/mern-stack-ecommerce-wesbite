import { User } from "../../../models/index.js";
import bcrypt from "bcryptjs"
import {createError} from "../../../utils/error.js"
import jwt from "jsonwebtoken"

const customerAuthController = {
    async register(req,res,next){

        //Check if username or email  exists
        try {
            const exists = await User.exists({$or:[{email:req.body.email},{username:req.body.username},]})

            if(exists){
                return res.status(409).json("Email or username  already exists.")
            }

        } catch (error) {
            next(error)
        }


        const hashedPassword = await bcrypt.hash(req.body.password,10)

     
        const newCustomer = new User({
            ...req.body,
               role:req.query.user_role,
            password:hashedPassword
        })

        try {
           const new_customer = await newCustomer.save()
           res.status(200).json(["Successfully registered as Customer.",new_customer])
        } catch (error) {
            next(error)
        }
    },
    async login(req,res,next){

        try {
            const customer = await User.findOne({$and:[{username: req.body.username},{role:req.query.user_role}]})

            if(!customer){
                return next(createError(404,"User not found!"))
            }

            const checkPassword = await bcrypt.compare(req.body.password,customer.password)

            if(!checkPassword) return next(createError(400,"Wrong password or username!!"))

            // create token
            const token = jwt.sign(
                {id:customer._id,role : customer.role},
                process.env.JWT,{expiresIn:'1d'}
                )

            const {password,role,...otherDetails} = customer._doc


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

export default customerAuthController

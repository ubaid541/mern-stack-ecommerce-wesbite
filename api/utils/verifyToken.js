import jwt from "jsonwebtoken"
import {createError} from "./error.js"


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401,"You are not authenticated."))
    }

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return next(createError(403,"Token is not valid."))
        }

        req.user = user
        next()
    })
}

export const verifySellerAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id || req.user.role === "admin" ){
            next()
        }else{
                return next(createError(403,"You are not authorized."))
        }
    })
}

export const verifyseller = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id  && req.user.role === "seller" ){
            next()
        }else{
                return next(createError(403,"You are not a seller."))
        }
    })
}

export const verifycustomer = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id  && req.user.role === "customer" ){
            next()
        }else{
                return next(createError(403,"You are not a customer."))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.role === "admin" ){
            next()
        }else{
                return next(createError(403,"You are not admin."))
        }
    })
}
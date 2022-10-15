import jwt from "jsonwebtoken"
import {createError} from "./error.js"


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401,"You are not authenticated."))
    }

    jwt.verify(token,process.env.JWT,(err,seller)=>{
        if(err){
            return next(createError(403,"Token is not valid."))
        }

        req.seller = seller
        next()
    })
}

export const verifySellerAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.seller.id || req.seller.role === "admin" ){
            next()
        }else{
                return next(createError(403,"You are not authorized."))
        }
    })
}

export const verifyseller = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.seller.id  && req.seller.role === "seller" ){
            next()
        }else{
                return next(createError(403,"You are not a seller."))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.seller.role === "admin" ){
            next()
        }else{
                return next(createError(403,"You are not admin."))
        }
    })
}
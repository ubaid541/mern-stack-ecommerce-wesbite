import express from 'express'
const router = express.Router()

import {b_details} from "../controller/index.js"
import {verifyAdmin, verifyseller, verifySellerAdmin, verifyToken} from "../utils/verifyToken.js"

import {addonContoller} from "../controller/index.js"
import {attrController} from "../controller/index.js"
import {sellerAuthController} from "../controller/index.js"
import {categoryController} from "../controller/index.js"
import {couponController} from "../controller/index.js"
import {productController} from "../controller/index.js"
import cust_controller from '../controller/customer/customer_controller.js'
import upload from '../utils/multer.js'

// <----- ADMIN ROUTES ----->
router.get('/business_registeration',b_details.get_b_details)

//  <----- SELLER ROUTES ----->

router.post('/auth/admin/register',sellerAuthController.register)
router.post('/auth/admin/login',sellerAuthController.login)
router.post('/auth/admin/logout',sellerAuthController.logout)

router.get('/addons',verifySellerAdmin,addonContoller.getAddons)
router.get('/single-addon/:id',verifyseller,addonContoller.getSingleAddon)
router.post('/addons/addaddons',verifyseller,addonContoller.addAddon)
router.delete('/addons/deleteAddon/:id',verifyseller,addonContoller.deleteAddon)
router.put('/addons/updateAddon/',verifyseller,addonContoller.updateAddon)

router.get('/attributes',verifySellerAdmin,attrController.getAttr)
router.get('/single-attr/:id',verifyseller,attrController.getSingleAttr)
router.post('/attributes/addAttr',verifyseller,attrController.addAttr)
router.delete('/attributes/deleteAttr/:id',verifyseller,attrController.deleteAttr)
router.put('/attributes/updateAttr/',verifyseller,attrController.updateAttr)

router.get('/categories',verifySellerAdmin,categoryController.getCategory)
router.get('/single-category/:id',verifyseller,categoryController.getSingleCategory)
router.post('/categories/addCategory',verifyseller,categoryController.addCat)
router.delete('/categories/deleteCategory/:id',verifyseller,categoryController.deleteCat)
router.put('/categories/updateCategory',verifyseller,categoryController.updateCat)

router.get('/coupons',verifySellerAdmin,couponController.getCoupon)
router.get('/single-coupon/:id',verifyseller,couponController.getSingleCoupon)
router.post('/coupons/addCoupon',verifyseller,couponController.addCoupon)
router.delete('/coupons/deleteCoupon/:id',verifyseller,couponController.deleteCoupon)
router.put('/coupons/updateCoupon',verifyseller,couponController.updateCoupon)

router.get('/products',verifySellerAdmin,productController.getProduct)
router.get('/single-product/:id',verifyseller,productController.getSingleProduct)
router.post('/products/addProduct',upload.single("pro_image"),verifyseller,productController.addProduct)
router.delete('/products/deleteProduct/:id',verifyseller,productController.deleteProduct)
router.put('/products/updateProduct/:id',verifyseller,couponController.updateCoupon)

// <----- CUSOTMER ROUTES ----->
router.get('/customer/category',cust_controller.getAllCategories)
router.get('/customer/singlecategory/:id',cust_controller.getSingleCategory)
router.get('/customer/singlecategory/:id',cust_controller.getSingleCategory)
router.get('/customer/product',cust_controller.getAllProducts)
router.get('/customer/singleproduct/:id',cust_controller.getSingleProduct)
router.get('/customer/city',cust_controller.getAllCities)


export default router
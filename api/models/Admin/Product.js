import mongoose from "mongoose"

const Schema = mongoose.Schema

const productSchema = new Schema({
    pro_name : {type: String, required:true},
    pro_desc : {type: String, required:true},
    pro_price : {type: Number, required:true},
    discount : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Coupon',
    },
    pro_category : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required : true
    },
    pro_addon : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Addon',
    },
    pro_attr : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Attribute',
    },
    seller_id : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true
       
    },
    pro_image : {type : String, required : true},
   cloudinary_id : {type: String,required : true}
 }, {timestamps: true})

export default mongoose.model('Product',productSchema)
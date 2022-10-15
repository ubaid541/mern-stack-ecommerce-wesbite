import mongoose from "mongoose"

const Schema = mongoose.Schema

const b_categorySchema = new Schema({
    business_category_name : {type: String, required:true,unique: true}
 }, {timestamps: true})

export default mongoose.model('Business_Category',b_categorySchema)
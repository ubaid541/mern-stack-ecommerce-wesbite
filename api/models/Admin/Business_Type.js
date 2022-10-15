import mongoose from "mongoose"

const Schema = mongoose.Schema

const b_typeSchema = new Schema({
    business_type_name : {type: String, required:true,unique: true}
 }, {timestamps: true})

export default mongoose.model('Business_Type',b_typeSchema)
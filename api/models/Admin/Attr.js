import mongoose from "mongoose"

const Schema = mongoose.Schema

const attrSchema = new Schema({
    attr_name : {type: String, required:true,unique: true},
    attr_price : {type: Number, required:true},
    seller_id : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true
    },
 }, {timestamps: true})

export default mongoose.model('Attribute',attrSchema)
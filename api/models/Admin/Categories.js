import mongoose from "mongoose"

const Schema = mongoose.Schema

const catSchema = new Schema({
    cat_name : {type: String, required:true,unique: true},
    seller_id : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true
    },
 }, {timestamps: true})

export default mongoose.model('Category',catSchema)
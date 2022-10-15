import mongoose from "mongoose"

const Schema = mongoose.Schema

const citySchema = new Schema({
    city_name : {type: String, required:true,unique: true}
 }, {timestamps: true})

export default mongoose.model('City',citySchema)
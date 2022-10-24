import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    fname : {type: String },
    lname : {type: String },
    username : {type: String,unique: true},
    email : {type: String, unique: true},
    phone : {type: Number},
    password : {type: String },
    address : {type: String },
    role : {type: String},
    business_name : {type: String, unique:true},
    city : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'City',
    },
    business_type : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Business_Type',
    },
    business_category : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Business_Category',
    },
    role:{type:String,default:"seller"}
 }, {timestamps: true})

 export default mongoose.model('User',userSchema)
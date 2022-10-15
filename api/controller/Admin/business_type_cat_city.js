import { B_Type,B_Category,City } from "../../models/index.js"

const b_details = {
    async get_b_details(req,res,next){
        try {
                const b_type = await B_Type.find()
                const b_cat = await B_Category.find()
                const city = await City.find()
            res.status(200).json({b_type,b_cat,city})
        } catch (error) {
            next(error)
        }
    }
}

export default b_details
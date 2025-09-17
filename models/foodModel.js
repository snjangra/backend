import pool from '../config/db.js';
//import '../config/db.js';

class foodModel {
    static async find() {
        const [rows] = await pool.query('SELECT * FROM food');
        //return rows;
        return  { order: "1", data: "2", message: "Order list fetched successfully" };
    }
}




export default foodModel;



/*
import mongoose from "mongoose";
import pool from '../config/db.js';

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true},
    image: { type: String, required: true },
    category:{ type:String, required:true}
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
*/
//export default foodModel;
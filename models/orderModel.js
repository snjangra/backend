//const pool = require('../config/db');

class orderModel {
  static async find() {
    //const [rows] = await pool.query('SELECT * FROM food');
    //return rows;

    return { order: "1", data: "2", message: "Order list fetched successfully" };
  }

  
}



/*
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type:String,required:true},
    items: { type: Array, required:true},
    amount: { type: Number, required: true},
    address:{type:Object,required:true},
    status: {type:String,default:"Food Processing"},
    date: {type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
*/
export default orderModel;
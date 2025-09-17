import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { sha512 } from 'js-sha512';

import uploadModel from "../models/uploadModel.js";
import { getIndianDateTime } from "../config/settings.js";


//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}


//add upload
export const addUpload = async (req, res) => {
    try {
        const { heading } = req.body || {};
        
        if (!heading) {
            return res.status(400).json({
                success: false,
                message: 'Heading is required.'
            });
        } else {
            const result = await uploadModel.uploadNew({heading: heading,image: image_filename})
            if(result){
                return res.json({ success: true, message: "Content added successfully." })
            } else {
                return res.json({ success: false, message: "failed to add content." })
            }

        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'An error occurred during login.' });
    }

};


//list upload
export const listUpload = async (req, res) => {
    const { date: nowDate, time: nowTime } = getIndianDateTime();
    /*
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const uid = decoded.id;
    */
    //console.log(uid);
    //{uid,token}
    try {
        const result = await uploadModel.uploadList()
        res.json({ success: true, data: {result} })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
};




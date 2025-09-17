import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { sha512 } from 'js-sha512';

import userModel from "../models/userModel.js";
import contentModel from "../models/contentModel.js";


//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}


//login user
export const addContent = async (req, res) => {
    try {
        const { heading, title } = req.body || {};

        if (!heading || !title) {
            return res.status(400).json({
                success: false,
                message: 'Heading and Title are required.'
            });
        } else {
            const result = await contentModel.contentNew({heading,title})
            if(result){
                return res.json({ success: true, message: "Content added successfully." })
            } else {
                return res.json({ success: false, message: "failed to add content." })
            }

            /*
            if(user){
                if(user.status==0){
                    return res.json({ success: false, message: "User is inactive. Please contact Admin." })
                } else {
                    const isMatch = passwordHash === user.psswd;
                    if (!isMatch) {
                        //console.log("Invalid password.")
                        return res.json({ success: false, message: "Invalid username or password." })
                    } else {
                        const token = createToken(user.id)
                        const uid = user.id
                        const tkn = await userModel.updateTokenById({uid,token})
                        if(tkn == true){
                            const uname = user.name
                            const role = user.role
                            const lastLoginDate = user.lt_login_dt
                            const lastLoginTime = user.lt_login_time
                            return res.json({ success: true, data: {uname, role, lastLoginDate, lastLoginTime, token} })
                        } else {
                            return res.json({ success: false, message: "An error occurred during login." })
                        }
                    }
                }
            } else {
                //console.log("User not found." + user)
                return res.json({success:false,message: "User not found."})
            }
                */
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'An error occurred during login.' });
    }

};


//Logout user
export const logoutUser = async (req, res) => {
    const { token } = req.query;
    //const tokendel = createToken(user.id)
    //const uid = user.id
    //console.log(token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const uid = decoded.id;
    console.log(uid);
    const tkn = await userModel.deleteToken({uid,token})
    if(tkn == true){
        return res.json({ success: true, message: "User logged out..."+token })
    } else {
        return res.json({ success: false, message: "An error occurred during logout."+token })
    }
    

};




//register user
export const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

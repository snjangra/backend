import pool from '../config/db.js';
import { getIndianDateTime } from "../config/settings.js";

class contentModel {
    static async contentNew({heading,title}) {
        console.log(heading,title);
        const { date: nowDate, time: nowTime } = getIndianDateTime();
        const sql = `INSERT INTO content(heading, title, status, created_at) VALUES (?, ?, ?, ?)`;
        const params = [heading,title,'1',nowDate];
        const [result] = await pool.query(sql, params);
        if (result.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
    
    














    
    static async login({usernameHash}) {
        const [rows] = await pool.query("SELECT * FROM usr_details WHERE usr_id = ?", [usernameHash]);
        if (rows.length === 0) {
            return null;
        } else {
            const user = rows[0];
            return user;
        }
    }
    static async checkLogin({token}) {
        const sql = `SELECT usr_details.*, usr_tkn_history.* FROM usr_details INNER JOIN usr_tkn_history ON usr_details.id = usr_tkn_history.user_id WHERE usr_tkn_history.tkn = ?`;
        const [rows] = await pool.query(sql, [token]);
        if (rows.length === 0) {
            return null;
        } else {
            const user = rows[0];
            return user;
        }
    }

    static async deleteToken({uid,token}) {
        const { date: nowDate, time: nowTime } = getIndianDateTime();
        //const [result2] = await pool.query("UPDATE usr_login_history SET login_status = ?,logout_dt = ?,logout_time = ? WHERE user_id = ?", [0,nowDate,nowTime,uid]);
        const [result] = await pool.query("DELETE FROM usr_tkn_history WHERE user_id = ? AND tkn = ?", [uid,token]);
        if(result){
            return true;
        } else {
            return false;
        }
    }






    static async findOne({userId}) {
        const [rows] = await pool.query("SELECT * FROM usr_details WHERE user_id = ?", [userId]);
        
        if (rows.length === 0) {
            return null;
        }
        
        const user = rows[0];
        return user;
    }
}




export default contentModel;
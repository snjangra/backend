import pool from '../config/db.js';
import { getIndianDateTime } from "../config/settings.js";

class uploadModel {
    static async uploadNew({heading,file}) {
        console.log(heading,file);
        const { date: nowDate, time: nowTime } = getIndianDateTime();
        const sql = `INSERT INTO upload(heading, file, status, created_at) VALUES (?, ?, ?, ?)`;
        const params = [heading,file,'1',nowDate];
        const [result] = await pool.query(sql, params);
        if (result.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
    static async uploadList() {
        const [rows] = await pool.query("SELECT * FROM upload");
        if (rows.length === 0) {
            return null;
        } else {
            return rows;
        }
    }
    
    


}

export default uploadModel;
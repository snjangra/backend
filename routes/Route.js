import express from 'express';
import { addContent } from '../controllers/contentController.js';
import multer from 'multer';
const Router = express.Router();



Router.post("/new",addContent);


export default Router;
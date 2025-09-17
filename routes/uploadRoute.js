import express from 'express';
import { addUpload,listUpload } from '../controllers/uploadController.js';
import multer from 'multer';
import path from "path";
import fs from "fs";

const uploadRouter = express.Router();


// ensure uploads dir exists
const UPLOAD_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safeName =
      path.parse(file.originalname).name.replace(/[^\w\-]+/g, "_") +
      "-" +
      Date.now() +
      path.extname(file.originalname).toLowerCase();
    cb(null, safeName);
  },
});

// Validate file types (example: images & pdf only)
const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "application/pdf",
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Unsupported file type"));
};



  const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter,
  });

//console.log(upload);

uploadRouter.get("/list",listUpload);
uploadRouter.post("/new",upload.single("file"),addUpload);



export default uploadRouter;
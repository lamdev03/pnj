import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import mongoose from "mongoose";
import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import path from 'path';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const app = express();

dotenv.config();
const { PORT, DB_URI } = process.env;

app.use(cors());

cloudinary.config({
  cloud_name: 'lamnt',
  api_key: '131342898321484',
  api_secret: 'ifBtEkfl33GIKGgDx3BR_BPnMEI'
});
app.use(express.json());

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'book',
    format: async (req, file) => 'png',
  },
});

const upload = multer({ storage: storage });
mongoose.connect(DB_URI).then(() => {
  console.log("Connected!");
});
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.path });
});
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

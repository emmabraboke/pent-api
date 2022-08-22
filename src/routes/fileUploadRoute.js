import multer from 'multer';
import { Router } from 'express';
import fileUpload from '../controllers/fileUploads.js';

const route = Router();

const upload = multer({ dest: 'uploads/' });

route.post('/upload', upload.single('image'), fileUpload);

export default route;

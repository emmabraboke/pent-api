import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';
import { BadRequestError } from '../errors/index.js';

const fileUpload = async (req, res) => {
  const file = req.file;
  const size = 30000000;

  if (!file) {
    throw new BadRequestError('no file uploaded');
  }

  if (file.size > size || !file.mimetype.startsWith('image')) {
    throw new BadRequestError('provide a media file less than 3mb');
  }

  const response = await cloudinary.uploader.upload(file.path, {
    folder: 'pent',
  });

  fs.rm('uploads', { recursive: true }, (err) => {
    if (err) throw err;
  });

  res.status(200).json({ image: response.url });
};

export default fileUpload;

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';
import multer from 'multer';


cloudinary.config({ 
    cloud_name: config.cloudinary_cloud_name, 
    api_key: config.cloudinary_api_key, 
    api_secret: config.cloudinary_api_secret
});

export const sendImageToCloudinary = (imageName: string, buffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: imageName.trim() },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      }
    );
    uploadStream.end(buffer);
  });
};


const storage = multer.memoryStorage();
  
export const upload = multer({ storage: storage })

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';
import multer from 'multer';

export const sendImageToCloudinary = async (imageName: string, path: string): Promise<string | null> => {

    cloudinary.config({ 
        cloud_name: config.cloudinary_cloud_name, 
        api_key: config.cloudinary_api_key, 
        api_secret: config.cloudinary_api_secret
    });
    
    try {
        const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(path, {
            public_id: imageName,
            overwrite: true,
        });

        console.log(uploadResult);

        const optimizeUrl = cloudinary.url(imageName, {
            fetch_format: 'auto',
            quality: 'auto'
        });
        
        console.log(optimizeUrl);
        
        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url(imageName, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
        
        console.log(autoCropUrl);
            
        return uploadResult.secure_url;
    } catch (error) {
        console.log(error);
        return null;
    }

    // Upload an image
    // const uploadResult: UploadApiResponse = await cloudinary.uploader
    // .upload(
    //     path, {
    //         public_id: imageName,
    //         overwrite: true,
    //     }
    // )
    // .catch((error) => {
    //     console.log(error);
    // });
    
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + '/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
  
export const upload = multer({ storage: storage });



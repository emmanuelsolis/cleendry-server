const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');


//Set up Cloudinary Storage

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Set up Multer Storage
const storage = new CloudinaryStorage({
    cloudinary, 
    params: (req,file) => {
        return {
            folder: 'cleenver',
            allowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'pdf'],
            fileFilter: (req, file, cb) => {
                if(!file.originalname.match(/\.(svg || gif || docx)$/)){
                    return cb(new Error('Formato de archivo no permitido'));
                }
                cb(null, file.originalname)
            },
            public_id: `ne-${file.originalname}`
        }
    }
});

const uploadCloud = multer({storage});

module.exports = uploadCloud;
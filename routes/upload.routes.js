const router = require('express').Router();
//importar los controladores 
const { uploadProcess, deleteImage} = require('../controllers/upload.controller');
//importar los helpers
const uploadCloud = require("../helpers/cloudinary")
// importar los middlewares
const {verifyToken}  = require('../middleware');

//multiples
router.post("/uploads",verifyToken,uploadCloud.array("images", 3),uploadProcess)
//Una sola
router.post("/single",verifyToken, uploadCloud.single("image"), uploadProcess)
//
router.delete("/delete-image/:name",verifyToken, deleteImage)

module.exports = router;
const cloudinary = require('cloudinary')

exports.uploadProcess = async (req, res, next) => {
    const uploads = (file, folder) => {
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, (result) => {
                resolve({
                    url: result.url,
                    id: result.public_id
                },{
                    resouce_type: 'auto',
                    folder
                })
            })//end of cloudinary
        })//-->newPromise
    }//-->uploads
                                                    //es la llave del json que contiene la imagen
    const uploader = async (path) => uploads(path, "images")
    if(req.method === "POST"){
        const urls = [];
        const files = req.files;
        console.log("Si esta el files", req.files, "el req.file", req.file);
        if(!req.file){
            for(const file of files){
                const {path} = file
                const newPath = await uploader(path)
                urls.push({uri:newPath.url, id:newPath.id, name:file.originalname})
            }
            res.status(200).json({urls, successMessage:"Imagenes guardadas"})
        }else{
            const {path} = req.file
            const newPath = await uploader(path)
            const url = {uri:newPath.url, id:newPath.id, name:req.file.originalname}
            res.status(200).json({url, successMessage:"Imagen guardada"})
        }
    }else {
        res.status(400).json({errorMessage:`${req.method} no permitido`})
    }
}

exports.deleteImage = (req, res, next) =>{
    const {name} = req.params
                                        //folder/nameimage.ext
    cloudinary.v2.uploader.destroy(`cleenver/${name}`, (err, result)=>{
        if(err) {
            return res.status(400).json({errorMessage:"No se pudo eliminar", err})
        }
        res.status(200).json({successMessage:`Se eliminó el archivo ${name}`})
    })
}
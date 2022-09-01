const router = require('express').Router();
//importar los controladores 

const {createService, viewCardService, updateService, deleteService} = require('../controllers/washservices.controller');

//importar los middlewares
const {verifyToken, checkRole}  = require('../middleware');

router.post('/create-service',verifyToken, checkRole(['Admin']), createService);
router.get('/get-service/:id',verifyToken, viewCardService);
router.put('/update-service/:id',verifyToken, checkRole(['Admin']), updateService);
router.delete('/delete-service/:id',verifyToken, checkRole(['Admin']), deleteService);





module.exports = router;
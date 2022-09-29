const router = require('express').Router();
//importar los controladores 
const {registerCar,getOne, getCars, editCarInfo, deleteCar} = require('../controllers/car.controller');

//importar los middlewares
const { verifyToken, checkRole} = require('../middleware');


router.post('/register-car',verifyToken,checkRole(["Client"]), registerCar);
router.get('/get-one/:carPlate', getOne);
router.get('/get-cars',verifyToken, getCars);
router.patch('/edit-car/:id',verifyToken, editCarInfo);
router.delete('/delete-car/:id',verifyToken, deleteCar);




module.exports = router;
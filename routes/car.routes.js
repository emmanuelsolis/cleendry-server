const router = require('express').Router();
//importar los controladores 
const {registerCar,getOne, getCars, editCarInfo, deleteCar} = require('../controllers/car.controller');

//importar los middlewares


router.post('/register-car', registerCar);
router.get('/get-one/:carPlate', getOne);
router.get('/get-cars', getCars);
router.patch('/edit-car/:id', editCarInfo);
router.delete('/delete-car/:id', deleteCar);




module.exports = router;
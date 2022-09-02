const router = require('express').Router();
//importar los controladores 
const {placeOrder} = require('../controllers/order.controller');

//importar los middlewares
const {verifyToken, checkRole}  = require('../middleware');

router.post('/place',verifyToken, checkRole(['Client']), placeOrder);





module.exports = router;
const router = require('express').Router();
//importar los controladores 
const { signupProcess} = require('../controllers/auth.controller');
//importar los middlewares


router.post('/signup', signupProcess);

module.exports = router;
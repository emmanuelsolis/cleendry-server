const router = require('express').Router();
//importar los controladores 
const { signupProcess, loginProcess, logoutProcess} = require('../controllers/auth.controller');
//importar los middlewares


router.post('/signup', signupProcess);
router.post('/login', loginProcess);
router.get('/logout', logoutProcess);

module.exports = router;
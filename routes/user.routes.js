const router = require('express').Router();
//importar los controladores 
const { getLoggedUser, editProfile} = require('../controllers/user.controller');
//importar los middlewares
const {verifyToken, } = require('../middleware');
// CRUD
//Read  PProfile
router.get('/profile', verifyToken, getLoggedUser);

// //Update
router.patch('/edit-profile',verifyToken, editProfile);    
// //Delete
// router.delete('/delete-user', )

// //Read other user
// router.get('/:id/profile', )
module.exports = router;
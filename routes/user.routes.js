const router = require('express').Router();
//importar los controladores 
const { getLoggedUser, editProfile, getUserById, deleteAccount} = require('../controllers/user.controller');
//importar los middlewares
const {verifyToken}  = require('../middleware');
// CRUD
//Read  PProfile
router.get('/profile', verifyToken, getLoggedUser);

// //Update
router.patch('/edit-profile',verifyToken, editProfile);    

// //Read other user
router.get('/:id/profile', verifyToken, getUserById);
module.exports = router;

// //Delete
router.delete('/delete-user',verifyToken, deleteAccount); 
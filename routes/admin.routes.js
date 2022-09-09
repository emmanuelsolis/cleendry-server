const router = require('express').Router();
const { getAllUsers} = require('../controllers/admin.controller');
const { verifyToken, checkRole} = require('../middleware');

// //Read all users
router.get("/all-users", verifyToken, checkRole(["Admin"]), getAllUsers);


module.exports = router;
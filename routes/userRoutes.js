const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../utils/verifyUser');

const router = express.Router();

router.get('/test', userController.test);
router.post('/update/:id', verifyToken, userController.updateUser);
router.delete('/delete/:id', verifyToken, userController.deleteUser);
router.get('/listings/:id', verifyToken,userController.getUserListing);
 
module.exports = router;
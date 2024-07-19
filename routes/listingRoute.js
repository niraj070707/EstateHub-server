const express = require('express');
const listingController = require('../controllers/listingController');
const { verifyToken } = require('../utils/verifyUser');

const router = express.Router();

router.post('/create', verifyToken, listingController.createListing);
router.delete('/delete/:id', verifyToken, listingController.deleteListing);
router.get('/get/:id', listingController.getListing);
router.get('/get', listingController.getListings);
router.delete('/update/:id', verifyToken, listingController.updateListing);



module.exports = router; 
const express = require('express');
const listingController = require('../controllers/listingController');

const router = express.Router();

router.post('/create', listingController.createListing);

module.exports = router; 
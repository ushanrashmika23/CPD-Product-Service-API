const express = require('express');
const ReviewController = require('../controller/ReviewController');
const router = express.Router();

router.post('/create-review', ReviewController.createReview);
router.put('/update-review/:id', ReviewController.updateReview);
router.delete('/delete-review/:id', ReviewController.deleteReview);
router.get('/find-review/:id', ReviewController.findByIdReview);
router.get('/all-review', ReviewController.findAllReview);


module.exports = router;
const express = require('express');
const BookmarkController = require('../controller/BookmarkController');

const router = express.Router();

router.post('/create-bookmark', BookmarkController.createBookmark);
router.put('/update-bookmark/:id', BookmarkController.updateBookmark);
router.delete('/delete-bookmark/:id', BookmarkController.deleteBookmark);
router.get('/find-bookmark/:id', BookmarkController.findByIdBookmark);
router.get('/all-bookmark', BookmarkController.findAllBookmark);

module.exports = router;
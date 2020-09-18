const express = require('express');
const { check } = require('express-validator');
const postsController = require('../controllers/posts-controller');

const router = express.Router();

router.get('/', postsController.getPosts);
router.get('/user/:uid', postsController.getPostsByUserId);
router.get('/liked', postsController.getLikedPosts);
router.get('/:pid/likes', postsController.getLikesForPost);
router.post('/', 
    [
        check('title').not().isEmpty(),
        check('caption').not().isEmpty(),
        check('address').not().isEmpty()
    ],
    postsController.createPost);
router.post('/:pid/likes', postsController.createLike);
router.delete('/:pid', postsController.deletePost);
router.delete('/:pid/likes', postsController.deleteLike);
router.patch('/:pid',
    [
        check('title').not().isEmpty(),
        check('caption').not().isEmpty(),
        check('address').not().isEmpty()
    ],
    postsController.updatePost);

module.exports = router;
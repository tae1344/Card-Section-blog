const express = require('express');
const { checkAuthenticated, checkNotAuthenticated } = require('../controllers/auth');

const { getPosts, createPost, updatePost, deletePost, likePost, getUserPosts } = require('../controllers/posts');

const router = express.Router();


// localhost:5000/api/posts
router.get('/', getPosts);
router.get('/:user/detail', checkAuthenticated, getUserPosts);
router.post('/create', checkAuthenticated, createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', checkNotAuthenticated, likePost);

module.exports = router;
const express = require('express');
const { checkAuthenticated, checkNotAuthenticated } = require('../controllers/auth');
//const path = require('path');

const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/posts');

const router = express.Router();

// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'server/uploads/'); // 파일 저장되는 경로(폴더)
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//   }
// });

//const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

// localhost:5000/api/posts
router.get('/', getPosts);
router.post('/', checkAuthenticated, createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', checkNotAuthenticated, likePost);

module.exports = router;
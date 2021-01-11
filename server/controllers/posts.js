// 라우터에 들어갈 복잡한 로직 작성
const mongoose = require('mongoose');
const PostMessage = require('../models/PostMessage'); // postMessage DB

// 모든 포스트 가져오기
const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();


    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

// 유저가 작성한 포스트만 가져오기
const getUserPosts = async (req, res) => {
  const { user } = req.params;

  try {
    const postMessages = await PostMessage.find({ "creator": user });


    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

const createPost = async (req, res, next) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save(); // DB 저장

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
}

const updatePost = async (req, res) => {
  // ex) /posts/123 --> id = 123
  // _id : mongoose obj ID
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');


  const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
  res.json(updatePost);
}

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully' });
}

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  const post = await PostMessage.findById(id);
  const updatePost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

  res.json(updatePost);
}

module.exports = { getPosts, createPost, updatePost, deletePost, likePost, getUserPosts };

const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePostById, deletePostById } = require('../models/postModel');

// Home page - List all posts
router.get('/', (req, res) => {
  getAllPosts((err, posts) => {
    if (err) return res.status(500).send('Database error');
    res.render('index', { posts });
  });
});

// View single post
router.get('/post/:id', (req, res) => {
  getPostById(req.params.id, (err, post) => {
    if (err || !post) return res.status(404).send('Post not found');
    res.render('view', { post });
  });
});

// Create post - Show form
router.get('/create', (req, res) => {
  res.render('create');
});

// Create post - Handle form submission
router.post('/create', (req, res) => {
  const { title, content } = req.body;
  createPost(title, content, (err, id) => {
    if (err) return res.status(500).send('Database error');
    res.redirect('/');
  });
});

// Edit post - Show form
router.get('/edit/:id', (req, res) => {
  getPostById(req.params.id, (err, post) => {
    if (err || !post) return res.status(404).send('Post not found');
    res.render('edit', { post });
  });
});

// Edit post - Handle form submission
router.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  updatePostById(req.params.id, title, content, (err) => {
    if (err) return res.status(500).send('Database error');
    res.redirect(`/post/${req.params.id}`);
  });
});

// Delete post
router.post('/delete/:id', (req, res) => {
  deletePostById(req.params.id, (err) => {
    if (err) return res.status(500).send('Database error');
    res.redirect('/');
  });
});

module.exports = router;

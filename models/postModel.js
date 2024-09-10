const { db } = require('../database/db');

// Create a new post
const createPost = (title, content, callback) => {
  db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], function (err) {
    callback(err, this.lastID);
  });
};

// Get all posts
const getAllPosts = (callback) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    callback(err, rows);
  });
};

// Get a single post by ID
const getPostById = (id, callback) => {
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
    callback(err, row);
  });
};

// Update a post by ID
const updatePostById = (id, title, content, callback) => {
  db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], function (err) {
    callback(err);
  });
};

// Delete a post by ID
const deletePostById = (id, callback) => {
  db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
    callback(err);
  });
};

module.exports = { createPost, getAllPosts, getPostById, updatePostById, deletePostById };

const express = require('express');
const { verifyToken, isAdminz } = require('../Utilities/verifyToken');
const { createComment, editComment, deleteComment, getComments, getBlogComments, likeUnlikeComment } = require('../Controllers/Comment');
const commentRouter = express.Router();

commentRouter.post('/create-comment', verifyToken, createComment);
commentRouter.put('/edit-comment/:id', verifyToken, editComment);
commentRouter.get('/get-all', verifyToken, isAdminz, getComments);
commentRouter.get('/getComments/:id', verifyToken, getBlogComments);
commentRouter.post('/like/:id', verifyToken, likeUnlikeComment)
commentRouter.delete('/delete-comment/:id', verifyToken, deleteComment);

module.exports = commentRouter;
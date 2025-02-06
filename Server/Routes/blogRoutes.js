const express = require('express');
const blogRouter = express.Router();
const multer = require('multer');
const { createBlog, findAllBlogs, deleteBlog, updateBlog, blogById } = require('../Controllers/Blog');
const { verifyToken, isAdminz } = require('../Utilities/verifyToken');
const cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

blogRouter.post('/create-blog', verifyToken, isAdminz, createBlog);
blogRouter.get('/all-blogs', verifyToken, isAdminz, findAllBlogs);
blogRouter.delete('/delete-blog/:id', verifyToken, isAdminz, deleteBlog);
blogRouter.put('/edit-blog/:id', verifyToken, isAdminz, upload.single('file'), updateBlog)
blogRouter.get('/blog-b/:id', verifyToken, blogById)
blogRouter.post('/upload-post-file', verifyToken, upload.single('file'), async (req, res) => { 
    if (!req.file) { 
      return res.status(400).send('No file uploaded'); 
    } 
    try {
      const fileBuffer = req.file.buffer;
  
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
          resource_type: 'image',
          upload_preset: 'Deep-z',
          transformation: [
            {
              quality: 'auto',
              fetch_format: 'auto'
            },
            {
              width: '800',
              height: '800',
              crop: 'fill',
              gravity: 'auto'
            }
          ]
        }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }).end(fileBuffer);
      }); 
  
      res.send({ filePath: result.secure_url, publicId: result.public_id  });
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      res.status(500).send('Upload to Cloudinary failed');
    }
  });

  module.exports = blogRouter;
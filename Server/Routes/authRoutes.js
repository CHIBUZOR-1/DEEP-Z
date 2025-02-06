const express = require('express');
const userRouter = express.Router();
const { signUp, signIn, signOut, updateProfile, googleAuthLogin, googleAuthSignUp, forgotPassword, resetPassword, verifyEmail, updateUserRole, updateProfilePhoto, getAllUsers, deleteUser } = require('../Controllers/Auth');
const { verifyToken, isAdminz } = require('../Utilities/verifyToken');
const multer = require('multer');
const userModel = require('../models/userModel');
const cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage();

const upload = multer({storage:storage});

userRouter.post('/signUp', signUp);
userRouter.post('/signIn', signIn);
userRouter.get('/logout', signOut);
userRouter.post('/googleAuth', googleAuthSignUp);
userRouter.post('/googleAuthLogin', googleAuthLogin);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);
userRouter.get('/all-users',  verifyToken, isAdminz, getAllUsers)
userRouter.post('/newProfilePhoto', verifyToken, updateProfilePhoto);
userRouter.put('/update-profile', verifyToken, updateProfile);
userRouter.put('/update_role/:id', verifyToken, isAdminz, updateUserRole);
userRouter.delete('/delete-user/:id', verifyToken, isAdminz, deleteUser);
userRouter.get('/user-pass', verifyToken, (req, res) => {
    res.status(200).send({
        ok: true
    });
});

userRouter.get('/admin-pass', verifyToken, isAdminz, (req, res) => {
    res.status(200).send({
        ok: true
    });
});
userRouter.post('/uploadProfilePhoto', verifyToken, upload.single('file'), async(req, res) => { 
    if (!req.file) { return res.status(400).send('No file uploaded'); } 
    try {
      const userId = req.user.userId;
      const user = await userModel.findById(userId);
      if (user.imageId) {
        await cloudinary.uploader.destroy(user.imageId);
      }
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

      user.imageId = result.public_id; // Store the new public_id
      await user.save();
      res.send({ filePath: result.secure_url });
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      res.status(500).send('Upload to Cloudinary failed');
    }
});

module.exports = userRouter;
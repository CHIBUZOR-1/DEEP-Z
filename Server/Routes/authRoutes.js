const express = require('express');
const userRouter = express.Router();
const { signUp, signIn, signOut, updateProfile, googleAuthLogin, googleAuthSignUp, forgotPassword, resetPassword, verifyEmail } = require('../Controllers/Auth');
const { verifyToken } = require('../Utilities/verifyToken');

userRouter.post('/signUp', signUp);
userRouter.post('/signIn', signIn);
userRouter.get('/logout', signOut);
userRouter.post('/googleAuth', googleAuthSignUp);
userRouter.post('/googleAuthLogin', googleAuthLogin);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);
userRouter.get('/verify-email/:token', verifyEmail)
userRouter.put('/update-profile', verifyToken, updateProfile);

module.exports = userRouter;
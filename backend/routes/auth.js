import express from 'express';

import { Signin,ForgotPassword,ResetPassword, Signup, AdminSignin, UserForgotPassword } from '../controllers/auth.js';
import { ChangePassword } from '../controllers/users.js';
import auth from '../middlewares/auth.js';
const router= express.Router();

router.post('/signin',Signin);
router.post('/adminsignin',AdminSignin);
router.post('/signup',Signup);
router.post('/forgot_password',ForgotPassword);
router.post('/user_forgot_password',UserForgotPassword);
router.patch('/reset_password/:token',ResetPassword);
// router.patch('/change_password',auth,ChangePassword);
export default router;
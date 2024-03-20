import express from 'express';

import { Signin,ForgotPassword,ResetPassword, Signup, AdminSignin } from '../controllers/auth.js';
const router= express.Router();

router.post('/signin',Signin);
router.post('/adminsignin',AdminSignin);
router.post('/signup',Signup);
router.post('/forgot_password',ForgotPassword);
router.patch('/reset_password/:token',ResetPassword);

export default router;
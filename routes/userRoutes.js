import express from "express";


import { loginForm, login, recoverPasswordForm, registerForm, register, activateAccount, recoverPassword, resetPasswordForm, resetPassword } from "../controllers/userController.js";


// Router development.

const router = express.Router();


// Calling loginForm function in userController, when the path "/auth/login" is accessed.
router.get('/login', loginForm);
router.post('/login', login);

router.get('/register', registerForm);
router.post('/register', register);

router.get('/activate/:token', activateAccount);

router.get('/recover-password', recoverPasswordForm);
router.post('/recover-password', recoverPassword);

router.get('/recover-password/:token', resetPasswordForm);
router.post('/recover-password/:token', resetPassword);

export default router;
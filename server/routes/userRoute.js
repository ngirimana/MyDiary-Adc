import express from 'express';
import UserController from '../controllers/userController';
import { signUpValidation, signInValidation } from '../middlewares/userValidator';


const router = express.Router();


router.post('/signup', signUpValidation, UserController.signUp);
router.post('/signin', signInValidation, UserController.signIn);

export default router;

import express from 'express';
import UserController from '../controllers/userController';
import { signUpValidation } from '../middlewares/userValidator';


const router = express.Router();


router.post('/signup', signUpValidation, UserController.signUp);

export default router;

import express from 'express';
import UserController from '../controllers/userController';
import { signUpValidation, signInValidation } from '../middlewares/userValidator';
import Authentication from '../middlewares/verifyAuthentication';

const router = express.Router();


router.post('/signup', signUpValidation, UserController.signUp);
router.post('/signin', signInValidation, UserController.signIn);
router.get('/profile', Authentication.verifyAuth, UserController.UserProfile);

export default router;

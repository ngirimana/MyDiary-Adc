import express from 'express';
import EntryController from '../controllers/entryController';
import { entryValidation } from '../middlewares/entryValidator';
import { verifyAuth } from '../middlewares/auth';

const router = express.Router();


router.post('/entries', verifyAuth, entryValidation, EntryController.createEntry);
export default router;

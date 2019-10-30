import express from 'express';
import EntryController from '../controllers/entryController';
import { entryValidation } from '../middlewares/entryValidator';
import { verifyAuth } from '../middlewares/auth';

const router = express.Router();


router.post('/entries', verifyAuth, entryValidation, EntryController.createEntry);
router.patch('/entries/:entrySlug', verifyAuth, entryValidation, EntryController.modifyEntry);
router.get('/entries', verifyAuth, EntryController.getAllentries);
router.get('/entries/:entrySlug', verifyAuth, EntryController.getSpecificEntry);
router.delete('/entries/:entrySlug', verifyAuth, EntryController.deleteEntry);
export default router;

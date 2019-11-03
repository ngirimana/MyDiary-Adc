import express from 'express';
import EntryController from '../controllers/entryController';
import { entryValidation } from '../middlewares/entryValidator';
import Authentication from '../middlewares/verifyAuthentication';

const router = express.Router();
router.post('/entries', Authentication.verifyAuth, entryValidation, EntryController.createEntry);
router.patch('/entries/:entrySlug', Authentication.verifyAuth, entryValidation, EntryController.modifyEntry);
export default router;

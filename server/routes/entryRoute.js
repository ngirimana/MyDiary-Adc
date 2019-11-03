import express from 'express';
import EntryController from '../controllers/entryController';
import { entryValidation } from '../middlewares/entryValidator';
import Authentication from '../middlewares/verifyAuthentication';

const router = express.Router();
router.post('/entries', Authentication.verifyAuth, entryValidation, EntryController.createEntry);
router.patch('/entries/:entrySlug', Authentication.verifyAuth, entryValidation, EntryController.modifyEntry);
router.get('/entries', Authentication.verifyAuth, EntryController.getAllEntries);
router.get('/entries/:entrySlug', Authentication.verifyAuth, EntryController.getSpecificEntry);
router.delete('/entries/:entrySlug', Authentication.verifyAuth, EntryController.deleteEntry);
export default router;

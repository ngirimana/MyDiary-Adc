import date from 'date-and-time';
import Entry from '../models/entryModel';
import response from '../helpers/responses';
import { verifyToken } from '../helpers/token';
import { notNumber } from '../helpers/notNumber';

let entries = [];

class EntryController {
  static createEntry = (req, res) => {
    const { title, description } = req.body;
    const id = entries.length + 1;
    const now = new Date();
    const currentDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    const updateDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    const userid = verifyToken(req.header('x-auth-token'));
    const entry = new Entry(id, currentDate, userid, title, description, updateDate);
    entries.push(entry);
    const data = entry;
    return response.successResponse(req, res, 200, 'entry successfully created', data);
  }

  static modifyEntry = (req, res) => {
    const { title, description } = req.body;
    const { entryId } = req.params;
    const now = new Date();
    const newDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    const userid = verifyToken(req.header('x-auth-token'));
    const singleEntry = entries.find((entry) => entry.id === parseInt(entryId, 10));
    if (isNaN(entryId)) { return notNumber(req, res); }
    if (!singleEntry) {
      return response.errorResponse(req, res, 404, `An entry with Id ${entryId} does not exist`);
    }
    if (userid !== singleEntry.id) {
      return response.errorResponse(req, res, 403, `An entry with Id ${entryId} does not belongs to you`);
    }
    singleEntry.title = title;
    singleEntry.description = description;
    singleEntry.updatedOn = newDate;
    const data = singleEntry;

    return response.successResponse(req, res, 200, 'entry successfully edited', data);
  }
}
export default EntryController;

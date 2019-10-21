import date from 'date-and-time';
import Entry from '../models/entryModel';
import response from '../helpers/responses';
import { verifyToken } from '../helpers/token';

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
}
export default EntryController;

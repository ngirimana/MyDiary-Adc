import cuid from 'cuid';
import date from 'date-and-time';
import Entry from '../models/entryModel';
import response from '../helpers/responses';
import { verifyToken } from '../helpers/token';
import { slugginingTitle } from '../helpers/makeSlug';

let entries = [];

class EntryController {
  static createEntry = (req, res) => {
    const { title, description } = req.body;
    const slug = slugginingTitle(title, cuid.slug());
    const now = new Date();
    const currentDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    const updateDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    const userid = verifyToken(req.header('x-auth-token'));
    const entry = new Entry(slug, currentDate, userid, title, description, updateDate);
    entries.push(entry);
    const data = entry;
    return response.successResponse(req, res, 200, 'entry successfully created', data);
  }

  static modifyEntry = (req, res) => {
    const { title, description } = req.body;
    const { entrySlug } = req.params;
    const now = new Date();
    const newDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    const userid = verifyToken(req.header('x-auth-token'));
    const singleEntry = entries.find((entry) => entry.slug === entrySlug);
    if (!singleEntry) {
      return response.errorResponse(req, res, 404, `An entry with Id "${entrySlug}" does not exist`);
    }
    if (userid !== singleEntry.userid) {
      return response.errorResponse(req, res, 403, `An entry with Id ${entrySlug} does not belongs to you`);
    }
    singleEntry.title = title;
    singleEntry.description = description;
    singleEntry.updatedOn = newDate;
    const data = singleEntry;

    return response.successResponse(req, res, 200, 'entry successfully edited', data);
  }

  static getAllentries = (req, res) => {
    const userData = verifyToken(req.header('x-auth-token'));
    const data = entries.sort((a, b) => (new Date(b.updatedOn)).getTime()
      - (new Date(a.updatedOn).getTime()));
    const yourEntries = data.filter((entry) => entry.userid === userData);
    if (yourEntries.length === 0) {
      return response.errorResponse(req, res, 404, 'Your entries  are not found!');
    }
    return response.successResponse(req, res, 200, 'Your available entries are: ', yourEntries);
  };

  static getSpecificEntry = (req, res) => {
    const { entrySlug } = req.params;
    const userInfos = verifyToken(req.header('x-auth-token'));
    const uniqueEntry = entries.find((entry) => entry.slug === entrySlug);
    if (!uniqueEntry) {
      return response.errorResponse(req, res, 404, 'This entry is not fouund');
    }
    if (uniqueEntry.userid !== userInfos) {
      return response.errorResponse(req, res, 403, 'This entry is not yours');
    }
    return response.successResponse(req, res, 200, 'Your Entry was found', uniqueEntry);
  }

  static deleteEntry = (req, res) => {
    const { entrySlug } = req.params;
    const userInfo = verifyToken(req.header('x-auth-token'));
    const oneEntry = entries.find((uniqueEntry) => uniqueEntry.slug === entrySlug);
    if (!oneEntry) {
      return response.errorResponse(req, res, 404, 'This entry is not avaialable');
    }
    if (oneEntry.userid !== userInfo) {
      return response.errorResponse(req, res, 403, 'This entry doesn\'t belongs to you');
    }
    const index = entries.indexOf(oneEntry);
    entries.splice(index, 1);
    return response.successResponse(req, res, 200, 'entry successfully deleted', oneEntry);
  }
}
export default EntryController;

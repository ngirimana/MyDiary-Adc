import cuid from 'cuid';
import Model from '../models/db';
import responses from '../helpers/responses';
import { userIdFromToken } from '../helpers/token';
import { slugginingTitle } from '../helpers/makeSlug';
import { currentDate } from '../helpers/date';
import { notAlphaNum } from '../helpers/notAlphaNum';

class EntryController {
  static entryModel() {
    return new Model('entries');
  }

  static createEntry = async (req, res) => {
    try {
      const { title, description } = req.body;
      const slug = slugginingTitle(title, cuid.slug());
      const entryDate = currentDate();
      const userId = userIdFromToken(req.header('x-auth-token'));
      const cols = 'slug,created_on, user_id,title,description,updated_on';
      const entryInfo = `'${slug}','${entryDate}', ${userId}, '${title}', '${description}','${entryDate}'`;
      const row = await this.entryModel().insert(cols, entryInfo);
      const data = row[0];
      return responses.successResponse(res, 200, 'entry successfully created', data);
    } catch (er) {
      return responses.errorResponse(res, 500, er);
    }
  }

  static modifyEntry = async (req, res) => {
    let { title, description } = req.body;
    const { entrySlug } = req.params;
    const entryUpdateDate = currentDate();
    const userInfosId = userIdFromToken(req.header('x-auth-token'));
    if (!isNaN(entrySlug)) { return notAlphaNum(res); }
    const entry = await this.entryModel().select('*', 'slug=$1', [entrySlug]);
    if (!entry.length) {
      return responses.errorResponse(res, 404, `An entry with Id ${entrySlug} does not exist`);
    }
    if (userInfosId !== entry[0].user_id) {
      return responses.errorResponse(res, 403, `An entry with Id ${entrySlug} does not belongs to you`);
    }
    const cols = 'title=$1, description=$2, updated_on=$3';
    const clause = 'slug=$4';
    const values = [title, description, entryUpdateDate, entrySlug];
    const updatedEntry = await this.entryModel().update(cols, clause, values);
    const data = updatedEntry;
    return responses.successResponse(res, 200, 'Entry successfully edited', data);
  }
}
export default EntryController;

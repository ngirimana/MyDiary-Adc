import cuid from 'cuid';
import Model from '../models/db';
import responses from '../helpers/responses';
import { userIdFromToken } from '../helpers/token';
import { slugginingTitle } from '../helpers/makeSlug';
import { currentDate } from '../helpers/date';

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
}
export default EntryController;

import Model from '../models/db';
import { userIdFromToken } from '../helpers/token';
import responses from '../helpers/responses';


const model = new Model('users');

class Authentication {
  static verifyAuth = async (req, res, next) => {
    const authToken = req.header('x-auth-token');
    if (!authToken) {
      return responses.errorResponse(res, 400, 'You haven\'t provide your token');
    }
    try {
      const decode = userIdFromToken(authToken);
      const user = await model.select('*', 'id=$1', [decode]);
      if (!user.length) {
        return responses.errorResponse(res, 401, 'You are not authorized to perform this task');
      }

      next();
    } catch (error) {
      return responses.errorResponse(res, 400, error.message);
    }
  }
}


export default Authentication;

import lodash from 'lodash';
import dotenv from 'dotenv';
import Model from '../models/db';
import { generateAuthToken } from '../helpers/token';
import response from '../helpers/responses';
import { encryptPassword } from '../helpers/securedPassword';

dotenv.config();

class UserController {
  static model() {
    return new Model('users');
  }

  static signUp = async (req, res) => {
    try {
      let {
        firstName,
        lastName,
        email,
        password,
      } = req.body;
      const user = await this.model().select('*', 'email=$1', [email]);
      if (user[0]) {
        return response.errorResponse(res, 409, `${email} was already taken`);
      }
      password = encryptPassword(password);
      const cols = 'firstName, lastName,email,password';
      const userInfo = `'${firstName}', '${lastName}', '${email}', '${password}'`;
      const row = await this.model().insert(cols, userInfo);
      const token = generateAuthToken(row[0].id, row[0].email);
      const data = {
        token,
        userData: lodash.pick(row[0], 'id', 'firstname', 'lastname', 'email'),
      };
      return response.successResponse(res, 201, 'User created successfully', data);
    } catch (error) {
      return response.errorResponse(res, 500, error);
    }
  }
}
export default UserController;

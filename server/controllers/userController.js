import lodash from 'lodash';
import dotenv from 'dotenv';
import Model from '../models/db';
import { generateAuthToken } from '../helpers/token';
import response from '../helpers/responses';
import { encryptPassword, decryptPassword } from '../helpers/securedPassword';

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
        return response.errorResponse(res, 400, `${email} was already taken`);
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

  static signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.model().select('*', 'email=$1', [email]);
      if (user[0] && (decryptPassword(password, user[0].password))) {
        const token = generateAuthToken(user[0].id, user[0].email);
        const data = {
          token,
          userData: lodash.pick(user[0], 'id', 'firstname', 'lastname', 'email'),
        };
        return response.successResponse(res, 200, 'User signed in successfully', data);
      }
      return response.errorResponse(res, 401, 'Incorrect email or password');
    } catch (err) {
      return response.errorResponse(res, 500, err);
    }
  }
}
export default UserController;

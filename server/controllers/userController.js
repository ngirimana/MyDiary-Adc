import lodash from 'lodash';
import dotenv from 'dotenv';
import Model from '../models/db';
import { generateAuthToken, userIdFromToken } from '../helpers/token';
import response from '../helpers/responses';
import { encryptPassword, decryptPassword } from '../helpers/securedPassword';

dotenv.config();

class UserController {
  static model() {
    return new Model('users');
  }

  static entryModel() {
    return new Model('entries');
  }

  static signUp = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;
      const user = await this.model().select('*', 'email=$1', [email]);
      if (user[0]) {
        return response.errorResponse(res, 409, `${email} was already taken`);
      }
      const hashedpassword = encryptPassword(password);
      const cols = 'firstName, lastName,email,password';
      const userInfo = `'${firstName}', '${lastName}', '${email}', '${hashedpassword}'`;
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

  static UserProfile = async (req, res) => {
    const userId = userIdFromToken(req.header('x-auth-token'));
    const userEntries = await this.entryModel().select('*', 'user_id=$1', [userId]);
    const existUser = await this.model().select('*', 'id=$1', [userId]);
    if (existUser.length) {
      return response.successResponse(res, 200, 'Your profile data are :', {
        firstName: existUser[0].firstname,
        LastName: existUser[0].lastname,
        email: existUser[0].email,
        NumberOfEntries: userEntries.length,
      });
    }
  }
}
export default UserController;

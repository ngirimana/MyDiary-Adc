import lodash from 'lodash';
import dotenv from 'dotenv';
import User from '../models/userModel';
import { generateAuthToken } from '../helpers/token';
import response from '../helpers/responses';
import { encryptPassword, decryptPassword } from '../helpers/securedPassword';

dotenv.config();
export const users = [];
class UserController {
  static signUp = (req, res) => {
    const id = users.length + 1;
    const takenEmail = users.find((user) => user.email === req.body.email);
    if (takenEmail) {
      return response.errorResponse(res, 409, `${req.body.email} is already taken`);
    }
    let {
      firstName, lastName, email, password,
    } = req.body;
    password = encryptPassword(password);
    const user = new User(id, firstName, lastName, email, password);
    const token = generateAuthToken(id, user.email);
    users.push(user);
    const data = {
      token,
      userdata: lodash.pick(user, ['id', 'firstName', 'lastName', 'email']),
    };
    return response.successResponse(res, 201, 'User created successfully', data);
  }

  static signIn = (req, res) => {
    const { email, password } = req.body;
    const user = users.find((userdata) => (userdata.email === email)
      && (decryptPassword(password, userdata.password)));

    if (!user) {
      return response.errorResponse(res, 401, 'Incorrect email or password');
    }
    const token = generateAuthToken(user.id, user.email);
    const data = {
      token,
      userdata: lodash.pick(user, ['id', 'firstName', 'lastName', 'email']),
    };
    return response.successResponse(res, 200, 'User signed in successfully', data);
  }
}

export default UserController;

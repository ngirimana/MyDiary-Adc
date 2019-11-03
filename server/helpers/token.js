import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const generateAuthToken = (id, email) => {
  const token = jwt.sign({
    Id: id,
    userEmail: email,
  }, process.env.SECRETEKEY, { expiresIn: '1d' });
  return token;
};
export const userIdFromToken = (token) => {
  const mytoken = jwt.verify(token, process.env.SECRETEKEY);

  return mytoken.Id;
};

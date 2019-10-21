import { users } from '../controllers/userController';
import { verifyToken } from '../helpers/token';
import response from '../helpers/responses';


export const verifyAuth = (req, res, next) => {
  const userToken = req.header('x-auth-token');
  if (!userToken) {
    return response.errorResponse(req, res, 400, 'You haven\'t provide your token');
  }
  try {
    const decoded = verifyToken(userToken);

    const authUserId = users.find((user) => user.id === decoded);
    if (!authUserId) {
      return response.errorResponse(req, res, 401, 'You are not authorized to perform this action');
    }
    next();
  } catch (error) {
    return response.errorResponse(req, res, 400, error.message);
  }
};

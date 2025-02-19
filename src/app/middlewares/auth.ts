import config from "../config";
import { httpStatus } from "../config/status";
import AppError from "../errors/AppError";
import { TUser, TUserRole } from "../modules/Authentications/User/user_interface";
import catchAsync from "../utils/catchAsync";
import jwt from 'jsonwebtoken';


const auth = (requiredRoles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {

      const token = req.headers.authorization;
  
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
  
      jwt.verify(token, config.jwt_secret as string, function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }
  
        const user = decoded as TUser;
  
        // Check if the user's role is included in the required roles
        if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
          throw new AppError(httpStatus.FORBIDDEN, 'Forbidden: You do not have access to this resource.');
        }
  
        req.user = user;
  
        next();
      });
    });
  };
  
  export default auth;
  
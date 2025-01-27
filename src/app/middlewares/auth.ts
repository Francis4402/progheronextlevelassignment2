import config from "../config";
import { httpStatus } from "../config/status";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/Authentications/User/user_interface";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';


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
  
        const role = (decoded as JwtPayload).role;
  
        // Check if the user's role is included in the required roles
        if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
          throw new AppError(httpStatus.FORBIDDEN, 'Forbidden: You do not have access to this resource.');
        }
  
        req.user = decoded as JwtPayload;
  
        next();
      });
    });
  };
  
  export default auth;
  
import config from "../config";
import { httpStatus } from "../config/status";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/Authentications/User/user_interface";
import { User } from "../modules/Authentications/User/user_model";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';


const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {

      const token = req.headers.authorization;
  
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
  
      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      const {role, email} = decoded;

      const user = await User.findOne({email});

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized  hi!"
        );
      }

      req.user = user;

      next();
    });
  };
  
  export default auth;
  
  // if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'Forbidden: You do not have access to this resource.');
  // }
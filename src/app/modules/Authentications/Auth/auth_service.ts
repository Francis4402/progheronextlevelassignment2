import config from "../../../config";
import { httpStatus } from "../../../config/status";
import AppError from "../../../errors/AppError";
import { User } from "../User/user_model";
import { TLoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth_utils";


const loginUserFromDB = async (payload: TLoginUser) => {
    
    const user = await User.isUserExistsByCustomId(payload.email);

    if(!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    const isBlocked = user.isBlocked;

    if(isBlocked === true) {
        throw new AppError(httpStatus.FORBIDDEN, 'Your account is blocked !');
    }

    if(! await User.isPasswordMatched(payload?.password, user?.password))
        throw new AppError(httpStatus.UNAUTHORIZED, 'Password do not matched!');

    const jwtPayload = {
        useremail: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_secret as string,
        config.jwt_access_expires_in as string,
      );
    
    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );

    return {accessToken, refreshToken};
}

const refreshTokenFromDB = async (token: string) => {

    const decoded = verifyToken(token, config.jwt_refresh_secret as string);

    const { useremail } = decoded;

    const user = await User.isUserExistsByCustomId(useremail);

    if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    if (user.isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'Your account is blocked!');
    }

    const jwtPayload = {
        useremail: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_secret as string,
        config.jwt_access_expires_in as string,
    );

    return { accessToken };
};


export const AuthServices = {
    loginUserFromDB,
    refreshTokenFromDB
}
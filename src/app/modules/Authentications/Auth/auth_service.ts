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
        _id: user._id,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        name: user.name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        gender: user.gender,
        dateofbirth: user.dateofbirth
    };
    const accessToken = createToken(
        {
            ...jwtPayload,
            profileImage: jwtPayload.profileImage || ''
        },
        config.jwt_secret as string,
        config.jwt_access_expires_in as string,
    );
    const refreshToken = createToken(
        {
            ...jwtPayload,
            profileImage: jwtPayload.profileImage || ''
        },
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );

    return {accessToken, refreshToken};
}

const refreshTokenFromDB = async (token: string) => {
    // Verify the refresh token
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);
    const { email } = decoded;  // Extract email or other necessary info from the decoded token

    const user = await User.isUserExistsByCustomId(email);  // Find user by email

    if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    if (user.isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'Your account is blocked!');
    }

    // Generate new access token and refresh token
    const jwtPayload = {
        _id: user._id,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        name: user.name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        gender: user.gender,
        dateofbirth: user.dateofbirth
    };
    const accessToken = createToken(
        {
            ...jwtPayload,
            profileImage: jwtPayload.profileImage || ''
        },
        config.jwt_secret as string,
        config.jwt_access_expires_in as string,  // Access token expiration
    );
    const refreshToken = createToken(
        {
            ...jwtPayload,
            profileImage: jwtPayload.profileImage || ''
        },
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,  // Refresh token expiration
    );

    return { accessToken, refreshToken };
};



export const AuthServices = {
    loginUserFromDB,
    refreshTokenFromDB
}
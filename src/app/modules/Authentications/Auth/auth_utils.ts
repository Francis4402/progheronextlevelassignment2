import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = (
    jwtPayload: { _id: string; email: string; role: string, profileImage: string, name: string, phone: string, address: string, gender: string, dateofbirth: string, city: string,},
    secret: string,
    expiresIn: string,
) => {
  const options: SignOptions = {
    expiresIn: expiresIn as unknown as number,
  };
  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

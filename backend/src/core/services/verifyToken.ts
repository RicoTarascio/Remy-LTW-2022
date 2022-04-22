import jwt from "jsonwebtoken";

const verifyToken = (
  toValidate: Object
): [error: Error | undefined, payload: jwt.JwtPayload | undefined] => {
  const stringToken = toValidate.toString();
  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    const payload = jwt.verify(stringToken, JWT_SECRET) as jwt.JwtPayload;
    return [undefined, payload];
  } catch (error: any) {
    return [error, undefined];
  }
};

export default verifyToken;

import jwt from "jsonwebtoken";

const createToken = (toTokenize: Object) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS!;

  return jwt.sign(toTokenize, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: +jwtExpirySeconds,
  });
};

export default createToken;

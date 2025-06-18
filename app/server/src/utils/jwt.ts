import Jwt from "jsonwebtoken";
import { TokenPayload } from "../types/auth.types";

const JWT_SECRET = process.env.JWT_SECRET as string;
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export const generateAccessToken = (userId: number, role: string): string => {
  return Jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

export const generateRefreshToken = (userId: number): string => {
  return Jwt.sign({ userId }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

export const verifyToken = (token: string): TokenPayload => {
  return Jwt.verify(token, JWT_SECRET) as TokenPayload;
};

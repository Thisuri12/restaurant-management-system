import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Access token required" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    (req as any).user = decoded;

    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid or expired access token" });
    return; // <-- no direct return of response object
  }
};

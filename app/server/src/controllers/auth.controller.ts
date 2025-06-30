import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { User } from "@models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { AuthResponse } from "../types/auth.types";

// Register function
const tokenBlacklist = new Set<string>();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: parsed.error.flatten() });
      return;
    }

    const { full_name, email, password } = parsed.data;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User already exists." });
      return;
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name,
      email,
      password_hash,
      provider: "local",
      role: "customer",
      is_verified: false,
    });

    const response: Omit<AuthResponse, "accessToken" | "refreshToken"> = {
      user: {
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.full_name,
        role: newUser.role,
      },
    };

    res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      ...response,
    });
  } catch (err) {
    next(err);
  }
};

// Login function
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: parsed.error.flatten() });
      return;
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({
      where: { email, provider: "local" },
    });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials." });
      return;
    }

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    // ✅ Set tokens in response headers only
    res.setHeader("X-Access-Token", accessToken);
    res.setHeader("X-Refresh-Token", refreshToken);

    // ✅ Return only user data in body (no tokens)
    res.status(StatusCodes.OK).json({
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Authorization header with Bearer token is required",
      });
      return;
    }

    const oldToken = authHeader.split(" ")[1];

    if (tokenBlacklist.has(oldToken)) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid refresh token" });
      return;
    }

    const decoded = verifyToken(oldToken);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not found" });
      return;
    }

    const newAccessToken = generateAccessToken(user.id, user.role);
    const newRefreshToken = generateRefreshToken(user.id);

    tokenBlacklist.add(oldToken);

    // Set tokens in response headers only
    res.setHeader("X-Access-Token", newAccessToken);
    res.setHeader("X-Refresh-Token", newRefreshToken);

    // Return only user data in body
    res.status(StatusCodes.OK).json({
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
      message: "Token refreshed successfully",
    });
  } catch (err) {
    next(err);
  }
};

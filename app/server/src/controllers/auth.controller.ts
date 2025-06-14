import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@models/user.model";
import { generateAccessToken, generateRefreshToken } from "src/utils/jwt";
import { loginSchema, registerSchema } from "src/utils/validator";

// Register func
export const register = async (req: Request, res: Response): Promise<void> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.flatten() });
    return;
  }

  const { full_name, email, password } = parsed.data;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists." });
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

    res.status(201).json({
      message: "User Registered.",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Registration Failed.", error: err });
  }
};

//Login func
export const login = async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.flatten() });
    return;
  }

  const { email, password } = parsed.data;

  try {
    const loginUser = await User.findOne({
      where: { email, provider: "local" },
    });
    if (!loginUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const valid = await bcrypt.compare(password, loginUser.password_hash);
    if (!valid) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    const accessToken = generateAccessToken(loginUser.id, loginUser.role);
    const refreshToken = generateRefreshToken(loginUser.id);

    await loginUser.update({ refresh_token: refreshToken });

    res.json({
      accessToken,
      refreshToken,
      loginUser: {
        id: loginUser.id,
        full_name: loginUser.full_name,
        email: loginUser.email,
        role: loginUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login Failed.", error: err });
  }
};

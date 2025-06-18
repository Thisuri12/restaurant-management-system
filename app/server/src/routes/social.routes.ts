import { Router } from "express";
import passport from "passport";
import "../middleware/passport-google";
import "../middleware/passport-facebook";
import { generateAccessToken, generateRefreshToken } from "src/utils/jwt";

const router = Router();

//Google Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback/google",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);
    user.update({ refresh_token: refreshToken });

    res.json({ accessToken, refreshToken, user });
  }
);

//FB Route
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/callback/facebook",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    const user = req.user as any;
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);
    user.update({ refresh_token: refreshToken });

    res.json({ accessToken, refreshToken, user });
  }
);

export default router;

import { Router } from "express";
import passport from "passport";
import "../middleware/passport-google";
import "../middleware/passport-facebook";
import { generateAccessToken, generateRefreshToken } from "src/utils/jwt";

const router = Router();

// === GOOGLE LOGIN ===
router.get("/google", (req, res, next) => {
  const redirect = req.query.redirect || "/";
  res.cookie("postLoginRedirect", redirect, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});

router.get(
  "/callback/google",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const user = req.user as any;
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);
    await user.update({ refresh_token: refreshToken });

    const redirectPath = req.cookies.postLoginRedirect || "/";
    res.clearCookie("postLoginRedirect");

    const redirectUrl = `http://localhost:3000/social-callback?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${encodeURIComponent(
      JSON.stringify(user)
    )}&redirect=${encodeURIComponent(redirectPath)}`;

    res.redirect(redirectUrl);
  }
);

// === FACEBOOK LOGIN ===
router.get("/facebook", (req, res, next) => {
  const redirect = req.query.redirect || "/";
  res.cookie("postLoginRedirect", redirect, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  passport.authenticate("facebook", { scope: ["email"] })(req, res, next);
});

router.get(
  "/callback/facebook",
  passport.authenticate("facebook", { session: false }),
  async (req, res) => {
    const user = req.user as any;
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);
    await user.update({ refresh_token: refreshToken });

    const redirectPath = req.cookies.postLoginRedirect || "/";
    res.clearCookie("postLoginRedirect");

    const redirectUrl = `http://localhost:3000/social-callback?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${encodeURIComponent(
      JSON.stringify(user)
    )}&redirect=${encodeURIComponent(redirectPath)}`;

    res.redirect(redirectUrl);
  }
);

export default router;

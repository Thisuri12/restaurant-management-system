import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "@models/user.model";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.OAUTH_REDIRECT}/google`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Safely check if email exists
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("Google account has no email"), undefined);
        }

        // Try to find user by social_id and provider
        const existingUser = await User.findOne({
          where: { social_id: profile.id, provider: "google" },
        });

        if (existingUser) return done(null, existingUser);

        // Create a new user with all required fields
        const newUser = await User.create({
          full_name: profile.displayName,
          email: email,
          password_hash: "",
          provider: "google",
          social_id: profile.id,
          role: "customer",
          is_verified: true,
        });

        return done(null, newUser);
      } catch (err) {
        // Log for debugging
        console.error("Google strategy error:", err);
        return done(err, undefined);
      }
    }
  )
);

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
        const existingUser = await User.findOne({
          where: { social_id: profile.id, provider: "google" },
        });

        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          full_name: profile.displayName,
          email: profile.emails?.[0].value as string,
          password_hash: "",
          provider: "google",
          social_id: profile.id,
          role: "customer",
          is_verified: true,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, undefined);
      }
    }
  )
);

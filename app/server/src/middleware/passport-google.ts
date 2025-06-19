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
        const email = profile.emails?.[0]?.value?.toLowerCase();
        if (!email) {
          return done(new Error("Google account has no email"), undefined);
        }

        // Check by social_id + provider
        let user = await User.findOne({
          where: { social_id: profile.id, provider: "google" },
        });

        // If not found, check by email
        if (!user) {
          user = await User.findOne({ where: { email } });

          // If found, update to link with Google
          if (user) {
            await user.update({
              provider: "google",
              social_id: profile.id,
              is_verified: true,
            });
          } else {
            // If completely new, create user
            user = await User.create({
              full_name: profile.displayName,
              email,
              password_hash: "",
              provider: "google",
              social_id: profile.id,
              role: "customer",
              is_verified: true,
            });
          }
        }

        return done(null, user);
      } catch (err) {
        console.error("Google strategy error:", err);
        return done(err, undefined);
      }
    }
  )
);

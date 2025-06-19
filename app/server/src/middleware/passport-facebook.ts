import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { User } from "@models/user.model";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: `${process.env.OAUTH_REDIRECT}/facebook`,
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        if (!email) {
          return done(new Error("Facebook did not provide an email"));
        }

        // Try by social_id and provider
        let user = await User.findOne({
          where: { social_id: profile.id, provider: "facebook" },
        });

        // If not found, check by email
        if (!user) {
          user = await User.findOne({ where: { email } });

          if (user) {
            // Update to link Facebook account
            await user.update({
              provider: "facebook",
              social_id: profile.id,
              is_verified: true,
            });
          } else {
            // Create new user
            user = await User.create({
              full_name: profile.displayName,
              email,
              password_hash: "",
              provider: "facebook",
              social_id: profile.id,
              role: "customer",
              is_verified: true,
            });
          }
        }

        return done(null, user);
      } catch (err) {
        console.error("Facebook strategy error:", err);
        return done(err, undefined);
      }
    }
  )
);

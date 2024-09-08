import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/userModel";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
      const { email, given_name: firstName, family_name: lastName } = profile._json;

      try {
        let user = await UserModel.findOne({ email });

        if (!user) {
          user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: "", // No password for OAuth users
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: (err: any, user?: any) => void) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
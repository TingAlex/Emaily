const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
//User is our model class
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  //mongoo generate the user.id automally, use this rather googleId is because people could log in with a different OAuth.
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
    }
  )
);
passport.use(
  new GithubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: "/auth/github/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      // console.log("refreshToken", refreshToken);
      // console.log("profile", profile);
      // console.log("githubId:", profile.id);
      User.findOne({ githubId: profile.id }).then(existingUser => {
        if (existingUser) {
          //aleady have a record before
          done(null, existingUser);
        } else {
          //make new record
          //need save() to
          new User({ githubId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

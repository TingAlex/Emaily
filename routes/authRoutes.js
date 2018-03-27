const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get("/auth/google/callback", passport.authenticate("google"));
  app.get(
    "/auth/github",
    passport.authenticate("github", {
      scope: ["profile", "email"]
    })
  );
  app.get("/auth/github/callback", passport.authenticate("github"));
  app.get("/api/logout", (req, res) => {
    req.logout();
    //req.user was killed so we have no user to sign in, so we just get empty content.
    res.send(req.user);
  });
  app.get("/api/current_user", (req, res) => {
    // res.send(req.session);
    res.send(req.user);
  });
};

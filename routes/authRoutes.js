const passport = require("passport");
module.exports = app => {
  //google OAuth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/", (req, res) => {
    res.send("hi");
  });
  app.get("/hello", (req, res) => {
    res.send("hello~");
  });
  //github OAuth
  app.get(
    "/auth/github",
    passport.authenticate("github", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/github/callback",
    passport.authenticate("github"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );
  app.get("/api/logout", (req, res) => {
    req.logout();
    //req.user was killed so we have no user to sign in, so we just get empty content.
    // res.send(req.user);
    res.redirect("/");
  });
  app.get("/api/current_user", (req, res) => {
    // res.send(req.session);
    res.send(req.user);
  });
};

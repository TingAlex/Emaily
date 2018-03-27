// const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
//these two statement must appear in this order!you must require user model first.
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);
const app = express();
//middleware
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
//
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);

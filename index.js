// const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
//these two statement must appear in this order!you must require user model first.
require("./models/User");
require("./models/survey");
require("./services/passport");
const bodyParser = require("body-parser");
mongoose.connect(keys.mongoURI);
const app = express();
//middleware
app.use(bodyParser.json());
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
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);
if (process.env.NODE_ENV == "production") {
  //Express will serve up production assets
  //like main.js file, or main.css file
  app.use(express.static("client/build"));
  //Express will serve up the index.html file
  //if it doesn'trecongnize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

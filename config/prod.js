//prod.js - production keys here!
module.exports = {
  googleClientID:
    "294766320364-v7k8ck0re3f7g5qlfvv7e366uitsipn1.apps.googleusercontent.com",
  googleClientSecret: "DkPp-W_dmmBL4JuMrQyBZIv4",
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey:process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey:process.env.STRIPE_SECRET_KEY
};

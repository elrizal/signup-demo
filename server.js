const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");

const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
app.use("/api", require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes"));

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log("\n (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ) \n Listening on port %s. Visit http://localhost:%s/ in your browser.  \n ", PORT);
  });
});

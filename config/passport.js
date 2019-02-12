var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(new LocalStrategy(
    // how to identify the user
    {
      usernameField: "email"
    },
    function(email, password, done) {
      //looks for email associated with user's input
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Sorry. That entry does not match our records. Please sign up or checking your e-mail's spelling."
          });
        }
        // If there is a user with the given email, but the password the
        // user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password. Please check your spelling of your password"
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  ));
  
  // In order to help keep authentication state across HTTP requests,
  // Sequelize needs to serialize and deserialize the user
  // Just consider this part boilerplate needed to make it all work
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
  // Exporting our configured passport
  module.exports = passport;
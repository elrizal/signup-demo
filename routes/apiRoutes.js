const router = require("express").Router();
require("dotenv").config();
const db = require("../models");
const passport = require("../config/passport");

router.post("/login", passport.authenticate("local"), function (req, res) {
  console.log(req.user);
  res.json("/members");
});

router.post("/signup", function (req, res) {

  db
    .User
    .create({email: req.body.email, password: req.body.password})
    .then(function (userInfo) {
      // Upon successful signup, log user in
      req
        .login(userInfo, function (err) {
          if (err) {
            console.log(err)
            return res
              .status(422)
              .json(err);
          }
          console.log(req.user);
          return res.json("/members");
        });
    })
    .catch(function (err) {
      console.log(err);
      res
        .status(422)
        .json(err);
    });

});

router.get("/user_data", function (req, res) {
  if (!req.user) {
    res.json({});
  } else {
    res.json({email: req.user.email, id: req.user.id, photo: req.user.photo});
  }
});

module.exports = router;
const router = require("express").Router();
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function (req, res) {
  if (req.user) {
    return res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/signup", function (req, res) {
  if (req.user) {
    return res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/login", function (req, res) {
  if (req.user) {
    return res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/members", isAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/members.html"));
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});


module.exports = router;
var express = require('express');
var router = express.Router();
const db = require("../models/index");
const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();
const salt = "fade";
const transporter = require('../helper/email');



/* GET home page. */
router.get("/", async function(req, res, next) {
  res.render("home", { courses: await db.Courses.findAll()});
});
router.get("/login", (req, res, next) => {
  res.render("login");
});
router.post("/login", async (req, res, next) => {
  let user = await db.Users
  .findOne({ where: { email: req.body.email } });
  
  hasher({ password: req.body.password 
    , salt : salt  }, async function(
    err,
    password,
    salt,
    hash
  ) {
    if(user.password === hash){
      req.session.user = user;
      
      res.redirect("/");
    }
    else{
      res.redirect("/login");
    }
  
  });
  
});

router.get("/register", (req, res, next) => {
  res.render("signUp");
});
router.post("/register", async (req, res, next) => {
  hasher({ password: req.body.password 
    , salt : salt }, async function(
    err,
    password,
    salt,
    hash
  ) {
    req.body.password = hash;
    let user = await db.Users.create(req.body);
    req.session.user = user;
    var mailOptions = {
      from: 'school3091999@gmail.com',
      to: user.email,
      subject: 'Welcome',
      text: 'Hi You From Fadi'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.redirect("/");
  });
});
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {});
  res.redirect('/login');
});
router.get("/view/:id", async (req, res, next) => {
  res.render("course", {
    course: await db.Courses.findByPk(req.params.id)
  });
});

module.exports = router;

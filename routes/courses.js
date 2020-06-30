var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('admin/courses',  {courses : await db.Courses.findAll({ include: [db.Teacher] })});
});

router.get("/create", async function(req, res) {
  res.render("admin/addCourse" , {
    teacher : await db.Teacher.findAll()
  });
  });
router.post("/create", async function(req, res) {
  await db.Courses.create(req.body);
  res.redirect("/courses");
});
router.get("/delete/:id", async function(req, res) {
  await db.Courses.destroy({ where: { id: req.params.id } });
  res.redirect("/courses");
});
router.get("/edit/:id", async function(req, res) {
  res.render("admin/editCourse",
   { courses: await db.Courses.findByPk(req.params.id) });
});
router.post("/update", async function(req, res) {
  // res.send(req.body)
  await db.Courses.update(req.body ,
    {where : {id : req.body.id}});
  res.redirect('/courses');
});


module.exports = router;

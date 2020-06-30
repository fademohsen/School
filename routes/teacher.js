var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('admin/teahcers' ,  {teacher : await db.Teacher.findAll()});
});
router.get("/create", function(req, res) {
  res.render("admin/addTeacher");
});
router.post("/create", async function(req, res) {
  await db.Teacher.create(req.body);
  res.redirect("/teacher");
});
router.get("/delete/:id", async function(req, res) {
  await db.Teacher.destroy({ where: { id: req.params.id } });
  res.redirect("/teacher");
});
router.get("/edit/:id", async function(req, res) {
  res.render("admin/editTeacher",
   { teahcers: await db.Teacher.findByPk(req.params.id) });
});
router.post("/update", async function(req, res) {
  // // res.send(req.body)
  await db.Teacher.update(req.body ,
    {where : {id : req.body.id}});
  res.redirect('/teacher');
});



module.exports = router;

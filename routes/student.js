var express = require('express');
var router = express.Router();
const db = require('../models/index');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('admin/students' ,  {student : await db.Student.findAll()});
});
router.get("/create", function(req, res) {
  res.render("admin/addStudent");
});
router.post("/create", async function(req, res) {
  await db.Student.create(req.body);
  res.redirect("/student");
});
router.get("/delete/:id", async function(req, res) {
  await db.Student.destroy({ where: { id: req.params.id } });
  res.redirect("/student");
});
router.get("/edit/:id", async function(req, res) {
  res.render("admin/editStudent",
   { teahcers: await db.Student.findByPk(req.params.id) });
});
router.post("/update", async function(req, res) {
  // // res.send(req.body)
  await db.Student.update(req.body ,
    {where : {id : req.body.id}});
  res.redirect('/student');
});
module.exports = router;

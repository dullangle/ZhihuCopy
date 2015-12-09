var express = require('express');
var router = express.Router();
var question=require("../models/question");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home', function(req, res, next) {
    res.render('home');
});

router.post("/question",function(req,res){
    var title=req.body.title,
        description=req.body.description,
        tag=req.body.tag1;

    tags = [req.body.tag1];


    question.newQuestionSave(title,description,tag,function(err){
        if(err){
            console.log("save question err");
            return;
        }
        res.redirect("/");
    });
});

module.exports = router;

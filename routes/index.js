var express = require('express');
var router = express.Router();
var question=require("../models/question");
var User=require("../models/user");
var crypto = require('crypto');
var configure = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('index');
    }
    else{
        res.render("login");
    }
});

router.get('/index', function(req, res, next) {
    if(req.session.user){
        res.render('index');
    }
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

router.post('/signup',function(req,res){
    var username=req.body.user;
    var password=req.body.password;

    // 密码md5加盐加密
    var md5 = crypto.createHash('md5'),
        password = md5.update(password + configure.password_salt).digest('hex');
    User.newUser(username, password, function (err, user) {
        if (err) {
            return res.status(200).json({message:err.message});

        }
        res.cookie(configure.auth_cookie_name, user._id, {
            maxAge: 1000 * 60 * 60 *24 * 30,
            signed: true
        });
        req.session.user = user;
        return res.status(200).json({message:'ok'});
    });

});

router.post('/signin',function(req,res){
    var username=req.body.user;
    var password=req.body.password;

    var md5 = crypto.createHash('md5'),
        password = md5.update(password + configure.password_salt).digest('hex');

    User.login(username,password,function(err,user){
        if(err){
            return res.status(200).json({message:err.message});
        }
        if(user && user.password!=password){
            return res.status(200).json({message:"密码错误"});
        }
        else{
            res.cookie(configure.auth_cookie_name, user._id, {
                maxAge: 1000 * 60 * 60 *24 * 30,
                signed: true
            });
            req.session.user = user;
            return res.status(200).json({message:"ok"});
        }
    });

});

router.get('/logout', function(req, res, next) {
    if(req.session.user){
        req.session.user=null;
        res.redirect('/');
    }
});

module.exports = router;

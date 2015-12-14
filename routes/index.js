var express = require('express');
var router = express.Router();
var question=require("../models/question");
var User=require("../models/user");
var crypto = require('crypto');
var configure = require('../config');
var Answer=require("../models/answer");
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
router.get("/question",function(req,res){

    if(req.session.user){
        question.findQueByUserId(req.session.user._id,function(err,questions){
            if(err){
                return res.status(200).json(err);
            }
            else
                return res.status(200).json(questions);
        });

    }

});
router.post("/question",function(req,res){
    var title=req.body.title,
        description=req.body.description,
        tag=req.body.tag1;

    tags = [req.body.tag1];


    question.newQuestionSave(req.session.user._id,title,description,tag,function(err){
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
        res.clearCookie(configure.auth_cookie_name, {
            maxAge: 1000 * 60 * 60 *24 * 30,
            signed: true
        });
        res.redirect('/');
    }
});


router.get("/question/:que_id",function(req,res){
    var user=req.session.user;
    var que_id=req.params.que_id;
    if(user){
        question.findQueByQuestionId(que_id,function(err,que){
            if(err){
                return err;
            }
            User.findUserById(que.author_id,function(err,author){
               if(err){
                   return err;
               }
                return res.render("question",{
                    que:que,
                    author:author
                });
            });

        });
    }
});


router.post("/question/:que_id/answer",function(req,res){
    var ans_id=req.body.ans_id;
    var upOrDown=req.body.upOrDown;
    var user=req.session.user;
    var question_id=req.params.que_id;
    if(!ans_id){
        var answer_content=req.body.ans_content;
        if(user){
            Answer.newAnswerSave(question_id,user._id,user.NickName,answer_content,function(err,answer){
                if(err){
                    return res.status(200).json(err);
                }

                return res.status(200).json(answer);
            });
        }
    }
    else{
        if(user){
            Answer.update(ans_id,upOrDown,function(err,answers){
                if(err){
                    return res.status(200).json(err);
                }
                Answer.findAnsbyQueId(question_id,function(err,answers){
                    if(err){
                        return res.status(200).json(err);
                    }

                    return res.status(200).json(answers);
                });
            })
        }
    }

});

router.get("/question/:que_id/answer",function(req,res){
    var user=req.session.user;
    var question_id=req.params.que_id;
    if(user){
        Answer.findAnsbyQueId(question_id,function(err,answers){
            if(err){
                return res.status(200).json(err);
            }

            return res.status(200).json(answers);
        });
    }
});
module.exports = router;

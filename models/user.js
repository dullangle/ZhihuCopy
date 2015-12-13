var mongoose = require('mongoose');

var Schema=mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var UserSchema=new Schema({
    NickName: { type: String },
    password:{ type: String }
});

var User=mongoose.model("users",UserSchema);


exports.newUser=function(nickname,password,callback){
    User.find({ NickName: nickname }, function (err, user) {
        if (user.length > 0) {
            err = {};
            err.message = '该账号已被注册！';
            return callback(err, user);
        }
        // 没被注册
        var user = new User();

        user.NickName=nickname;
        user.password=password;
        user.save(callback);
    });
};


exports.login=function(nickname,password,callbak){
    User.findOne({NickName:nickname},function(err,user){

       if(err){
           err={};
           err.message="没有该账号";
           return callbak(err);
       }

        callbak(err,user);
    });
};
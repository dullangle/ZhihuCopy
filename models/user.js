var mongoose = require('mongoose');

var Schema=mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var UserSchema=new Schema({
    NickName: { type: String },
    password:{ type: String }
});

var User=mongoose.model("users",UserSchema);


exports.newUser=function(nickname,password,callback){
    var user=new User();
    user.NickName=nickname;
    user.password=password;

    user.save(callback)
};
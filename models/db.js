var mongoose=require("mongoose");

var config=require("../config");

mongoose.connect(config.mongodb_url);

var db=mongoose.connection;

db.on("error",function(err){
   console.error.bind(console,"connection err");
});

db.once("open",function(){
   console.log("成功连接数据库");
});

module.exports=db;
var mongoose = require('mongoose');
var Question=require("../models/question").Question;
var Schema=mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var AnswerSchema = new Schema({
    question_id: { type: ObjectId },
    question_name: { type: String },
    author_id: { type: ObjectId },
    author_name: { type: String },
    content: { type: String },
    update_at: { type: Date, default: Date.now },
    create_at: { type: Date, default: Date.now },
    ups: [{ type: ObjectId }],
    ups_number: { type: Number, default: 0 },
    downs: [{ type: ObjectId }],
    deleted: { type: Boolean, default: false }           // 软删除
});

var answer=mongoose.model("answers",AnswerSchema);

exports.newAnswerSave = function (question_id, author_id, author_name, content,question_title, callback) {
    var ans = new answer();
    ans.question_id = question_id;
    ans.author_id = author_id;
    ans.author_name = author_name;
    ans.content = content;
    ans.question_name=question_title;
    ans.save(function (err, answer) {
        Question.findByIdAndUpdate(question_id, { $push: { comment_id: author_id }}, function (err, question) {
            callback(err, answer);
        });
    });
};

exports.findAnsbyQueId=function(question_id,callback){
  answer.find({question_id:question_id},function(err,answers){
        callback(err,answers);
  });
};

exports.update=function(ans_id,upOrDown,callback){
    if(upOrDown){
        answer.findByIdAndUpdate(ans_id, { $inc:{ ups_number: 1 }}, callback);
    }
    else{
        answer.findByIdAndUpdate(ans_id, { $inc:{ ups_number: -1 }}, callback);
    }

};

exports.findAnsbyUserId=function(user_id,callback){
    answer.find({author_id:user_id},function(err,answers){
        callback(err,answers);
    });
};
var mongoose = require('mongoose');

var Schema=mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var QuestionSchema=new Schema({
    title: { type: String },
    author_id: { type: ObjectId },
    description: { type: String },
    tags: { type: Array }, // 标签
    views:{type:Number},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    comment_id: [{ type: ObjectId }],                     // 回答问题的人
    deleted: { type: Boolean, default: false },           // 软删除
    focus_id: [{ type: ObjectId }]                        // 关注问题的人
});

var question=mongoose.model("question",QuestionSchema);

exports.newQuestionSave = function (author_id,title, description, tags, callback) {
    var que = new question();
    que.author_id = author_id;
    que.title = title;
    que.description = description;
    que.tags = tags;
    que.views=0;
    que.save(callback);
};


exports.findQueByUserId=function(author_id,callbck){
    question.find({author_id:author_id},function(err,questions){
        if(err){
            return callbck(err);
        }

        return callbck(err,questions);
    });
};

exports.findQueByQuestionId=function(que_id,callback){
    question.findByIdAndUpdate(que_id, { $inc:{ views: 1 }}, callback);
};



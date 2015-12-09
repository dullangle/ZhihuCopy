var mongoose = require('mongoose');

var Schema=mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var QuestionSchema=new Schema({
    title: { type: String },
    author_id: { type: ObjectId },
    description: { type: String },
    tags: { type: Array },                                 // 标签
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    comment_id: [{ type: ObjectId }],                     // 回答问题的人
    deleted: { type: Boolean, default: false },           // 软删除
    focus_id: [{ type: ObjectId }]                        // 关注问题的人
});

var question=mongoose.model("question",QuestionSchema);

exports.newQuestionSave = function (title, description, tags, callback) {
    var que = new question();
    que.title = title;
    que.description = description;
    que.tags = tags;
    que.save(callback);
};



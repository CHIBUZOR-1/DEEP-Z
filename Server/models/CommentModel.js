const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    blogId: {
        type: String,
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    content: {
        type: String
    }

}, {
    timestamps: true,
    minimize: false
})

const commentModel = mongoose.model('comments', commentSchema);

module.exports = commentModel;
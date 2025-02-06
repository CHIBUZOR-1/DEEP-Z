const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    descp: {
        type: String,
        required: true
    },
    mediaId: { type: String, required: true }

}, {
    timestamps: true,
    minimize: false
})

const blogModel = mongoose.model('blogs', blogSchema);

module.exports = blogModel;
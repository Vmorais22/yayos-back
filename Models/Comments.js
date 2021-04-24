'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    name: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    rate: Number,
    lesson: Number
});

module.exports = mongoose.model('Comment', CommentSchema);


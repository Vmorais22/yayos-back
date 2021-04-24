/*ESQUEMA DE LOS COMENTARIOS*/

'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuggestSchema = Schema({
    name: String,
    email: String,
    content: String,
    sex: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Suggest', SuggestSchema);


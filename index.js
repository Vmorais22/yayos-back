'use strict'

require('dotenv').config({path: '../src/var.env'});

const mongoose = require('mongoose');
const app = require('./app')
const port = 3900;


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
try {
    mongoose.connect('mongodb+srv://yayos:yayos@yayos.64oge.mongodb.net/yayos?retryWrites=true&w=majority',
        {useNewUrlParser: true}, () => console.log(" Mongoose is connected")
    )
} catch (e) {
    console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
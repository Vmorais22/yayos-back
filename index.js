'use strict'

require('dotenv').config({path: '../src/var.env'});

const mongoose = require('mongoose');
const app = require('./app')

const port = 3901;
/*CONEXIÖN MONGODB A NODE*/

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://yayos:yayos@yayos.64oge.mongodb.net/yayos?retryWrites=true&w=majority', {useNewUrlParser: true})
        .then(() => {
            console.log('La conexión a la base de datos correcta');

            app.listen(port, () => {
                console.log("servidor creado en puerto " + port)
            })
        });


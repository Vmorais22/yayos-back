'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');
var Comment = require('../Models/Comments');

//CHECK IN POSTMAN USING x-www-form-urlencoded
const controller = {

    test: (req, res) => {
        return res.status(200).send({
            message: 'Testing controller function'
        });
    },

    save: (req, res) => {
        //Recoger parametros por post
        const params = req.body;
        //Validar datos
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Faltan datos'
            });
        }
        if (validate_name && validate_content) {
            //Crear el objeto a guardar
            var comment = new Comment();

            //Asignar valores
            comment.name = params.name;
            comment.content = params.content;
            comment.rate = params.rate;
            comment.lesson = params.lesson;

            //Guardar el articulo
            comment.save((err, commentStored) => {
                if (err || !commentStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Comentario no guardado'
                    });
                }
                //Devolver una respuesta
                return res.status(200).send({
                    status: 'sucess',
                    message: 'Comentario guardado'
                });

            })

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Datos no válidos'
            });
        }
    },

    getComments: (req, res) => {

        var nLesson = req.params.lesson;
        var query = Comment.find({lesson: nLesson});
        var last = req.params.last;


        if (last || last !== undefined) {
            query.limit(15);
        }
        query.sort('id').exec((err, comments) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al mostrar comentarios'
                });
            }
            if (!comments) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay comentarios'
                });
            }
            return res.status(200).send({
                status: 'sucess',
                comments
            });
        });

    },

    getOneComment: (req, res) => {

        //recoger el id de la url
        var commentId = req.params.id;
        //comprobar que exista
        if (!commentId) {
            return res.status(404).send({
                status: 'error',
                message: 'El comentario no existe'
            });
        }

        //buscar el articulo
        Comment.findById(commentId, (err, comment) => {
            if (err || !comment) {
                return res.status(500).send({
                    status: 'error',
                    message: 'El comentario no existe'
                });
            }
            //devolverlo
            return res.status(200).send({
                status: 'sucess',
                comment
            });
        });


    },

    delete: (req, res) => {
        //recoger el id del comentario
        var commentId = req.params.id;

        //buscar y borrar
        Comment.findOneAndDelete({_id: commentId}, (err, commentRemoved) => {
            if (err || !commentRemoved) {
                return res.status(500).send({
                    status: 'error',
                    message: 'No se ha podido borrar el comentario'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                comment: commentRemoved
            });
        });

    },

    search: (req, res) => {

        var searchString = req.params.search;
        Comment.find({"$or": [
                {"name": {"$regex": searchString, "$options": "i"}},
                {"content": {"$regex": searchString, "$options": "i"}},
            ]})
            .sort([['date','descending']])
            .exec((err,comments)=> {
                if(err || !comments) {
                    return res.status(500).send({
                        status: 'sucess',
                       message: 'error en la petición'
                    });
                }
                if(comments.length === 0){
                    return res.status(500).send({
                        status: 'sucess',
                        message: 'No hay comentarios con esa palabra'
                    });
                }
                return res.status(200).send({
                    status: 'sucess',
                    comments
                });
            })

    },
    getRates: (req, res) => {

        var nLesson = req.params.lesson;
        console.log(nLesson)
        var query = Comment.find({lesson: nLesson}, 'rate');

        query.exec((err, rates) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al mostrar las rates de los comentarios'
                });
            }
            if (!rates) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay comentarios'
                });
            }
            return res.status(200).send({
                status: 'sucess',
                rates
            });
        });

    },

};

module.exports = controller;
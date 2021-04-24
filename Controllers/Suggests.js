'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');
var Suggest = require('../Models/Suggests');

//CHECK IN POSTMAN USING x-www-form-urlencoded
const controller = {

    test: (req, res) => {
        return res.status(200).send({
            message: 'Testing controller function 2'
        });
    },
    save: (req, res) => {
        //Recoger parametros por post
        const params = req.body;
        //Validar datos
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_content = !validator.isEmpty(params.content);
            /*OPTIONAL EMAIL*/
        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Faltan datos o son incorrectos'
            });
        }
        if (validate_name && validate_content) {
            //Crear el objeto a guardar
            var suggest = new Suggest();

            //Asignar valores
            suggest.name = params.name;
            suggest.content = params.content;
            suggest.email = params.email;

            //Guardar el articulo
            suggest.save((err, suggestStored) => {
                if (err || !suggestStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Formulario no guardado'
                    });
                }
                //Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    message: 'Formulario guardado'
                });

            })

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Datos no válidos'
            });
        }
    },
    getSuggests: (req, res) => {

        var query = Suggest.find({});

        query.sort('id').exec((err, suggests) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al mostrar formularios'
                });
            }
            if (!suggests) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay formularios'
                });
            }
            return res.status(200).send({
                status: 'sucess',
                suggests
            });
        });
    },
    getOneSuggest: (req, res) => {

        //recoger el id de la url
        var suggestId = req.params.id;
        //comprobar que exista
        if (!suggestId) {
            return res.status(404).send({
                status: 'error',
                message: 'El Formulario no existe'
            });
        }

        //buscar el articulo
        Suggest.findById(suggestId, (err, suggest) => {
            if (err || !suggest) {
                return res.status(500).send({
                    status: 'error',
                    message: 'El Formulario no existe'
                });
            }
            //devolverlo
            return res.status(200).send({
                status: 'sucess',
                suggest
            });
        });


    },
    delete: (req, res) => {
        //recoger el id del comentario
        var suggestId = req.params.id;

        //buscar y borrar
        Suggest.findOneAndDelete({_id: suggestId}, (err, suggestRemoved) => {
            if (err || !suggestRemoved) {
                return res.status(500).send({
                    status: 'error',
                    message: 'No se ha podido borrar el Formulario'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                comment: suggestRemoved
            });
        });

    },
    search: (req, res) => {

        var searchString = req.params.search;
        Suggest.find({"$or": [
                {"name": {"$regex": searchString, "$options": "i"}},
                {"content": {"$regex": searchString, "$options": "i"}},
                {"email": {"$regex": searchString, "$options": "i"}},
            ]})
            .sort([['date','descending']])
            .exec((err,suggest)=> {
                if(err || !suggest) {
                    return res.status(500).send({
                        status: 'success',
                        message: 'error en la petición'
                    });
                }
                if(suggest.length === 0){
                    return res.status(500).send({
                        status: 'success',
                        message: 'No hay Formularios con esa palabra'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    suggest
                });
            })

    },

}

module.exports = controller;
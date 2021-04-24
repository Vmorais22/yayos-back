'use strict'

const express = require('express');
const CommentController = require('../Controllers/Comments');

const router = express.Router();

//rutas de prueba
router.get('/test-de-controlador', CommentController.test);

//rutas útiles
router.post('/save', CommentController.save);
router.get('/comment/:lesson/:last?', CommentController.getComments);
router.get('/comment/:id', CommentController.getOneComment);
router.delete('/comment/:id', CommentController.delete);
router.get('/search/:search', CommentController.search);
router.get('/rates/:lesson', CommentController.getRates);
module.exports = router;

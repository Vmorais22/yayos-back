'use strict'

const express = require('express');
const SuggestController = require('../Controllers/Suggests');

const router = express.Router();

/*const multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/suggests'});*/

//rutas de prueba
router.get('/test', SuggestController.test);

//rutas útiles
router.post('/save', SuggestController.save);
router.get('/suggestions', SuggestController.getSuggests);
router.get('/suggestions/:id', SuggestController.getOneSuggest);
router.delete('/suggestions/:id', SuggestController.delete);
router.get('/search/:search', SuggestController.search);

module.exports = router;

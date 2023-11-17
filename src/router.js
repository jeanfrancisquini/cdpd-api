const express = require('express');

const DefUserTypeController = require('./controllers/DefUserTypeController')

const routes = express.Router();

routes.get('/api/DefUserType', DefUserTypeController.list)

module.exports = routes;
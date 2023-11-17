const express = require('express');
const api = express();

const routes = require('./router');

api.use(express.json());
api.use(routes);

api.get('/', (req, res) => {return res.send('teste')});

api.listen(3001);
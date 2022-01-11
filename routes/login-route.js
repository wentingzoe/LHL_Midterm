const express = require('express');
const router  = express.Router();

const loginRoute = (db) => {
  router.get('/', (request, response) => {
    response.render('login');
  })
  return router;
};

module.exports = loginRoute;
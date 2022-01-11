const express = require('express');
const router  = express.Router();

const registerRoute = (db) => {
  router.get('/', (request, response) => {
    response.render('register');
  })
  return router;
};

module.exports = registerRoute;
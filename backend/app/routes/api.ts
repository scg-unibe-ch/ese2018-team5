'use strict';

const router = require('express').Router();
let authController = require('../controllers/authController');

const APIRoutes = function(passport:any) {
  router.post('/signup', authController.signUp);

  router.post('/authenticate', authController.authenticateUser);
  return router;

};

module.exports = APIRoutes;

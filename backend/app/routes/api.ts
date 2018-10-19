'use strict';

const userController = require('../controllers/userController');
const adminController = require('../controllers/AdminController');
const allowOnly = require('../services/routesHelper').allowOnly;
const config1 = require('../config');
const UserControllerDelete = require('../controllers/user.controller').deleteUser;
const UserControllerUpdate = require('../controllers/user.controller').updateUser;
const UserControllerGet = require('../controllers/user.controller').getUser;

const router = require('express').Router();
let authController = require('../controllers/authController');

const APIRoutes = function(passport:any) {
  router.post('/signup', authController.signUp);

  router.post('/authenticate', authController.authenticateUser);

  router.put('/:id', UserControllerUpdate);
  router.delete('/:id', UserControllerDelete);
  router.get('/:id', UserControllerGet);

  router.get('/profile', passport.authenticate('jwt', { session: false }),
    allowOnly(config1.accessLevels.user, userController.index));

  router.get('/admin', passport.authenticate('jwt', { session: false }),
    allowOnly(config1.accessLevels.admin, adminController.index));


  return router;

};

module.exports = APIRoutes;

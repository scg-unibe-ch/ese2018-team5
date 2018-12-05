'use strict';

const userController = require('../controllers/userController');
const adminController = require('../controllers/AdminController');
const allowOnly = require('../services/routesHelper').allowOnly;
const allowed = require('../services/routesHelper').allowed;
const config1 = require('../config');
const UserControllerDelete = require('../controllers/user.controller').deleteUser;
const UserControllerUpdate = require('../controllers/user.controller').updateUser;
const UserControllerGet = require('../controllers/user.controller').getUser;
const UserControllerGetAll = require('../controllers/user.controller').getUsers;
const UserControllerPatchPW = require('../controllers/user.controller').patchPW;
const UserControllerPatchUser = require('../controllers/user.controller').patchUser;

const router = require('express').Router();
let authController = require('../controllers/authController');

const APIRoutes = function(passport:any) {
  router.post('/user/signup', authController.signUp);

  router.post('/user/authenticate', authController.authenticateUser);

  //User
  router.put('/user/:id', passport.authenticate('jwt', {session: false}),
    allowed(config1.accessLevels.user, UserControllerUpdate)); //update user
  router.delete('/user/:id', passport.authenticate('jwt', {session: false}),
    allowOnly(config1.accessLevels.user, UserControllerDelete));
  router.get('/user/:id',passport.authenticate('jwt', {session: false}),
    allowed(config1.accessLevels.user, UserControllerGet));
  router.put('/user/pw/:id', passport.authenticate('jwt', {session: false}),
    allowed(config1.accessLevels.user, UserControllerPatchPW)); //password
  router.patch('/user/:id',passport.authenticate('jwt', {session: false}),
    allowed(config1.accessLevels.user, UserControllerPatchUser));

  router.get('/JobPostingList/:id', passport.authenticate('jwt', { session: false }),
    allowed(config1.accessLevels.user, userController.userJobItems));

  router.get('/profile/:id', passport.authenticate('jwt', {session: false}),
    allowed(config1.accessLevels.user, userController.user));

  router.get('/admin/:id', passport.authenticate('jwt', { session: false }),
    allowed(config1.accessLevels.admin, UserControllerGetAll));

  return router;

};

module.exports = APIRoutes;

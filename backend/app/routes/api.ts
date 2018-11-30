'use strict';

const userController = require('../controllers/userController');
const adminController = require('../controllers/AdminController');
const allowOnly = require('../services/routesHelper').allowOnly;
const config1 = require('../config');
const UserControllerDelete = require('../controllers/user.controller').deleteUser;
const UserControllerUpdate = require('../controllers/user.controller').updateUser;
const UserControllerGet = require('../controllers/user.controller').getUser;
const UserControllerGetAll = require('../controllers/user.controller').getUsers;
const UserControllerPatchPW = require('../controllers/user.controller').patchPW;
const UserControllerPatch = require('../controllers/user.controller').patchUser;

const router = require('express').Router();
let authController = require('../controllers/authController');

const APIRoutes = function(passport:any) {
  router.post('/signup', authController.signUp);

  router.post('/authenticate', authController.authenticateUser);

  //User
  router.put('/:id', UserControllerUpdate);
  router.delete('/:id', UserControllerDelete);
  router.get('/:id', UserControllerGet);
  router.patch('/pw/:id', UserControllerPatchPW); //password
  router.patch('/:id', UserControllerPatch);
  router.get('', UserControllerGetAll);

  router.get('/JobPostingList/:id', passport.authenticate('jwt', { session: false }),
    allowOnly(config1.accessLevels.user, userController.userJobItems));

  router.get('/profile/:id', passport.authenticate('jwt', {session: false}),
    allowOnly(config1.accessLevels.user, adminController.index))

  router.get('/admin/:id', passport.authenticate('jwt', { session: false }),
    allowOnly(config1.accessLevels.admin, adminController.index));

  return router;

};

module.exports = APIRoutes;

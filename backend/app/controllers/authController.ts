import {User} from '../models/user.model';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sequelize = require('../services/database');
const config = require('../config');
const AuthController = {} as any;

AuthController.signUp = async function(req:any, res:any) {
  if(!req.body.username || !req.body.password) {
    res.json({message: 'Please provide a username and password.'});
  } else {
    sequelize.sync().then(function() {
      let newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      };
      return User.create(newUser).then(function() {
        res.status(201).json({message: 'Account created!'});
      });
    }).catch(function(err:any) {
        res.status(403).json({message: 'Username already exists!'});
    });
  }
}

AuthController.authenticateUser = function(req:any, res:any) {
  if(!req.body.username || !req.body.password) {
    res.status(404).json({ message: 'Username and password are needed!' });
  } else {
    let username = req.body.username,
      password = req.body.password,
      potentialUser = { where: { username: username } };

    User.findOne(potentialUser).then(function(user) {
      if(!user) {
        res.status(404).json({ message: 'Authentication failed!' });
      } else {
        user.comparePassword(password, function(err:any, isMatch:any) {
          if(isMatch && !err) {
            let token = jwt.sign(
              { username: user.username },
              config.keys.secret,
              { expiresIn: '30m' }
            );

            res.json({
              success: true,
              token: 'JWT ' + token
            });
          } else {
            res.status(404).json({ message: 'Login failed!' });
          }
        });
      }
    }).catch(function(error) {
      res.status(500).json({ message: 'There was an error!' });
    });
  }
}

module.exports = AuthController;


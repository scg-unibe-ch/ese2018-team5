'use strict';

const JWTStrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt,
  config1 = require('../config');

import {User} from '../models/user.model';

function hookJWTStrategy(passport:any) {

  let options = {} as any;

  options.secretOrKey = config1.keys.secret;
  options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  options.ignoreExpiration = false;

  passport.use(new JWTStrategy(options, function(JWTPayload:any, callback:any) {
    User.findOne({where: {username: JWTPayload.username}})
      .then(function(user:any) {
        if(!user) {
          callback(null, false, {message: 'Incorrect username'});
          return;
        }
        if(!user.validPassword(user.password)) {
          callback(null, false, {message: 'Incorrect password'})
        }
        callback(null, user);
      });
  }));
}

module.exports = hookJWTStrategy;

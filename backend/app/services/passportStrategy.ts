'use strict';

const JWTStrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt,
  config1 = require('../config');

import {User} from '../models/user.model';

function hookJWTStrategy(passport:any) {

  let options = {} as any;

  options.secretOrKey = config1.keys.secret;
  options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();

  passport.use(new JWTStrategy(options, function(JWTPayload:any, callback:any) {
      User.findOne({where: {id: JWTPayload.user.id}})
        .then(function(user:any) {
          if(!user) {
            callback(null, false, {message: 'Incorrect id'});
            return;
          }

          callback(null, user);
        });
  }));
}

module.exports = hookJWTStrategy;

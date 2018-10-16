'use strict';

import {JobList} from '../models/joblist.model';
import {JobItem} from '../models/jobitem.model';
import {User} from '../models/user.model';
import{Sequelize} from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'development',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite'
});
sequelize.addModels([JobList, JobItem, User]);

module.exports = sequelize;

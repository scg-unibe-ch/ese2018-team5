import {JobItem} from '../models/jobitem.model';
const sequelize = require('../services/database');

const UserController = {
  userJobItems: async function (req:any, res:any) {

    const instances = await JobItem.findAll({where: {
      userId: req.params.id
      }});

    if(instances === null || instances.length === 0) {
      res.status(404).json({message: 'error'});
    } else {
      res.statusCode = 200;
      res.send(instances.map(e => e.toSimplification()));
    }
  },
  user: async function (req:any, res:any) {
    req.user.password = '';
    res.status(200).json(req.user.toSimplification());
  }
};

module.exports = UserController;

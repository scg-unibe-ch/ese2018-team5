const sequelize = require('../services/database');
import {User} from '../models/user.model';

const AdminController = {
  index: async function(req:any, res:any) {
    const instances = await User.findAll();
    if(instances === null) {
      res.status(404).json({message: 'error'});
    } else if(instances.length === 0) {
      res.status(404).json({instances})
    }
    res.status(200).send(instances.map(e => e.toSimplification()))
  }
};

module.exports = AdminController;

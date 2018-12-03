import {JobItem} from '../models/jobitem.model';
const sequelize = require('../services/database');


const UserController = {
  userJobItems: function (req:any, res:any) {
    sequelize.sync().then(function() {
      JobItem.findAll({
        where: {
          userId: req.params.id
        }
      }).then(function (JobItems){
        if(!JobItems || JobItems.length == 0) {
          return res.status(404).json({JobItems})
        } else {
          return res.status(200).json({JobItems})
        }
      })
    });
  }
};

module.exports = UserController;

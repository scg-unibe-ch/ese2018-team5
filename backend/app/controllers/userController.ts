import {JobItem} from '../models/jobitem.model';
const sequelize = require('../services/database');

const UserController = {
  index: function (req:any, res:any) {
    sequelize.sync().then(function() {
      JobItem.findAll({
        where: {
          userId: req.params.id
        }
      }).then(function (result){
        if(!result || result.length == 0) {
          return res.status(404).json({message:'no items found'})
        } else {
          return res.status(200).json({result})
        }
      })
    });
  }
};

module.exports = UserController;

import {JobItem} from '../models/jobitem.model';
const sequelize = require('../services/database');

const UserController = {
  userJobItems: async function (req:any, res:any) {

    const instances = await JobItem.findAll({where: {
      userId: req.params.id
      }});

    if(instances === null || instances.length === 0) {
      res.status(404).json({message: 'error'});
    } else if(instances.length === 0) {
      res.status(404).json({instances})
    }
    console.log(instances.map(e => e.toSimplification()));
    res.status(200).json(instances.map(e => e.toSimplification()));


    /*sequelize.sync().then(function() {
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
    });*/
  },
  user: async function (req:any, res:any) {
    req.user.password = '';
    res.status(200).json(req.user.toSimplification());
  }
};

module.exports = UserController;

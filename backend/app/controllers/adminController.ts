
const AdminController = {
  index: function(req:any, res:any) {
    res.status(200).json({message: 'admin'});
  }
};

module.exports = AdminController;

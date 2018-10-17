
const UserController = {
  index: function (req:any, res:any) {
    res.status(200).json({message: 'Hello there' + req.user.username})
  }
}

module.exports = UserController;

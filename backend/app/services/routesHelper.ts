
exports.allowOnly = function(accessLevel:any, callback:any) {
  function checkUserRole(req:any, res:any) {
    if(!(accessLevel & req.user.role)) {
      res.sendStatus(403);
      return;
    }
    callback(req,res);
  }
  return checkUserRole;
};

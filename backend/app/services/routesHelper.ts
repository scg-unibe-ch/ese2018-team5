
exports.allowOnly = function(accessLevel:any, callback:any) {
  console.log('allowOnly');
  function checkUserRole(req:any, res:any) {
    if(!(accessLevel & req.user.role)) {
      res.sendStatus(403);
      return;
    }
    callback(req,res);
  }
  return checkUserRole;
};

exports.allowed = function(accessLevel:any, callback:any) {
  function checkUserId(req: any, res: any) {
    if(!(req.user.id & req.params.id) || !(accessLevel & req.user.role)) {
      res.sendStatus(403);
      console.log(req.user.id + 'userid');
      return;
    }
    callback(req, res);
  }
  return checkUserId;
}

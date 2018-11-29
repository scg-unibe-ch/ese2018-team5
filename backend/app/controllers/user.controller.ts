import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';
import {JobItem} from '../models/jobitem.model';

// const router: Router = Router();

const UserController = {} as any;

UserController.patchUser = async(req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if(instance == null) {
    res.status(404).json({message:'not found'});
    return;
  };
  let pw = req.body.password;
  instance.password = pw;
  await instance.save();
  res.status(200).send(instance.toSimplification());
};

UserController.getUsers = async (req: Request, res: Response) => {

  const instances = await User.findAll();
  if(instances == null) {
    res.status(404).json({message: 'no users found'});
  }
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));

};

UserController.getUser = async (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if(instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  res.statusCode = 200;
  res.send(instance.toSimplification());
};

UserController.deleteUser = async (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if(instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.destroy();
  res.statusCode = 200;
  res.json({
    'message': 'deleted'
  });
  res.send;
};

UserController.updateUser = async (req:Request, res:Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if(instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 200;
  res.send(instance.toSimplification());
};

module.exports = UserController;


/*//create user
router.post('/', async (req: Request, res: Response) => {
  const instance = new User();
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 201;
  res.send(instance.toSimplification());
})

//get user by id
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if(instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  res.statusCode = 200;
  res.send(instance.toSimplification());
});

//update user
router.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if(instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 200;
  res.send(instance.toSimplification());
});

//delete user
router.delete('/:id', async  (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await User.findById(id);
  if(instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.destroy();
  res.statusCode = 204;
  res.send;
});*/



//export const UserController: Router = router;

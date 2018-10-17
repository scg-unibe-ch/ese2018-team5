import {Router, Request, Response} from 'express';
import {User} from '../models/user.model';

const router: Router = Router();


//create user
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
})

export const UserController: Router = router;

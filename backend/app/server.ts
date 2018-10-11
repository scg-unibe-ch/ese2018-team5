// import everything from express and assign it to the express variable
import express from 'express';

// import all the controllers. If you add a new controller, make sure to import it here as well.
import {JobListController, JobItemController, UserController} from './controllers';
import {Sequelize} from 'sequelize-typescript';
import {JobList} from './models/joblist.model';
import {JobItem} from './models/jobitem.model';
import {User} from './models/user.model';

const sequelize =  new Sequelize({
  database: 'development',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite'
});
sequelize.addModels([JobList, JobItem, User]);

var cors = require('cors');
cors({credentials: true, origin: true})
// create a new express application instance
const app: express.Application = express();
app.use(express.json());
app.use(cors())

// define the port the express app will listen on
var port: number = 3000;
if (process.env.PORT !== undefined) {
  port = parseInt(process.env.PORT);
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/joblist', JobListController);
app.use('/jobitem', JobItemController);
app.use('/user', UserController);


sequelize.sync().then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});

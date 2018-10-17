// import everything from express and assign it to the express variable
import express from 'express';

// import all the controllers. If you add a new controller, make sure to import it here as well.
import {JobListController, JobItemController} from './controllers';

const bodyParser = require ('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const sequelize = require('./services/database')

var cors = require('cors');
cors({credentials: true, origin: true})
// create a new express application instance
const app: express.Application = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

//app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

app.use(passport.initialize());
const hookJWTStrategy = require('./services/passportStrategy')
hookJWTStrategy(passport);

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

//app.use('/joblist', JobListController);
app.use('/jobitem', JobItemController);

app.use('/api', require('./routes/api')(passport));

sequelize.sync().then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});

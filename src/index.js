const path = require('path');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const { query } = require('express');
const methodOverride = require('method-override')
const flash = require('connect-flash')
const port = 3000;
const route = require('./routes/index.js');
const db = require ('./config/db/connectDB');
const session  = require('express-session');
const mongoose = require('./util/mongoose.js');
const mongooses = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
//connect to db

// db.connect();

const url = `mongodb+srv://thanhhung:P15110607@cluster0.o853b.mongodb.net/banhchung?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongooses.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

// const sessionStore = new MongoStore({
//     host: '127.0.0.1',
//     port: '27017',
//     db: 'session',
//     url: 'mongodb://localhost:27017/thanhhung_dev'
// });
app.use(session({
    secret: 'mysuppersecret',
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongooses.connection}),
    cookie: { maxAge: 180 * 60 * 1000 } 
}));

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
})
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))
// Midderware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));
// fetch, XMLHTTPrequest...

//Http logger
// app.use(morgan('combined'));

//templatw engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
           sum: (a, b) => a + b ,
        }
    }),
    
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views')); 
// console.log('path',path.join(__dirname,'resources/views'))

//route init
route(app);

// app.listen(process.env.PORT || port, () => {
//     console.log(`App listening at http://localhost:${port}`);
// });

app.listen(process.env.MONGODB_URI || port)

//ghi chu
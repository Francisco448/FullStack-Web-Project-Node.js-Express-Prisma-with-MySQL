const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const MYSQLStorage = require('express-mysql-session');
const { connectionString } = require('./ConnectionString/connectionString.json')
const passport = require('passport');
const flash = require('connect-flash');
const app = express();
require('./Server/Security/passport');

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Public/Views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(session({
    secret: 'prismaKeySecret',
    resave: false,
    saveUninitialized: false,
    store: MYSQLStorage(connectionString)
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});

app.use(require('./Server/Security/Authentication'));
app.use(require('./Server/Controllers/ProductController'));
app.use(require('./Server/Controllers/ClientController'));
app.use(require('./Server/Controllers/SaleController'));
app.use(require('./Server/Controllers/MovementController'));

app.use(express.static(path.join(__dirname, 'Public')));

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})
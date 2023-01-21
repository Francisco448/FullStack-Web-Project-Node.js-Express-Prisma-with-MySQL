const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const MYSQLStorage = require('express-mysql-session');
const { connectionString } = require('./ConnectionString/connectionString');
const passport = require('passport');
const app = express();

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.set('Views', path.join(__dirname, 'Public/Views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(session({
    secret: 'prismaKeySecret',
    resave: false,
    saveUninitialized: false,
    store: MYSQLStorage(connectionString)
}));
passport.initialize();
passport.session();

app.use(require('./Server/Controller'));
app.use(express.static(path.join(__dirname, 'Public')));

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})
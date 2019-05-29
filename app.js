const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require ('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const produitRouter =require('./routes/produit');
const reclamationRouter = require('./routes/reclamation');
const documentStansarisationRouter = require('./routes/documentStansarisation');
const typeActionRouter = require('./routes/typeAction');
const  analysisMethodRouter= require('./routes/analysisMethod');
const  causeRouter= require('./routes/cause');
const ActionPlanRouter = require('./routes/ActionPlan');
const ActionRouter = require('./routes/Action');
const GroupeRouter = require('./routes/GroupeResponsable');
//Action

const typeCompanyRouter =require('./routes/typeCompany');
const companyRouter = require('./routes/company');
const defautRouter = require('./routes/defaut');
const errorHandler = require('./_helpers/errorHandler');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/AAF-db-RIS",{useNewUrlParser: true}).then(()=>{
  console.log("Connected to database");
}).catch(()=>{
  console.log("Connection Failed");
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(errorHandler);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/produit', produitRouter);
app.use('/defaut', defautRouter);
app.use('/typeCompany', typeCompanyRouter);
app.use('/reclamation',reclamationRouter);
app.use('/documentStansarisation',documentStansarisationRouter);
app.use('/typeAction',typeActionRouter);
app.use('/analysisMethod',analysisMethodRouter);
app.use('/cause',causeRouter);
app.use('/ActionPlan',ActionPlanRouter);
app.use('/Action',ActionRouter);
app.use('/Groupe',GroupeRouter);




//ActionRouter




//analysisMethod  
// catch 404 and forward to error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen('3000','localhost');
module.exports = app;

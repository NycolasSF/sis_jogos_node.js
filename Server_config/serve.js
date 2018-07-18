const express = require('express');
const consign = require('consign');	
const bodyParser = require('body-parser');
const expressValidator = require('express-validator'); 
const session = require('express-session');

const app = express();



app.set('view engine','ejs'); 
app.set('views','./app/views'); 


app.use(session({
  secret: 'sshhhhh',
  saveUninitialized: true,
   resave: true,
  saveUninitialized: true,
   cookie: { _expires:new Date() ,originalMaxAge: 1000000}
}));


app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());


app.use(express.static('public'));


consign() 
.include('app/routes')
.then('Server_config/banco.js')
.then('app/controller')
.then('app/model') 
.into(app); 
module.exports = app;  


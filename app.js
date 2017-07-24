var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

var routes = require('./routes');
var http = require('http');
var path = require('path');
var cors = require('cors')

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}


app.get('/', function (req, res) {
  res.redirect('http://shortly.io')
});
app.post('/new', routes.create_short);
app.get('/:slug', routes.find_redirect);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Module dependencies
var express = require('express'),
    api = require('./routes/api');
var app = express();

// Configuration ## CORS middleware
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function(){
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(express.bodyParser());
});

// JSON API
app.get('/switches/:id', api.getSwitch);
app.get('/switches', api.getAllSwitches);

app.put('/switches/:id', api.editSwitch);
app.put('/switches', api.editAllSwitches);

app.post('/switches', api.addSwitch);

app.delete('/switches/:id', api.deleteSwitch);

// Start server
// var server = app.listen(process.env.PORT || 3000);
// console.log('Servidor Express iniciado na porta %s', server.address().port);

// Start server
app.listen(8000);
console.log("Server running at in port 8000");


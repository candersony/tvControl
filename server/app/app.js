var express = require('express'),
  irSend = require('./irSend'),
  irService = require('./irService')(irSend);

var app = express();
app.use(express.logger());

// Configuration

app.configure(function(){
  var clientDir = 'client/app';

  app.set('views', clientDir);
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(clientDir));
  app.use(app.router);
  app.engine('html', require('ejs').renderFile);
});

app.get('/', function(request, response) {
  response.render('index.html');
});

app.get('/ir/devices', function(request, response){
  irService.getDevices().then(function(devices){
    response.send(200, devices);
  });
});

app.get('/ir/commands', function(request, response){
  irService.getCommands().then(function(devices){
    response.send(200, devices);
  });
});

app.post('/ir/:device/:command', function(request, response){
  var device = request.params.device,
      command = request.params.command;

  irService.sendCommand(device, command).then(function(result){
      response.send(200, result);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});

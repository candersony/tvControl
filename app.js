var express = require("express"),
    exec = require('child_process').exec;

var app = express();
app.use(express.logger());

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/app');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/app'));
  app.use(app.router);
  app.engine('html', require('ejs').renderFile);
});

app.get('/', function(request, response) {
  response.render('index.html')
});

app.get('/ir/:device/:command', function(request, response){
    var irCommand = {
            device: request.params.device,
        command: request.params.command
    };

    exec('irsend SEND_ONCE ' + irCommand.device + ' ' + irCommand.command.toUpperCase());

    response.send(200, irCommand);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

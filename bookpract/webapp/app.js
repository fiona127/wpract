/* app.js
 * Express Server with routes module
*/
/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

//------------Begin Module Scope Variable -------
'use strict';
var 
    http=require('http'     ),
    express = require('express'),
    routes = require('./routes'),
    app = express(),
    server = http.createServer(app);

//-----------End Module Scope Variables

//--------------begin Server Configuration---
//process.env.NODE_ENV = 'production';
app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.basicAuth('user', 'spa'));
    app.use(express.static(__dirname+'/public'));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.logger());
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }) );
});

app.configure('production', function(){
    app.use(express.errorHandler() );
});

routes.configRoutes(app, server);

//------End Server Configuration -----------

//---------Begin Start Server--------
server.listen(3000);
console.log(
    'Express server listening on port %d in %s mode',
    server.address().port, app.settings.env
);
//----------End Start Server--------

/*

//all configurations below are for routes

app.get('/', function(request, response){
    response.redirect('/spa.html');
});


app.all('/:obj_type/*?', function(request, response, next){
    response.contentType('json');
    next();
});

app.get('/:obj_type/list', function(request, response){
    //response.contentType('json');
    response.send({title: request.params.obj_type+ ' list'});
});

app.post('/:obj_type/create', function(request, response){
    //response.contentType('json');
    response.send({title: request.params.obj_type + ' created'});
});

app.get('/:obj_type/read/:id([0-9]+)', function(request, response){
    //response.contentType('json');
    response.send({
        title: 'user with id' + request.params.id + ' found'
    });
});

app.post('/:obj_type/update/:id([[0-9]+)', 
    function(request, response){
        //response.contentType('json');
        response.send({
            title: request.params.obj_type + ' with id '+ request.params.id+' updated'
        });
    }
);

app.get('/:obj_type/delete/:id([0-9]+)', 
    function(request,response){
        //response.contentType('json');
        response.send({
            title: request.params.obj_type+ ' with id '+request.params.id+' deleted'
        });
    }
);

//-------End Server Configuration----------


//--------Begin Server Congiguration -----------------
app.get('/', function(request, response){
    response.send('Hello Express');
});
//-----------End Server Configuration -------------


connectHello = function(request, response, next){
    response.setHeader('content-length', bodyText.length);
    response.end(bodyText);
};

app
    .use(connect.logger())
    .use(connectHello);
server = http.createServer(app);

server.listen(3000);



http = require('http');
server = http.createServer(function(request,response){
    var response_text = request.url === '/test' ? 'you ahve hit the test page': ' Hellow World';
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(response_text);
}).listen(3000);
*/



//console.log('Listening on port %d', server.address().port);
// socket.js - dynamic JS loading example

/*jslint         node: true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global*/

//-----Begin Module Scope Variables
'use strict';
var
    setWatch,
    
    http = require('http' ),
    express = require('express'),
    socketIo = require('socket.io'),
    fsHandle = require('fs'),
    
    app = express(),
    server = http.createServer(app),
    io = socketIo.listen(server),
    watchMap = {}
    ;
//-----End Module Scope Variables

//-----Begin Utility Methods-----
setWatch = function( url_path, file_type){
    console.log('setWatch called on '+url_path);
    if (! watchMap[ url_path] ){
        console.log('setting watch on '+url_path);
        fsHandle.watchFile(
            url_path.slice(1),
            function(current, previous){
                console.log('file accessed');
                if (current.mtime !== previous.mtime){
                    console.log('file changed');
                    io.sockets.emit( file_type, url_path);
                }
            }
        );
        watchMap[url_path]=true;
    }
};
//------End Utility Methods

//Begin Server Configuration

app.configure( function (){
    app.use(function(request, response, next){
        if(request.url.indexOf('/js/') >= 0){
            setWatch(request.url, 'script');
        }
        else if( request.url.indexOf('/css/') >= 0){
            setWatch(request.url, 'stylesheet');
        }
        next();
    });
    app.use(express.static(__dirname + '/'));
});
app.get('/', function(request, response){
    response.redirect('/socket.html');
});
//End Server Configuration

//-----Begin Start Server
server.listen(3000);
console.log(
    'Express server listening on port %d in %s mode', 
    server.address().port, app.settings.env
);
//------End Start Server
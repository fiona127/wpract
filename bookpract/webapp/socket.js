// socket.js - simple socket.io example

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
    countUp,
    http = require('http' ),
    express = require('express'),
    socketIo = require('socket.io'),
    
    app = express(),
    server = http.createServer(app),
    io = socketIo.listen(server),
    countIdx = 0
    ;
//-----End Module Scope Variables

//-----Begin Utility Methods-----
countUp = function(){
    countIdx++;
    console.log(countIdx);
    io.sockets.send(countIdx);
};
//------End Utility Methods

//Begin Server Configuration
//-----Begin Start Server
server.listen(3000);
console.log(
    'Express server listening on port %d in %s mode', 
    server.address().port, app.settings.env
);
setInterval(countUp, 1000);
//------End Start Server
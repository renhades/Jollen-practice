var http = require('http');
var url = require('url');
var WebSocketServer = require('websocket').server;

var clients = [];


// router.route, req
function start(route, handlers) {

  function onRequest(request, response) {

    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;

    console.log("Request for " + pathname + " received.");
//  console.log("Request url: " + request.url);

    route(pathname, handlers, response, query);

    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Hello World");
    response.end();
  }

  var server = http.createServer(onRequest).listen(8080, function () {
    console.log("Server has started and is listening on port 8080.");
  });

  wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
  });
  
  function onWsConnMessage(message) {
    if (message.type == 'utf8') {
      console.log('Received message: ' + message.utf8Data);
    } else if (message.type == 'binary') {
      console.log('Received binary data.');
    }
  }

  function onWsConnClose(reasonCode, description) {
    console.log(' Peer disconnected with reason: ' +
      reasonCode);
  }

  function onWsRequest(request) {
    var connection = request.accept('echo-protocol', 
    request.origin);
    console.log("WebSocket connection accepted.");

    clients.push(conncection);

    connection.on('message', onWsConnMessage);
    connection.on('close', onWsConnClose);
  }

  wsServer.on('request', onWsRequest);


}

exports.start = start;


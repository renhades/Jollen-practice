var http = require('http');

// 2
var url = require('url');
//

function start(route, handlers) {
  function onRequest(request, response) {
// 2
    var pathname = url.parse(request.url).pathname;
//
    console.log("Request for " + pathname + " received.");
// 2
    console.log("Request url: " + request.url);
    route(pathname, handlers, response);
//
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8080);
  console.log("Server has started.");
}

exports.start = start;


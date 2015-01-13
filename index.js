var server = require("./server");
var router = require("./router");
var handlers = require("./requestHandlers");

var req = {
  "/"     : handlers.start,
  "/start": handlers.start,
  "/send" : handlers.send
}

server.start(router.route, req);
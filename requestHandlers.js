var querystring = require('querystring');

var history = [ ];


function start(response, query, clients) {
  console.log("Handler 'start' is started.");
  console.log("Query string is: " + query);
}

function send(response, query, clients) {
  console.log("Handler 'send' is started.");
  console.log("Query string is: " + query);

  var parsedstring = querystring.parse(query);

  var obj = {
    message: parsedstring.m,
    username: parsedstring.u,
    timestamp: (new Date()).getTime()
  };

  history.push(obj);

  for (var i = 0; i < history.length; i++) {
    console.log("[" + i + "]" + history[i].message);
  }

  var json = JSON.stringify({ type: 'message', data: obj });

  for (var i = 0; i < clients.length; i++) {
    clients[i].sendUTF(json);
  }
}

exports.start = start;
exports.send = send;
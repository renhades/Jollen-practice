var querystring = require('querystring');

var history = [ ];


function start(response, query) {
  console.log("Handler 'start' is started.");
  console.log("Query string is: " + query);
}

function send(response, query) {
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
}

exports.start = start;
exports.send = send;
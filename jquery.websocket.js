 (function($) {

    // websocket object
  var ws;
  
  var div = this;

  function onWsMessage(message) {
    var json = JSON.parse(message.data);

    if (json.type === 'message') {
      content.prepend('<p>'+json.data.message+'</p>');
    }
  }

  $.fn.receiveWebSocket = function () {
    content = this;
    ws.onmessage = onWsMessage;
  };


  $.fn.createWebSocket = function () {

    if ("WebSocket" in window) {
      alert("WebSocket is supported by your Browser!");
      var ws = new WebSocket("ws://svn.moko365.com:8080/start");
      
      ws.onopen = function () {
        div.append("<h2>Done</h2>");
      };
      
      ws.onmessage = onWsMessage;
      
      ws.onclose = function () {
        // websocket is closed
      };
      
      ws.onerror = function () {
        this.html("<h1>error</h1>");
      };
    }
    else {
      alert("WebSocket NOT supported by your Browser!")
    }
  };
  }) ($);
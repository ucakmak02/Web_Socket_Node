const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 65432 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    var listMessage = message.split("✿");
    console.log(listMessage[0])
    

    var wifi = require("node-wifi");

    wifi.init({
      iface: null // network interface, choose a random wifi interface if set to null
    });
    wifi.connect({ssid:listMessage[0], psk:listMessage[1]}).then(() => {
        console.log('Connected to network.');
    })
    .catch((error) => {
        console.log(error);
    });
     
    // Scan networks
    wifi.scan(function(err, networks) {
      if (err) {
        console.log(err);
      } else {
        var myJSON = JSON.stringify(networks);
        ws.send(myJSON);
        console.log(networks);
      }
    });
  });
});

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

const PORT = 3001;

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', '172.46.3.111', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    let received = JSON.parse(message);
    switch (received.type) {
      case 'content':
        received.text['id'] = uuid.v4();
        wss.broadcast(JSON.stringify(received));
        break;
      case 'username':
        ws.send(JSON.stringify(received));
        received.text['id'] = uuid.v4();
        received.type = 'usernameSystemMsg'
        wss.broadcast(JSON.stringify(received));
        break;
    }
  })

  ws.on('close', () => console.log('Client disconnected'));
});

wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  })
}

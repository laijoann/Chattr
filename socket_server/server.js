/* TODO: change IP (172.46.3.111 at LHL)*/

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');
const fetch = require('node-fetch');
const querystring = require('querystring')

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
    received.text['id'] = uuid.v4();
    switch (received.type) {
      case 'content':
        wss.broadcast(JSON.stringify(received));
        break;
      case 'username':
        ws.send(JSON.stringify(received));
        received.type = 'usernameSystemMsg'
        wss.broadcast(JSON.stringify(received));
        break;
      case 'giphy':
        let searchTerms = querystring.stringify({
          api_key: 'dc6zaTOxFJmzC',
          tag: received.text.content
        })
        fetch(`http://api.giphy.com/v1/gifs/random?${searchTerms}`)
          .then( resp => { return resp.json()})
          .then( json => {
            received.text.content = json.data.image_url;
            wss.broadcast(JSON.stringify(received))
          })
          .catch(console.error)
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

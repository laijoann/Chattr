/* TODO: change IP (172.46.3.111 at LHL)*/

const express = require('express');
const SocketServer = require('ws').Server;
const fetch = require('node-fetch');
const querystring = require('querystring')

const PORT = 3001;

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', '172.46.3.111', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let colour = '#';
    for (let i = 0; i < 6; i++ ) {
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({
    type: 'userColour',
    text: getRandomColor()
  }))
  wss.broadcast(JSON.stringify(
    {
      type: 'clientNum',
      text: wss.clients.size
    }
  ))

  ws.on('message', (message) => {
    let received = JSON.parse(message);
    switch (received.type) {
      case 'content':
      case 'image':
      case 'garfield':
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

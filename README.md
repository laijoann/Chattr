# Chattr

## Goal
Many of the web applications that you use today have real-time functionality where the user does not have to reload the page in order to see updates. Major examples of these include Slack, Twitter and Facebook.
Chattr allows users to communicate with each other without having to register accounts. It will use React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

## Features
- use command __/gif__ _keyword_ to get a random gif from giphy
- __:__ _emoji-command_ __:__ to use emojis
- display images when image links are entered
- use command __/garfield__ to get a random garfield comic strip

## Functional Requirements
Chattr is primarily a client-side SPA (single-page app) built with ReactJS. It contains a chat log displaying messages and notifications, an input field to change your name, and an input field to send a message. The client-side app communicates with a server via WebSockets for multi-user real-time updates. No persistent database is involved; the focus is on the client-side experience.

## Stack
- Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
- WebSockets using Node package ws on the server-side, and native WebSocket on client side
- ReactJS

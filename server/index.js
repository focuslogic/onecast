const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const middleware = require('./middleware');
const routes = require('./routes');

const build = path.join(__dirname + '/../build');

app.use(middleware.bodyParser.json());
app.use(middleware.bodyParser.urlencoded({ extended: true }));
app.use(middleware.morgan('dev'));

app.use(express.static(build));

app.use('/api/navigation', routes.navigation);
app.use('/api/stream', (req, res, next) => {
  res.set({ 'Access-Control-Allow-Origin': '*'});
  next();
}, routes.stream);

app.listen(2222, () => console.log('Ready to accept connections on port 2222'));
const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.use('/', express.static('public'));
app.get('/', function(req, res){
  res.render('index', { version: Date.now() });
});

app.listen(3000);

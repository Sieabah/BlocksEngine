const express = require('express'),
    path = require('path');

const app = express();

app.get('/', function(req, res){
    res.sendFile(path.resolve('./local.html'));
});

app.use('/', express.static('public'));
app.listen(3000);
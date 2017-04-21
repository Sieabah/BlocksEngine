const express = require('express'),
    path = require('path');

const app = express();

app.get('/', function(req, res){
    res.sendFile(path.resolve('./local.html'));
});

app.use('/static', express.static(path.resolve('./built/local')));
app.listen(80);
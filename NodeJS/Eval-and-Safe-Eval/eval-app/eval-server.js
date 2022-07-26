'use strict';
const express = require('express');
const PORT = 8001;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', function(req,res){
    res.send('Hello ' + eval(req.query.q));
    console.log(req.query.q);
});

app.listen(PORT,HOST)
console.log(`Running on http://${HOST}:${PORT}`)
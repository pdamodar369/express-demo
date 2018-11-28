const express = require('express')
const app = express();

app.get('/', function(req, res) {
    console.log("Hello World");
    res.write("Hello World");
    res.end();
});

app.listen(3000, ()=> console.log('Listening on port 3000...'));


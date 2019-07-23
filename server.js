const express = require('express');
const app = express();

const PORT = 8080;

app.listen(PORT, function() {
  console.log("Server listening on: localhost:" + PORT);
});

app.use(express.static(__dirname));

app.get('/*/clientbundle.js', function(req, res){
  res.sendfile(__dirname + '/clientbundle.js');
});

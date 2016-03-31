var express = require('express');
var spotify = require('./spotify.js');

var app = express();

var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
   res.send('Made by mobi for UTA radio.');
});

app.get("/albumImage", function(req, res) {
  res.send({
    foo: 'bar'
  });
});

app.get("/artistImage", function(req, res) {
  var artist = req.query.artist;
  var result = {
    url: "http://style.anu.edu.au/_anu/4/images/placeholders/person.png",
    placeholder: true
  }
  
  spotify.getArtistImage(artist)
    .then(function(url) {
      result.url = url;
      result.placeholder = false;

      res.send(result);
    })
    .catch(function(error) {
      res.send(result);
    });
});

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
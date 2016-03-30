var Promise = require('bluebird');
var rp = require('request-promise');

module.exports = {

  getArtistImage: function(artist) {
    var url = {
      uri: "https://api.spotify.com/v1/search?q=" + artist + "&type=artist",
      json: true
    };

    return new Promise(function(resolve, reject) {
      rp(url)
        .then(function(data) {
          var found = data["artists"]["items"];
          if(found.length > 0) {
            var images = found[0]["images"];
            if(images.length > 0) {
              resolve(images[images.length - 1]["url"]);
              return;
            }
          }

          reject();
        })
        .catch(function(err) {
          reject();
        });
    });
  }

};
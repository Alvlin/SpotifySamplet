var express = require('express');
var router = express.Router();

var request = require('request'); // "Request" library
var client_id = '945d42a8c24d46f882fc56f6e0432e99'; // Your client id
var client_secret = 'd9bc2b746063459ab2d7e322f0cc0892'; // Your secret

const app = express();

router.get('/', function(req, res, next) {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      // request.get(options, function(error, response, body) {
      //   console.log(body);
      // });
      console.log(token);
      res.send(body.access_token);
    }
  });

});

module.exports = router;

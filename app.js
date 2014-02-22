var express = require('express'),
  app = express(),
  fs = require('fs'),
  path = require('path'),
  redis = require("redis"),
  port = process.env.PORT || 3000,
  redisport = port !== 3000 ? 6111 : 6379,
  client = redis.createClient(redisport);

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on("ready", function (e) {
    console.log('Redis client active');
    client.get('templates', function (err, res){
      if (err) {
        console.log(err);
      } else {
        if (!res) {
          require('./app/templates').templates(client);
          client.get('header', redis.print);
        }
      }
    });
});

app.set('title', 'View Machine');
app.use(express.logger());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'favicons')));
app.use(express.static(path.join(__dirname, 'lib' , 'VM', 'dist')));
app.use(express.static(path.join(__dirname, 'lib' , 'VM', 'dist')));
app.use(express.static(path.join(__dirname, 'lib' , 'VM3D')));

app.get('/views/:view', function (req, res) {
  client.get(req.params.view, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500);
      res.send('Internal Server Error');
    } else {
      if (result) {
        res.header("Content-Type", "text/JSON");
        res.send(result);
      } else {
        res.status(404);
        res.send('Resource Not Found');
      }
    }
  });
});

app.listen(port);
console.log('Listening on port ' +  port);
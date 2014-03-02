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

var feeds = require('./lib/VM-Feeds/VM-Feeds-Server');
var VM = require('./lib/vm-server/dist/viewmachine-server.js');


//Create a feed with name and details (age in ms and length as integer)
feeds.createFeed('customFeed', {
  maxAge: 86400000,
  maxLength: 10,
  meta: {
    origin: 'ViewMachine.io',
    author: 'Sam Morrow',
    info: 'This feed is a test for ViewMachine Feeds project. Mentioned JS dependencies are optional, but ViewMacine is needed to interpret the feed'
  },
  js: ['http://viewmachine.io/matrix3d.js', 'http://viewmachine.io/feed.js']
});
var x = 10000;
//Next add in template items, as they are created, using ViewMachine Server (yet to be released)
for (var i = 0; i < 100; i++) {
  setTimeout(function () {
    feeds.addItem('customFeed', '{"element":"header","children":[{"element":"img","properties":{"src":"","data-img":"http://viewmachine.io/images/viewmachine-logo.png","class":"logo","title":"ViewMachine Logo"}, "src":"http://viewmachine.io/images/viewmachine-logo.png","preload":"","events":[{"event": "click", "callback": "VMio-Spin"}]},{"element":"img","properties":{"src":"","data-img":"http://viewmachine.io/images/viewmachine-txt.png","class":"logotxt"}, "src":"http://viewmachine.io/images/viewmachine-txt.png","preload":""}]} ');
  }, x*i);
}
//Finally, serve your feed
app.get('/feeds/:feed/:num?', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.json(feeds.fetch(req.params.feed, req.params.num));
});

app.get('/add/:img*', function (req, res) {
  var newItem = new VM.El('div');
  newItem.append(new VM.El('h2').text(req.params.img));
  newItem.append(new VM.Image(req.params.img, '').event('click', 'VMio-Spin'));
  var item = VM.jsonTemplate(newItem);
  feeds.addItem('customFeed', item);
  res.send(item);
});


app.listen(port);
console.log('Listening on port ' +  port);
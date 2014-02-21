var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
app.set('title', 'View Machine');
app.use(express.logger());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'lib' , 'VM', 'dist')));
app.use(express.static(path.join(__dirname, 'lib' , 'VM', 'dist')));
app.use(express.static(path.join(__dirname, 'lib' , 'VM3D')));
app.listen(process.env.PORT || 3000);


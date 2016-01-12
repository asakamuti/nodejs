var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('mydb', server);
var http = require('http');

http.createServer(function (request, response) {
  db.collection('users', function(err, collection) {
    collection.find({}, function(err, cursor){
      cursor.toArray(function(err, items) {
        output = '{"users" : ' + JSON.stringify(items) + '}';

        response.setHeader("Content-Type", "application/json");
        response.end(output);
      });
    });
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at localhost:1337');
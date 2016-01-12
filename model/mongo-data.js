var mongo = require('mongodb'),  
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {  
  auto_reconnect: true
});
var db = new Db('mydb', server);  
var onErr = function(err, callback) {  
  db.close();
  callback(err);
};
exports.teamlist = function(gname, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('users', function(err, collection) {
        if (!err) {
          collection.find({
            'status': gname
          }).toArray(function(err, docs) {
            if (!err) {
              db.close();
              var intCount = docs.length;
              if (intCount > 0) {
                var strJson = "";
                for (var i = 0; i < intCount;) {
                  strJson += '{"status":"' + docs[i].user_id + '"},{"age":"' + docs[i].age + '"}'
                  i = i + 1;
                  if (i < intCount) {
                    strJson += ',';
                  }
                }
                strJson = '{"status":"' + gname + '","count":' + intCount + ',"teams":[' + strJson + "]}"
                callback("", JSON.parse(strJson));
              }
            } else {
              onErr(err, callback);
            }
          }); //end collection.find 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , fs = require('fs');

// Connection URL
var url = 'mongodb://db:27017/meteor';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
//  console.log("Connected correctly to server");
  var meteorDb = db.db('meteor');
  // List all the available collections
  var colls =meteorDb.listCollections();
  colls.toArray(function(err, items) {
//    console.log(err, items);
    var users = meteorDb.collection('users');
    users.find().toArray(function(err2, items2) {
      var submitters = {};
      for(var i=0; i<items2.length; i++) {
        submitters[items2[i]._id] = items2[i].emails[0].address;
      }
      var points = meteorDb.collection('points');
      points.find().toArray(function(err3, items3) {
        function findSubmitter(point) {
          point.submittedBy = submitters[point.submittedBy];
          return point;
        }
        fs.writeFileSync('points.json', JSON.stringify(items3, null, 2));
        fs.writeFileSync('points-with-submitters.json', JSON.stringify(items3.map(findSubmitter), null, 2));
        db.close();
      });
    });
  });
});

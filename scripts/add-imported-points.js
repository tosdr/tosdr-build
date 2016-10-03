var fs = require('fs');
var imported = JSON.parse(fs.readFileSync('../import-from-edit/points.json'));

function savePoint(point) {
  fs.writeFileSync(`./src/points/${point._id}.json`,
      JSON.stringify(point, null, 2));
}

// ...
for (var i=0; i<imported.length; i++) {
  if (imported[i].submittedBy) {
    savePoint(imported[i]);
  }
}

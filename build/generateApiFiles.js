'use strict';

var fs = require('fs'),
  prettyjson = require('./prettyjson');

module.exports = function(grunt){
  grunt.task.registerTask('generateApiFiles', 'Generate API files', function(){
    var i, j, obj, pointsArr, services = grunt.file.readJSON('index/services.json');
    for (i in services) {
      obj = services[i];
      obj.pointsData = {};
      for (j = 0; j < obj.points.length; j++) {
        obj.pointsData[obj.points[j]] = grunt.file.readJSON(grunt.config.get('conf').src + '/points/'+obj.points[j]+'.json');
        const caseFileNameBase = obj.pointsData[obj.points[j]].tosdr['case'].replace(/[^a-z0-9]/gi, '_').toLowerCase()
        const caseObj = grunt.file.readJSON(grunt.config.get('conf').src + '/cases/'+caseFileNameBase+'.json');
        obj.pointsData[obj.points[j]].tosdr.point = caseObj.point
        obj.pointsData[obj.points[j]].tosdr.score = caseObj.score
        obj.pointsData[obj.points[j]].tosdr.privacyRelated = caseObj.privacyRelated
      }
      grunt.file.write(grunt.config.get('conf').dist + '/api/1/service/'+i+'.json', prettyjson(obj));
    }
  });
};

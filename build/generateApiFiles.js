'use strict';

const POINTS_PATH = 'https://edit.tosdr.org/points/';
const LOGO_PATH = 'https://tosdr.org/logo/';
const LOGO_EXTENSION = '.png';

var fs = require('fs'),
  prettyjson = require('../scripts/prettyjson');

module.exports = function(grunt){
  grunt.task.registerTask('generateApiFiles', 'Generate API files', function(){
    var i, j, obj, pointsArr, services = grunt.file.readJSON('index/services.json');
    var all = {
      'tosdr/api/version': 2,
      'tosdr/data/version': new Date().getTime()
    };
    for (i in services) {
      obj = services[i];
      obj.pointsData = {};
      pointsArr = [];
      for (j = 0; j < obj.points.length; j++) {
        obj.pointsData[obj.points[j]] = grunt.file.readJSON(grunt.config.get('conf').src + '/points/'+obj.points[j]+'.json');
        const caseFileNameBase = obj.pointsData[obj.points[j]].tosdr['case'].replace(/[^a-z0-9]/gi, '_').toLowerCase()
        const caseObj = grunt.file.readJSON(grunt.config.get('conf').src + '/cases/'+caseFileNameBase+'.json');
        obj.pointsData[obj.points[j]].tosdr.point = caseObj.point
        obj.pointsData[obj.points[j]].tosdr.score = caseObj.score
        obj.pointsData[obj.points[j]].tosdr.privacyRelated = caseObj.privacyRelated
        pointsArr.push({
          'short': obj.points[j].title,
          'long': obj.points[j].description,
          discussion: POINTS_PATH + obj.points[j],
          icon: caseObj.point,
          score: caseObj.score,
          privacyRelated: caseObj.privacyRelated
        })
      }
      grunt.file.write(grunt.config.get('conf').dist + '/api/1/service/'+i+'.json', prettyjson(obj));
      var documentsArr = [];
      for (var k in services[i].links) {
        documentsArr.push(services[i].links[k])
      }
      // console.log(i, services[i].urls)
      all['tosdr/review/' + services[i].urls[0]] = {
        name: obj.name,
        logo: LOGO_PATH + i + LOGO_EXTENSION,
        rated: services[i]['class'],
        points: pointsArr,
        documents: documentsArr
      };
      // console.log('all set')
      for (var k = 1; k < services[i].urls.length; k++) {
        // console.log('ref', services[i].urls[k])
        all['tosdr/review/' + services[i].urls[k]] = { see: services[i].urls[0] }
      }
    }
    grunt.file.write(grunt.config.get('conf').dist + '/api/2/all.json', prettyjson(all));
  });
};

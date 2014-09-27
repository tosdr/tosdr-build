'use strict';

var prettyjson = require('../scripts/prettyjson');

module.exports = function(grunt){
  grunt.task.registerTask('fixpoints', 'Make data points consistent', function(){
    grunt.file.recurse('points/', function(abspath, rootdir, subdir, filename){
      if(filename==='README.md'){
        return;
      }
      doFile(abspath, grunt);
    });
  });
};

function doFile(filepath, grunt) {
  var obj = grunt.file.readJSON(filepath);
  
  if(typeof(obj.tosdr)!='object' || Array.isArray(obj.tosdr)) {
    obj.tosdr = {};
  }
  if(typeof(obj.tosdr.binding)!='boolean') {
    obj.tosdr.binding = !(obj.additional);
  }

  if(obj.disputed) {
    obj.tosdr.disputed = true;
  }
  if(obj.irrelevant) {
    obj.tosdr.irrelevant = true;
    obj.tosdr.reason = obj.irrelevant;
  }
  if(!obj.services) {
    if(obj.service) {
      if(Array.isArray(obj.service)) {
        obj.services = obj.service;
      } else {
        obj.services = [obj.service];
      }
    } else if(obj.tosdr.service) {
      if(Array.isArray(obj.tosdr.service)) {
        obj.services = obj.tosdr.service;
      } else {
        obj.services = [obj.tosdr.service];
      }
    }
  }
  if(!obj.topics) {
    if(obj.topic) {
      if(Array.isArray(obj.topic)) {
        obj.topics = obj.topic;
      } else {
        obj.topics = [obj.topic];
      }
    } else if(obj.tosdr.topic) {
      if(Array.isArray(obj.tosdr.topic)) {
        obj.topics = obj.tosdr.topic;
      } else {
        obj.topics = [obj.tosdr.topic];
      }
    }
  }
  if(typeof(obj.tosdr.score)=='string') {
    var num = parseInt(obj.tosdr.score);
    if(typeof(num)=='number' && num >= 0 && num <= 100) {
      obj.tosdr.score = num;
    }
  }
  if(obj.name) {
    obj.title = obj.name;
    delete obj.name;
  }
	grunt.file.write(grunt.config.get('conf').dist + '/' + filepath, prettyjson(obj));
	console.log('fixed '+filepath);
}

'use strict';

//this nodejs script will read the data points from the points/ directory, and
//generate the index.html and get-involved.html files from that.
var rendered = {};
var elements = {};
var prettyjson = require('../scripts/prettyjson');
var caseObj = {}

function renderDataPoint(grunt, service, dataPoint, forPopup) {
  var obj = grunt.file.readJSON(grunt.config.get('conf').src + '/points/' + dataPoint + '.json');
  if (obj.tosdr['case']) {
    const caseFileNameBase = obj.tosdr.case.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    if (caseObj[caseFileNameBase]) {
      obj.tosdr.point = caseObj[caseFileNameBase].point
      obj.tosdr.score = caseObj[caseFileNameBase].score
      if (typeof obj.tosdr.point === 'undefined') {
        console.log('CASE HAS NO POINT!', caseFileNameBase)
        return
      }
      if (typeof obj.tosdr.score === 'undefined') {
        console.log('CASE HAS NO SCORE!', caseFileNameBase)
        return
      }
    } else {
      console.log('MISSING CASE!', caseFileNameBase)
      return
    }
  }
  rendered[dataPoint] = true;
  var badge, icon, sign, score;
  if(!obj.tosdr) {
    obj.tosdr = {};
  }
  //this is choosing the css class for the icon that will be shown to the left of the data point:
  if (obj.tosdr.point == 'good') {
    badge = 'badge-success';
    icon = 'thumbs-up';
    sign = '+';
  } else if (obj.tosdr.point == 'bad') {
    badge = 'badge-warning';
    icon = 'thumbs-down';
    sign = '-';
  } else if (obj.tosdr.point == 'blocker') {
    badge = 'badge-important';
    icon = 'remove';
    sign = '×';
  } else if (obj.tosdr.point == 'neutral') {
    badge = 'badge-neutral';
    icon = 'asterisk';
    sign = '⋅';
  } else {
    badge = '';
    icon = 'question-sign';
    sign = '?';
  }
  //return the html for this data point, for inclusion in the popup or in the main page:
  if (forPopup) {
    return {
      id:dataPoint,
      score:obj.tosdr.score,
      text:'<div class="' + obj.tosdr.point + '"><h5><span class="badge ' + badge +
				'" title="' + obj.tosdr.point + '"><i class="icon-' + icon + ' icon-white">' + sign + '</i></span> ' + obj.title + ' <a href="' + obj.discussion + '" target="_blank" class="label context">Discussion</a></h5><p>' +
				obj.tosdr.tldr + '</p></div>\n'
    };
  } else {
    return {
      id:dataPoint,
      score:obj.tosdr.score,
      text:'<span class="badge ' + badge + '" title="' + obj.tosdr.score + '">' +
				'<i class="icon-' + icon + ' icon-white">' + sign + '</i></span>&nbsp;' + obj.title
    };
  }
}
function getServiceObject(grunt, id) {
  //each service (website) has its own generic description data, that is stored in the services/ directory
  //of this repo. this function loads in such a file:
  var obj = grunt.file.readJSON(grunt.config.get('conf').src + '/services/' + id + '.json');
  if (obj) {
    return obj;
  } else {
    grunt.log.error('no obj in services/' + id + '.json');
		process.exit();
  }
}
function getRatingText(className) {
  var ratingText = {
    0:"We haven't sufficiently reviewed the terms yet. Please contribute to our group: <a href=\"get-involved.html\">Get involved</a>.",
    "false":"We haven't sufficiently reviewed the terms yet. Please contribute to our group: <a href=\"get-involved.html\">Get involved</a>.",
    "A":"The terms of service treat you fairly, respect your rights and follow the best practices.",
    "B":"The terms of services are fair towards the user but they could be improved.",
    "C":"The terms of service are okay but some issues need your consideration.",
    "D":"The terms of service are very uneven or there are some important issues that need your attention.",
    "E":"The terms of service raise very serious concerns."
  };
  return ratingText[className];
}

function renderDetails(grunt, id, points, toslinks, obj) {
  // console.log('done reading?')
  const name = obj.slug
  grunt.log.writeln('renderDetails ' + name);
  grunt.log.writeln(points);
  grunt.log.writeln(toslinks);
  grunt.log.writeln(obj);
  //this renders one service (for instance 'Facebook' or 'Google') on our main index.html page:
  var header = '<h3><img src="logo/' + name + '.png" class="favlogo"><a class="modal-link" data-service-name="' + name + '" href="#' + name + '">' + obj.name + '</a>\n';
  var rating;
  if (!obj.tosdr) {
    obj.tosdr = {rated:false};
  }
  if (obj.tosdr.rated) {
    rating = '<div id="' + name + '-rating" class="service-rating"><a title="Learn more about our classification" href="classification.html"><span class="label ' + obj.tosdr.rated + '">Class ' + obj.tosdr.rated + '</span></a></div></h3>\n';
  } else {
    rating = '<div id="' + name + '-rating" class="service-rating"><a title="Learn more about our classification" href="classification.html"><span class="label ' + obj.tosdr.rated + '">No Class Yet</span></a></div></h3>\n';
  }
  //we collect the data points into an array first, so that we can sort them by score (the score is the impact/importance of a data point):
  var renderables = [], i;
  for (i in points) {
    const renderedPoint = renderDataPoint(grunt, id, points[i], false)
    // console.log('rendered point', renderedPoint)
    if (typeof renderedPoint !== 'undefined') {
      renderables.push(renderedPoint);
    }
  }
  renderables.sort(function (a, b) {
    return (Math.abs(b.score) - Math.abs(a.score));
  });
  renderables = renderables.slice(0, 5);

  //construct the issues list from the sorted data points:
  var issues = '<section class="specificissues"><ul class="tosdr-points">';
  for (i = 0; i < renderables.length; i++) {
    issues += '<li id="point-' + name + '-' + renderables[i].id + '">' +
			renderables[i].text +
			'</li>\n';
  }
  //add link to have more details at the bottom:
  issues += '</ul>' +
		'<a class="modal-link" data-service-name="' + name + '" href="#"><i class="icon  icon-th-list"></i> More details</a>' +
    // add link to read the full terms (removed)
    //    (toslinks.terms ? '<br /><a href="' + toslinks.terms.url + '" target="_blank"><i class="icon  icon-list-alt"></i> Read the full terms</a>' : '') +
    '</section>';
  //add some search terms to the data-search field. this is quite crude, but it works:
  var search = [name], j;
  if (obj.keywords) {
    for (j = 0; j < obj.keywords.length; j++) {
      search.push(obj.keywords[j]);
    }
  }
  if (obj.related) {
    for (j = 0; j < obj.related.length; j++) {
      search.push(obj.related[j]);
    }
  }
  if (obj.title) {
    search.push(obj.title);
  }
  if (obj.url) {
    search.push(obj.url);
  }
  if (obj.parent) {
    search.push(obj.parent);
  }
  return '\t<div data-search="' + search.join(',') + '" id="' + name + '-tosdr" class="span6 service-nutshell">' +
		header + rating + issues +
		'</div>\n';
}
function isEmpty(map) {
  for (var key in map) {
    if (map.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
function getTweetLink(obj, id) {
  const name = obj.slug
  var text, action;
  if (!obj.twitter || !obj.tosdr || !obj.tosdr.rated) {
    return '';
  }
  if (obj.tosdr.rated === 'A') {
    text = ' Congratulations on your Class A rating https://tosdr.org/#'+name+' thanks for caring! #ToS via @ToSDR';
    action = 'Congratulate ';
  } else {
    text = ' Your Class '+obj.tosdr.rated+' rating worries me https://tosdr.org/#'+name+' can you comment? #ToS via @ToSDR';
    action = 'Tweet to ';
  }
  return ' <a class="tweet" href="https://twitter.com/intent/tweet/?text='+encodeURIComponent(obj.twitter+text) +
		'">'+action+obj.twitter+'</a>';
}

function renderPopup(grunt, id, obj, points, links) {
  const name = obj.slug
  //the popup is actually a popin, it is what you see when you click 'expand' for one of the services on index.html.
  //this is how we generate the html for them:
  grunt.log.writeln('Rendering popup for ' + name);
  grunt.log.writeln(obj);
  grunt.log.writeln(points);
  grunt.log.writeln(links);
  if(!obj.tosdr) {
    obj.tosdr = {};
  }
  var longName = obj.name,
    domain = obj.url,
    verdict = obj.tosdr.rated,
    ratingText = getRatingText(obj.tosdr.rated);
  var headerHtml = '<div class="modal-header"><button data-dismiss="modal" class="close" type="button">×</button>' +
			'<img src="logo/' + name + '.png" alt="" class="pull-left favlogo" height="36" >' +
			'<h3>' + longName +
			'<small class="service-url">Share review <input class="share-link" type="text" value="https://tosdr.org/#' + name + '" readonly /></small>' +
			'</h3></div>\n';
  var classHtml = '<div class="tosdr-rating"><label class="label ' + verdict + '">' +
			(verdict ? 'Class ' + verdict : 'No Class Yet') + '</label><p>' + ratingText +
			getTweetLink(obj, name) +
			'</p></div>\n';
  var renderables = [];
  //sort the data points by importance:
  for (var i in points) {
    const renderedDataPoint = renderDataPoint(grunt, id, points[i], true)
    if (typeof renderedDataPoint !== 'undefined') {
      renderables.push(renderedDataPoint);
    }
  }
  renderables.sort(function (a, b) {
    return (Math.abs(b.score) - Math.abs(a.score));
  });
  var pointsHtml = '';
  for (i = 0; i < renderables.length; i++) {
    pointsHtml += '<li id="popup-point-' + name + '-' + renderables[i].id + '" class="point">' + renderables[i].text + '</li>\n';
  }
  var bodyHtml = '<div class="modal-body">' + classHtml + '<section class="specificissues"> <ul class="tosdr-points">' + pointsHtml + '</ul></section>\n';
  if (isEmpty(links)) {
    bodyHtml += '<section><a href="/get-involved.html" class="btn">Help us find the Terms »</a></section>\n';
  } else {
    bodyHtml += '<section><h4>Read the Terms</h4><ul class="tosback2">\n';
    for (i in links) {
      bodyHtml += '<li><a href="' + links[i].url + '">' + (links[i].name ? links[i].name : i) + '</a></li>\n';
    }
    bodyHtml += '</ul></section>\n';
  }
  bodyHtml += '</div>';
  return headerHtml + bodyHtml;
}

module.exports = function(grunt) {
  grunt.task.registerTask('renderPages', 'Render the website', function(){
    // console.log('start reading!')
    grunt.file.recurse(grunt.config.get('conf').src + '/cases/', function(abspath, rootdir, subdir, filename) {
      if (filename === 'README.md') {
        return
      }
      caseObj[filename.substring(0, filename.length - '.json'.length)] = grunt.file.readJSON(abspath);
      // console.log('read', filename.substring(0, filename.length - '.json'.length))
    })
    var services = grunt.file.readJSON('index/services.json');
    var popups = {};
    var servicesList = '';
    //get a list of services we will want to display on index.html:
    grunt.log.writeln(services);
    var last, lastObj;
    var serviceIds = [];
    for (var i in services) {
      serviceIds.push(i);
    }
    grunt.log.writeln(serviceIds);
    //sort services by their Alexa rank ('big' websites first, 'small' ones at the bottom)
    serviceIds.sort(function (a, b) {
      if (typeof(services[a].alexa) == 'undefined') {
        services[a].alexa = 1000000;
      }
      if (typeof(services[b].alexa) == 'undefined') {
        services[b].alexa = 1000000;
      }
      return services[a].alexa - services[b].alexa;
    });
    //now sort services by whether or not they have a class (ones that do and that have traffic first, 'no class yet' ones at the bottom)
    grunt.log.writeln('by Alexa', serviceIds);
    var serviceIdsRated = [],
      serviceIdsNotRated = [];
    for(i=0; i<serviceIds.length; i++) {
      if(typeof(services[serviceIds[i]].class)=='string' && services[serviceIds[i]].alexa < 250000) {
        grunt.log.writeln(serviceIds[i], 'yes');
        serviceIdsRated.push(serviceIds[i]);
      } else {
        grunt.log.writeln(serviceIds[i], 'no');
        serviceIdsNotRated.push(serviceIds[i]);
      }
    }
    serviceIds = serviceIdsRated.concat(serviceIdsNotRated);
    grunt.log.writeln('by rated', serviceIds);
    //twitter is used as an example on /get-involved.html, so we store its html in a variable to render it there:
    var twitterService = null, serviceId;
    for (i = 0; i < serviceIds.length; i++) {
      serviceId = serviceIds[i];

      var obj = getServiceObject(grunt, serviceId);
      //if(obj.alexa >= 1000000) {
      //  continue;
      //}
      if(serviceId == 'twitter') {
        twitterService = renderDetails(grunt, serviceId, services[serviceId].points, services[serviceId].links, obj);
      }
      if (last) {
        servicesList +=
          renderDetails(grunt, last, services[last].points, services[last].links, lastObj) +
					renderDetails(grunt, serviceId, services[serviceId].points, services[serviceId].links, obj);
        last = undefined;
      } else {
        last = serviceId;
        lastObj = obj;
      }
      popups[obj.slug] = renderPopup(grunt, serviceId, obj, services[serviceId].points, services[serviceId].links);
    }
    if (last) {
      servicesList += '\t<div class="row-fluid">\n\t' +
				renderDetails(grunt, last, services[serviceId].points, services[serviceId].links, lastObj) +
				'\t</div>\n';
    }
		
    grunt.file.write(grunt.config.get('conf').dist + '/index.html',
      grunt.file.read('index-template.html').
        replace('<!-- ##services-content## -->', '<div id="services-list" class="row">\n' + servicesList + '</div>\n')
    );
    grunt.file.write(grunt.config.get('conf').dist + '/js/services.js', "var popupsContent = " + prettyjson(popups) + ";");
    grunt.file.write(grunt.config.get('conf').dist + '/get-involved.html',
      grunt.file.read('get-involved-template.html').
        replace('<!-- ##github-service-content## -->', '<div id="services-list" class="row">\n' + twitterService + '</div>\n')
    );
    var renderedArr = [];
    for (var p in rendered) {
      renderedArr.push(p);
    }
    grunt.file.write(grunt.config.get('conf').dist + '/index/points-rendered.txt', renderedArr.sort().join('\n'));
  });
};

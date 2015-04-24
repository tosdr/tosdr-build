$(function () {

  function search(searchTerm) {
    var serviceDivs = document.getElementsByClassName('service-nutshell');
    var tophit;
    for (var i = 0; i < serviceDivs.length; i++) {
      var terms = [];
      for (var j = 0; j < serviceDivs[i].attributes.length; j++) {
        if (serviceDivs[i].attributes[j].name == 'data-search') {
          terms = serviceDivs[i].attributes[j].value.split(',');
          break;
        }
      }
      var match = false;
      for (var j = 0; j < terms.length; j++) {
        if (terms[j].substring(0, searchTerm.length) == searchTerm) {
          match = true;
          break;
        }
      }
      if (match) {
        serviceDivs[i].style.display = 'block';
        if (serviceDivs[i].id.substring(0, searchTerm.length) == searchTerm) {
          tophit = i;
        }
      } else {
        serviceDivs[i].style.display = 'none';
      }
    }
    //if(typeof(tophit) != 'undefined') {
    //  var elt = document.getElementById('services-list').removeChild(serviceDivs[tophit]);
    //  document.getElementById('services-list').insertBefore(elt, serviceDivs[0]);//
    //}
  }

  $('#searchBox').keyup(function(){
    var searchTerm = document.getElementById('searchBox').value.toLowerCase();
    search(searchTerm);
    location = '#search=' + encodeURIComponent(searchTerm);
  });

  $('#searchDiv').css('display', 'block');

  function showModal(serviceName) {
    var popUpContent = popupsContent[serviceName];
    if (popUpContent) {
      // found a corresponding popup
      var completePopupContent = '<div id="modal_' + serviceName + '" class="modal hide tosdr-infos" role="dialog">' + popUpContent + '</div>';
      $('body').append(completePopupContent);
      $('#modal_' + serviceName).modal({
        keyboard:true
      }).modal('show');

      // when we close the popup we remove it from the DOM
      $('.modal').on('hidden', function (toto) {
        window.history.pushState(null, null, "#");
        $('#modal_' + serviceName).remove();
      });
      return true;
    } else {
      return false;
    }
  }

  $('.modal-link').click(function() {
    // get the service name from the link
    var serviceName = $(this).attr('data-service-name');
    if (showModal(serviceName)) {
      window.history.pushState(null, null, "#" + serviceName);
    }
    return false;
  });

  // automatically select whole share link when input is clicked
  $(document).on('click', '.modal .share-link', function() {
    $(this).focus();
    $(this).select();
  });

  if (location.hash.length > 1) {
    var hash = location.hash.substring(1);
    if (hash.indexOf("=") != -1) {
      var splits = hash.split("=");
      if (splits.length == 2 && splits[0] == "search" && splits[1].length > 0) {
        search(splits[1]);
        document.getElementById('searchBox').value = splits[1];

        // scroll down to #services
        $('html, body').animate({
          scrollTop: $("#services").offset().top
        }, 1000);
      } 
    } else {
      showModal(hash);
    }
  }
  
  if (location.search.indexOf('?') == 0) {
    var GETarguments = location.search.substring(1)
    var splits = GETarguments.split("=");
    if (splits.length == 2 && splits[0] == "servicePoint" && splits[1].length > 0) {
      
      // allows for directly referencing a service's point in URL
        // ex.: https://tosdr.org/?servicePoint=google__lU-QhFXMOcU 
        // GET parameters syntax: /?servicePoint=<serviceName>__<pointId>
        
      if (splits[1].indexOf('__') != -1 && splits[1].split('__')[0].length > 0 && 
          splits[1].split('__')[1].length > 0 ) {
        var serviceName = splits[1].split('__')[0];
        var pointId = splits[1].split('__')[1];
        var serviceMatchBool = showModal(serviceName);
        if (serviceMatchBool){
          var subtractFromOffset = $(".modal-header").outerHeight() + $("#modal_" + serviceName).offset().top + 5
          var offset = $("#popup-point-" + serviceName + "-" + pointId).offset().top;
          $('#modal_' + serviceName + ' .modal-body').animate({
            scrollTop: offset - subtractFromOffset
          }, 1000)
        }
      } 
    } else {  // also add GET parameter support for basic service referencing
      showModal(GETarguments);
    }
  }
  
});


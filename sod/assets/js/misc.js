//Script for the telephone input tag
$("#phone").intlTelInput({
    defaultCountry: "auto",
    geoIpLookup: function(callback) {
      $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        callback(countryCode);
      });
    },
    nationalMode: false,
    preferredCountries: ['ng'],
    utilsScript: "<?=Url::templatePath()?>/js/utils.js"
});

	$(document).on('click', 'div .dropdown-menu', function (e) {
	  e.stopPropagation();
	});
	$('.request').click(function() {
	  $(this).parents('.dropup').find('a.dropdown-toggle').dropdown('toggle')
	});
	$("#hide").click(function(){
	    $(".ad").hide();
	});
	$("#signup-link").click(function(){
		$('#login').modal('hide');
		$('#signup').modal('show');
	});
	$("#login-link").click(function(){
		$('#login').modal('show');
		$('#signup').modal('hide');
	});

//Script for PMP Navbar

 // Prevent console.log from generating errors in IE for the purposes of the demo
if ( ! window.console ) console = { log: function(){} };

// The actual plugin
$('.single-page-nav').singlePageNav({
    offset: $('.single-page-nav').outerHeight(),
    filter: ':not(.external)',
    updateHash: true,
    beforeStart: function() {
        console.log('begin scrolling');
    },
    onComplete: function() {
        console.log('done scrolling');
    }
});

$(document).ready(function() {
  
	$(window).scroll(function () { 
      console.log($(window).scrollTop())
    if ($(window).scrollTop() > 280) {
      $('#nav_pmp').addClass('pos-fx');
    }
    if ($(window).scrollTop() < 281) {
      $('#nav_pmp').removeClass('pos-fx');
    }
  });
});

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
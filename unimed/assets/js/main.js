$(document).ready(function(){
	$(".verify-code").on('input', function() {
	  var inputs = $(this).closest('.row').find(':input');
	  inputs.eq( inputs.index(this)+ 1 ).focus();
	});
})
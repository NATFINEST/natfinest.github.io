(function ( $ ) {
	$.fn.categoryFilter=function(selector){
		this.hover( function() {
			var categoryValue = $(this).attr('data-filter');
			$(this).addClass('active').siblings().removeClass('active');
			if(categoryValue=="all") {
				// $('.filter').show(1000);
				$('.filter').css({'background-color':'transparent', 'opacity': '.9'});
			} else {
				// $(".filter").not('.'+categoryValue).hide('3000');
				$(".filter").not('.'+categoryValue).css({'background-color':'#eee', 'opacity': '.3', 'transition': 'opacity .5s'});
            	// $('.filter').filter('.'+categoryValue).show('3000');
            	$('.filter').filter('.'+categoryValue).css({'background-color':'transparent', 'opacity': '.9'});
			}
		}
		// ,function(){
		// 		$('.filter').css({'background-color':'transparent', 'opacity': '.9'});
		// }
		);
	}
}( jQuery ));
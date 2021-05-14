$(document).ready(function(){
	$(".verify-code").on('input', function() {
	  var inputs = $(this).closest('.row').find(':input');
	  inputs.eq( inputs.index(this)+ 1 ).focus();
	});
})

$(document).ready(function() {
    $('.select2').select2();
});

$(document).ready(function () {
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".form-control").on('input', function () {
    	$(".next").attr("disabled", "true");
		if($('.brand').val() != "" && $('.generic').val() != "" && $('.strength').val() != "" && $('.type').find(':selected').val() != ""){
			$('.next-medication').removeAttr("disabled");
		}
		if($('.quantity').val() != "" && $('.frequency').val() != ""){
			$('.next-dosage').removeAttr("disabled");
		}
		if($('.patient').find(':selected').val() != "" && $('.storage').find(':selected').val() != "" && $('.categorization').find(':selected').val() != ""){
			$('.next-assignment').removeAttr("disabled");
		}

    })

 //    if($('.form-control').val() == ''){
 //    	$(".next").attr("disabled", "true");
	// }else {
	// 	$(".next").attr("disabled", "false");
	// }

    $(".next").click(function () {
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate(
            { opacity: 0 },
            {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        display: "none",
                        position: "relative",
                    });
                    next_fs.css({ opacity: opacity });
                },
                duration: 500,
            }
        );
        setProgressBar(++current);
    });

    $(".previous").click(function () {
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate(
            { opacity: 0 },
            {
                step: function (now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        display: "none",
                        position: "relative",
                    });
                    previous_fs.css({ opacity: opacity });
                },
                duration: 500,
            }
        );
        setProgressBar(--current);
    });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar").css("width", percent + "%");
    }

    $(".submit").click(function () {
        return false;
    });
});

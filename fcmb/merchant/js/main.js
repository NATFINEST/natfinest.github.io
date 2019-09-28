(function($) {

    var form = $("#signup-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            comp_name: {
                required: true,
            },
            cont_first_name: {
                required: true,
            },
            cont_last_name: {
                required: true,
            },
            email: {
                required: true,
                email : true
            },
            cont_phone_num: {
                required: true,
                digits : true
            },            
            bus_acct_no: {
                digits : true
            },
            password: {
                required: true
            },
            bus_add: {
                required: true,
            },
            bus_city: {
                required: true,
            },
            bus_state: {
                required: true,
            },
            bus_cat: {
                required: true,
            },
            rc_num: {
                required: true,
            },
            comp_logo: {
                required: true,
            }
        },
        messages : {
            email: {
                email: 'Not a valid email address <i class="zmdi zmdi-info"></i>'
            }
        },
        onfocusout: function(element) {
            $(element).valid();
        },
    });
    form.steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        labels: {
            previous: 'Previous',
            next: 'Next',
            finish: 'Submit',
            current: ''
        },
        titleTemplate: '<div class="title"><span class="number">#index#</span>#title#</div>',
        onStepChanging: function(event, currentIndex, newIndex) {
            form.validate().settings.ignore = ":disabled,:hidden";
            // console.log(form.steps("getCurrentIndex"));
            return form.valid();
        },
        onFinishing: function(event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            // console.log(getCurrentIndex);
            return form.valid();
        },
        onFinished: function(event, currentIndex) {
            // alert('Submited');
            // document.getElementById("signup-form").submit();
            // Prevent default posting of form - put here to work in case of errors
            event.preventDefault();

            // Abort any pending request
            // if (request) {
            //     request.abort();
            // }
            // setup some local variables
            var $form = $(this);

            // Let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");

            // Serialize the data in the form
            var serializedData = $form.serialize();

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            $.ajax({
                url: 'http://echo/html/',
                data: serializedData,
                method: 'post',
                beforeSend: function(){
                   swal({
                    title: 'Processing',
                    text: 'Your Request is processing',
                    type: 'info',
                    onBeforeOpen: () => {
                        swal.showLoading()
                    }
                  })
                },
                success: function(data) {
                    swal.close();
                    window.location.href = "thankyou.php";
                },
                failure: function(data) {
                    swal(
                    "Internal Error",
                    "Oops, your form was not saved.", 
                    "error"
                    )
                }
            });
        },
        // onInit : function (event, currentIndex) {
        //     event.append('demo');
        // }
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });


    $.dobPicker({
        daySelector: '#expiry_date',
        monthSelector: '#expiry_month',
        yearSelector: '#expiry_year',
        dayDefault: 'DD',
        yearDefault: 'YYYY',
        minimumAge: 0,
        maximumAge: 120
    });

    $('#password').pwstrength();

    $('#button').click(function () {
        $("input[type='file']").trigger('click');
    })
    
    $("input[type='file']").change(function () {
        $('#val').text(this.value.replace(/C:\\fakepath\\/i, ''))
    })

})(jQuery);
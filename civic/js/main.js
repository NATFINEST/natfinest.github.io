(function($) {

    var form = $("#signup-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
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
            password: {
                required: true
            },
            password_again: {
              equalTo: "#password"
            },
            sch_name: {
                required: true,
            },
            sch_add: {
                required: true,
            },
            avg_stud: {
                required: true,
            },
            tot_stud: {
                required: true,
            },
            po_first_name: {
                required: true,
            },
            po_last_name: {
                required: true,
            },
            po_email: {
                required: true,
                email : true
            },
            po_phone_num: {
                required: true,
                digits : true
            }, 
            app_let: {
                required: true,
                extension: "jpg|png|JPEG"
            }
        },
        messages : {
            email: {
                email: 'Not a valid email address <i class="zmdi zmdi-info"></i>'
            },
            comp_logos: {
                extension: 'Pls upload a jpeg or png image <i class="zmdi zmdi-info"></i>'
            },
            password_again: {
              equalTo: " Passwords do not match"
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

            var approval = $("span#val").text();

            // Serialize the data in the form
            var serializedData = $form.serialize();

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/todos/',
                data: serializedData + '&approval=' + approval,
                method: 'post',
                beforeSend: function(){
                    swal({
                        title: 'Processing',
                        onBeforeOpen: () => {
                            swal.showLoading()
                        }
                    })
                },
                success: function(data) {
                    swal({
                        title: 'Success',
                        timer: 3000,
                        type: 'success',
                        showConfirmButton: false,
                        onClose: () => {
                            window.location.href = "index.html";
                        }
                    });
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
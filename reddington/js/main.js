(function($) {

    var form = $("#signup-form");
    form.validate({
        ignore: [],
        rules: {
            collection_center: {
                required: true,
            },
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            gender: {
                required: true,
            },
            dob: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                digits: true,
                minlength: 11,
                maxlength: 11,
            },
            nationality: {
                required: true,
            },
            passport: {
                required: true,
            },
            state: {
                required: false,
            },
            lga: {
                required: false,
            },
            street: {
                required: true,
            },
            purpose: {
                required: true,
            },
            test_type: {
                required: true,
            },
            travel_date: {
                required: true,
            },
            kin: {
                required: true,
            },
            phone_kin: {
                required: true,
                minlength: 11,
                maxlength: 11,
                digits: true
            },
            shortness_of_breath: {
                required: true,
            },
            sore_throat: {
                required: true,
            },
            fever: {
                required: true,
            },
            nasal_congestion: {
                required: true,
            },
            dry_cough: {
                required: true,
            },
            runny_nose: {
                required: true,
            },
            diarrhoea: {
                required: true,
            },
            symptom_onset: {
                required: true,
            },
            pregnancy: {
                required: true,
            },
            obesity: {
                required: true,
            },
            heart_disease: {
                required: true,
            },
            asthma: {
                required: true,
            },
            chronic_lung_disease: {
                required: true,
            },
            chronic_liver_disease: {
                required: true,
            },
            organ_bone_marrow_recipient: {
                required: true,
            },
            diabetes: {
                required: true,
            },
            q1: {
                required: true,
            },
            q2: {
                required: true,
            },
            q3: {
                required: true,
            },
            q4: {
                required: true,
            },
            q5: {
                required: true,
            },
            q6: {
                required: true,
            },
            q7: {
                required: true,
            },
            q8: {
                required: true,
            },
            doses: {
                required: true,
            }
        },
        errorPlacement: function(error, element) {
            if (element.is(":radio")) {
                error.appendTo(element.parents('.form-radio'));
            }
            if (element.hasClass("select2-hidden-accessible")) {
                elem = $("#select2-" + element.attr("id") + "-container").parent();
                error.insertAfter(elem);
            } else {
                element.before(error);
            }
        },
        highlight: function(element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().addClass(errorClass);
            } else {
                elem.addClass(errorClass);
            }
        },
        unhighlight: function(element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().removeClass(errorClass);
            } else {
                elem.removeClass(errorClass);
            }
        },
        messages: {
            email: {
                email: 'Not a valid email address <i class="zmdi zmdi-info"></i>'
            },
            phone: {
                digits: 'Must be digits <i class="zmdi zmdi-info"></i>'
            },
            password_again: {
                equalTo: " Passwords do not match"
            },
            gender: {
                required: "Please select an option"
            },
            test_type: {
                required: "Please select an option"
            },
            shortness_of_breath: {
                required: "Please select an option"
            },
            sore_throat: {
                required: "Please select an option"
            },
            fever: {
                required: "Please select an option"
            },
            nasal_congestion: {
                required: "Please select an option"
            },
            dry_cough: {
                required: "Please select an option"
            },
            runny_nose: {
                required: "Please select an option"
            },
            diarrhoea: {
                required: "Please select an option"
            },
            pregnancy: {
                required: "Please select an option"
            },
            obesity: {
                required: "Please select an option"
            },
            heart_disease: {
                required: "Please select an option"
            },
            asthma: {
                required: "Please select an option"
            },
            chronic_lung_disease: {
                required: "Please select an option"
            },
            chronic_liver_disease: {
                required: "Please select an option"
            },
            organ_bone_marrow_recipient: {
                required: "Please select an option"
            },
            diabetes: {
                required: "Please select an option"
            },
            q1: {
                required: "Please select an option"
            },
            q2: {
                required: "Please select an option"
            },
            q3: {
                required: "Please select an option"
            },
            q4: {
                required: "Please select an option"
            },
            q5: {
                required: "Please select an option"
            },
            q6: {
                required: "Please select an option"
            },
            q7: {
                required: "Please select an option"
            },
            q8: {
                required: "Please select an option"
            },
            doses: {
                required: "Please select an option"
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
            return form.valid();
        },
        onFinishing: function(event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function(event, currentIndex) {
            // Prevent default posting of form - put here to work in case of errors
            event.preventDefault();

            // Abort any pending request
            var $form = $(this);

            // Let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");

            // Serialize the data in the form
            var serializedData = $form.serialize();

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);
            let timerInterval

            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/posts',
                data: serializedData,
                method: 'post',
                beforeSend: function() {
                    swal({
                        title: 'Processing',
                        onBeforeOpen: () => {
                            swal.showLoading()
                        }
                    })
                },
                success: function(data) {
                    swal({
                        title: 'An email has been sent to you',
                        timer: 3000,
                        type: 'success',
                        showConfirmButton: false,
                        onBeforeOpen: () => {
                            timerInterval = setInterval(() => {
                                swal.getContent().querySelector('strong')
                                    .textContent = swal.getTimerLeft()
                            }, 100)
                        },
                        onClose: () => {
                            window.location.href = "";
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

    $('#password').pwstrength();


    $(document).ready(function() {
        $('select').select2({}).on("change", function(e) {
            $(this).valid()
        });
    });

    $(document).ready(function() {
        $("input[type='radio']").on('change', function(e) {
            $('.choose_symptom_onset').hide();
            if($("input[name='shortness_of_breath']:checked").val() == 'no' || $("input[name='sore_throat']:checked").val() == 'no' || $("input[name='fever']:checked").val() == 'no' || $("input[name='nasal_congestion']:checked").val() == 'no' || $("input[name='dry_cough']:checked").val() == 'no' || $("input[name='runny_nose']:checked").val() == 'no' || $("input[name='diarrhoea']:checked").val() == 'no') {
                $('.choose_symptom_onset').show();
            }
        });
    });

    $(function() {
        $('input[name="acc_no"]').on('click', function() {
            if ($(this).val() == 'yes') {
                $('#bus').show();
            } else if ($(this).val() == 'no') {
                $('#bus').hide();
            }
        });
    });

    $(function() {
        // set a variable
        var today = moment().format('DD/MM/YYYY');
        var earliest_date = moment().subtract(18, 'years').format('DD/MM/YYYY');
        var yesterday = moment().subtract(1, 'days').format('DD/MM/YYYY');


        $(".datepicker").datepicker({
            autoclose: true,
            todayHighlight: false,
            endDate: earliest_date
        }).on('changeDate', function(ev) {
            $(this).valid();
        });
        $(".travel_date").datepicker({
            autoclose: true,
            todayHighlight: false,
            startDate: today
        }).on('changeDate', function(ev) {
            $(this).valid();
        });
        $(".symptom_onset").datepicker({
            autoclose: true,
            todayHighlight: false,
            endDate: yesterday
        }).on('changeDate', function(ev) {
            $(this).valid();
        });
    });

    $(function() {
        var input = document.querySelector(".phone");
        window.intlTelInput(input, {
            preferredCountries: ["ng"],
            separateDialCode: true
        });
        var kin = document.querySelector("#phone_kin");
        window.intlTelInput(kin, {
            preferredCountries: ["ng"],
            separateDialCode: true
        });
    });

})(jQuery);
(function($) {

    $(document).ready(function() {
        $('select').select2({}).on("change", function(e) {
            // $(this).valid()
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
            // $(this).valid();
        });
        $(".travel_date").datepicker({
            autoclose: true,
            todayHighlight: false,
            startDate: today
        }).on('changeDate', function(ev) {
            // $(this).valid();
        });
        $(".symptom_onset").datepicker({
            autoclose: true,
            todayHighlight: false,
            endDate: yesterday
        }).on('changeDate', function(ev) {
            // $(this).valid();
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
// A $( document ).ready() block.
$(document).ready(function () {
    var color = "238ac5"
    document.documentElement.style.setProperty('--theme-color', `#${color}`);
    document.documentElement.style.setProperty('--primary-color', `#${color}`);
    $(".btn-success").css("background", `#${color}`);
    $(".btn--outline-success").css({"border": `#${color}`, "color": `#${color}`});
    $("#sidebar ul li a:hover").css("color", `#${color}`);
    $(".custom-file-container__custom-file__custom-file-control__button").css("background-color", `#${color}`);

    $('.navbar-toggler').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('body').toggleClass('no-scroll');
    });
    $('#sidebarCollapse-1').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#navbar').addClass('d-block');
    });
    $('#add_user').click(function () {
        $('#show_user_form').show("slow")
    })
    $('#close').click(function () {
        $('#show_user_form').hide("slow")
    })
    if (document.getElementById("role_option") !== null) {
        var role_option = document.getElementById("role_option");
        role_option.addEventListener('change', setValue);
    }

    function setValue() {
        var content_options_value = role_option.options[role_option.selectedIndex].value;
        switch (content_options_value) {
            case 'HR':
                $('#hr_roles').show()
                $('#reviewer_roles').hide()
                break;
            case 'Reviewer':
                // code block
                $('#reviewer_roles').show()
                $('#hr_roles').hide()
                break;
            default:
                $('#hr_roles').show()
        }
    }
    
    if (document.getElementById("departmentSubmit")) {
        let dept_button = document.getElementById("departmentSubmit");
        dept_button.onclick = addDepartment;
    }

    function addDepartment() {
        let textInput = document.getElementById("departmentModalInput");
        let text = textInput.value;
        if (text === "") return;
        let node = document.createElement("input");
        node.value = text;
        node.setAttribute("readonly", true)
        node.setAttribute("class", "form-control form-control-sm my-2 col-lg-5 mr-2 add-input-close")
        node.onclick = function () {
            this.remove();
        }
        document.getElementById("departmentModalItems").appendChild(node);
        textInput.value = "";
    }

    $('.edit_course').click(function () {
        $('.course_form').show("slow")
    })
    $('.close_course_form').click(function () {
        $('.course_form').hide("slow")
    })
    $('.set_color').click(function (e) {
        var set_color = e.currentTarget.dataset.color;
        window.localStorage.setItem('color', `${set_color}`)
    })
    $('#show_settings').click(function () {
        $('#sidebar').animate({
            scrollTop: $(document).height()
        }, 1000)
    });
    $('#choose_template').click(function () {
        console.log('clea')
        if ($('#card_one').is(":visible")) {
            console.log($('#card_one').is(":visible"))
            $('#card_one').hide('slow');
            $('#card_two').show('slow');
        }
        else if ($('#card_two').is(":visible")) {
            $('#card_two').hide('slow');
            $('#card_three').show('slow');
            $('#choose_template').text('Finish');
        }
        else if ($('#card_three').is(":visible")) {
            window.location.href = `/dashboard/index.html`;
        }
    })
    if ($(".support_button").length) {
        $('.support_button').click(function () {
            $('.support-links').toggle('slow');
            $('#sidebar').animate({
                scrollTop: $(document).height()
            }, 1000)
        })
    }
    if ($(".hide_upload").length) {
        $('.hide_upload').click(function () {
            $('.blog_upload').hide('slow');
            $('.text_upload').show('slow');
            $('.hide_upload').hide('slow');
        })
    }
    
    // bar chart if element exists
    if ($("#barChart").length) {
        var barChart1 = $("#barChart");
        var original = Chart.defaults.global.legend.onClick;
        Chart.defaults.global.legend.onClick = function (e, legendItem) {
            update_caption(legendItem);
            original.call(this, e, legendItem);
        };
        var data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
            , datasets: [{
                label: "Active Users"
                , data: [20, 19, 30, 17, 28, 24, 72, 24, 25, 10, 50, 80]
                , borderColor: "#20A354"
                , backgroundColor: "rgba(0, 0, 0, 0)"
                , borderWidth: 1
            }, {
                label: "Enrolled Courses"
                , data: [45, 29, 50, 5, 20, 83, 10, 47, 38, 24, 7, 14]
                , borderColor: "#DD346B"
                , backgroundColor: "rgba(0, 0, 0, 0)"
                , borderWidth: 1
            }
                         , {
                             label: "Completed Courses"
                             , data: [70, 19, 13, 57, 79, 20, 47, 14, 50, 10, 50, 80]
                             , borderColor: "#238AC5"
                             , backgroundColor: "rgba(0, 0, 0, 0)"
                             , borderWidth: 1
                         }]
        };
        var myChart = new Chart(barChart1, {
            type: 'line'
            , data: data
            , options: {
                scales: {
                    xAxes: [{
                        display: true
                        , ticks: {
                            fontSize: '11'
                            , fontColor: '#969da5'
                        }
                        , gridLines: {
                            color: 'rgba(0,0,0,0.05)'
                            , zeroLineColor: 'rgba(0,0,0,0.05)'
                        }
                    }]
                }
                , scaleLabel: function (label) {
                    return '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                , legend: {
                    display: true
                }
                , animation: {
                    animateScale: true
                }
            }
        });
        var labels = {
            "Active Users": true
            , "Enrolled Courses": true
            , "Completed Courses": true
        };
        var caption = document.getElementById("caption");
        var update_caption = function (legend) {
            labels[legend.text] = legend.hidden;
            var selected = Object.keys(labels).filter(function (key) {
                return labels[key];
            });
            var text = selected.length ? selected.join(" & ") : "nothing";
            caption.innerHTML = "The chart is displaying " + text;
        };
    }


    // staff chart if element exists
    if ($("#staffBarChart").length) {
        var barChart1 = $("#staffBarChart");
        var original = Chart.defaults.global.legend.onClick;
        Chart.defaults.global.legend.onClick = function (e, legendItem) {
            update_caption(legendItem);
            original.call(this, e, legendItem);
        };
        var data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
            , datasets: [{
                label: "Course Completion"
                , data: [20, 19, 30, 17, 28, 24, 72, 24, 25, 10, 30, 40]
                , borderColor: "#20A354"
                , backgroundColor: "rgba(0, 0, 0, 0)",
                borderWidth: 1
            }
                         , {
                             label: "Completed Courses"
                             , data: [70, 19, 13, 57, 79, 20, 47, 14, 50, 10, 50, 80]
                             , borderColor: "#238AC5"
                             , backgroundColor: "rgba(0, 0, 0, 0)",
                             borderWidth: 1
                         }]
        };


        var myChart = new Chart(barChart1, {
            type: 'line'
            , data: data
            , options: {
                scales: {
                    xAxes: [{
                        display: true
                        , ticks: {
                            fontSize: '11'
                            , fontColor: '#969da5'
                        }
                        , gridLines: {
                            color: 'rgba(0,0,0,0.05)'
                            , zeroLineColor: 'rgba(0,0,0,0.05)'
                        }
                    }]
                }
                , scaleLabel: function (label) {
                    return '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                , legend: {
                    display: true
                }
                , animation: {
                    animateScale: true
                }
            }
        });
        var labels = {
            "Course Completion": true
            , "Uncompleted Course": true
        };
        var caption = document.getElementById("caption");
        var update_caption = function (legend) {
            labels[legend.text] = legend.hidden;
            var selected = Object.keys(labels).filter(function (key) {
                return labels[key];
            });
            var text = selected.length ? selected.join(" & ") : "nothing";
            caption.innerHTML = "The chart is displaying " + text;
        };
    }
    //          Pie chart
    if ($("#donutChart").length) {
        var ctx = document.getElementById("donutChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut'
            , data: {
                labels: ["Correct Answers", "Wrong Answers"]
                , datasets: [{
                    backgroundColor: [
                        "#20A354"
                        , "#E5E5E5"
                    ]
                    , data: [70, 19]
                }]
            }
            , option: {
                legend: {
                    display: false,
                    position: 'bottom'
                }
                , animation: {
                    animateScale: true
                }
                , cutoutPercentage: 80
            }
        });
    }



    // staff chart if element exists
    if ($("#procastination").length) {
        var procastination = $("#procastination");
        var original = Chart.defaults.global.legend.onClick;
        Chart.defaults.global.legend.onClick = function (e, legendItem) {
            update_caption(legendItem);
            original.call(this, e, legendItem);
        };
        var data = {
            labels: ["Mon", "Tue", "Wed", "Thur", "Fri"]
            , datasets: [{
                label: "Average Procrastination"
                , data: [20, 5, 50, 17, 28]
                , borderColor: `#${color}`
                , backgroundColor: "rgba(0, 0, 0, 0)",
                borderWidth: 2
            }]
        };


        var myChart = new Chart(procastination, {
            type: 'line'
            , data: data
            , options: {
                scales: {
                    xAxes: [{
                        display: true
                        , ticks: {
                            fontSize: '11'
                            , fontColor: '#969da5'
                        }
                        , gridLines: {
                            color: 'rgba(0,0,0,0.05)'
                            , zeroLineColor: 'rgba(0,0,0,0.05)'
                        }
                    }]
                }
                , scaleLabel: function (label) {
                    return '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                , legend: {
                    display: false
                }
                , animation: {
                    animateScale: true
                }
            }
        });


    }

    //    if ($("#progress_data").length) {
    //        var ctx = document.getElementById("progress_data");
    //        var myChart = new Chart(ctx, {
    //            type: 'doughnut'
    //            , data: {
    //                labels: ["Correct Answers", "Wrong Answers"]
    //                , datasets: [{
    //                    backgroundColor: [
    //                        "#20A354"
    //                        , "#E5E5E5"
    //                    ]
    //                    , data: [70, 19]
    //                }]
    //            }
    //            , option: {
    //                legend: {
    //                    display: false,
    //                    position: 'bottom'
    //                }
    //                , animation: {
    //                    animateScale: true
    //                }
    //                , cutoutPercentage: 80
    //            }
    //        });
    //    }


    if ($("#progress_data").length) {
        var progress_data = $("#progress_data");

        // donut chart data
        var data = {
            labels: ["Correct Answers", "Wrong Answers"],
            datasets: [{
                data: [300, 70],
                backgroundColor: [`#${color}`,"#E5E5E5"],
                hoverBackgroundColor: [`#${color}`, "#EFEFEF"],
                borderWidth: 0
            }]
        };

        // -----------------
        // init donut chart
        // -----------------
        new Chart(progress_data, {
            type: 'doughnut',
            data: data,
            options: {
                legend: {
                    display: false
                },
                animation: {
                    animateScale: true
                },
                cutoutPercentage: 80
            }
        });
    }


    if ($('.popular').length) {
        $('.popular').slick({
            slidesToShow: 5
            , slidesToScroll: 1
            , autoplay: false
            , autoplaySpeed: 1500
            , arrows: true
            , dots: false
            , pauseOnHover: true
            , responsive: [{
                breakpoint: 768
                , settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 520
                , settings: {
                    slidesToShow: 1
                }
            }]
            , nextArrow: '<button class="btn right-slide-arrow"><img src="img/right_arrow.svg" class="img-fluid px-2" alt="slide right"></button>'
            , prevArrow: '<button class="btn left-slide-arrow d-none"><i class="fa fa-angle-left fa-1x"></i></button>'
        });
    }

    if ($('.compose_message').length) {
        $('.compose_message').click(function(){
            $('.new_message').show()
            $('.chat_history').hide()
        });
    }

    if ($('.message_detail').length) {
        $('.message_detail').click(function(){
            $('.new_message').hide()
            $('.chat_history').show()
        });
    }

    // if ($('#assign_staff').length) {
    //     $('#assign_staff').modal('show');
    // }


    if ($('.select2').length) {
        $('.select2').select2();
    }

    if ($('#twemoji-picker').length) {
        $('#twemoji-picker').twemojiPicker();
        $('#twemoji-picker-1').twemojiPicker();
    }



    if($('.myUploader').length){
        var myUpload = new FileUploadWithPreview('myUploader', {
            text: {
                chooseFile: 'Upload Photo..'
                , browse: 'Upload'
                , selectedCount: 'files selected'
            }
        })
        }

});

if ($('.dropzone').length) {
    Dropzone.options.myAwesomeDropzone = {
        init: function () {
            var myDropZone = this;
            this.on("addedfile", function(file) {
                $(".dropzone").css("border", "0px #28a745");
                $(".img-caption").show('slow');
            }),

                $("#btnRemoveAll").click(function () {
                $(".img-caption").hide('slow');
                $(".dropzone").css("border", "2px #28a745");
                myDropZone.removeAllFiles();
            });
        }
    };
}


var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
              'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
              'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
              'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
              'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
              'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
              'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
              'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
              'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
             ];

if($('.typeahead').length){
    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
                              {
        name: 'states',
        source: substringMatcher(states)
    });
}



if($('.file_name').length){
    $('input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;
        console.log(fileName);
        console.log(e);
        e.currentTarget.parentElement.previousElementSibling.children[0].value = fileName ;
    });
}

if (document.getElementById("quiz_type") !== null) {
    var quiz_type = document.getElementById("quiz_type");
    quiz_type.addEventListener('change', setQuestion);
}

function setQuestion() {
    var content_options_value = quiz_type.options[quiz_type.selectedIndex].value;
    switch (content_options_value) {
        case 'Multiple_Choice':
            $('#multi_choice').show()
            $('#true_false').hide()
            break;
        case 'Boolean':
            // code block
            $('#true_false').show()
            $('#multi_choice').hide()
            break;
        default:
            $('#multi_choice').show()
    }
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#logo_placeholder').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#logo_image").change(function() {
    readURL(this);
});

//https://www.cssscript.com/demo/color-picker-pro/material-picker.html

if ($('#dc-ex2').length) {
    var colorPickerMaterialCustomAnchor = new ColorPicker.Material('#dc-ex2', {
        color: '#e91e63'
    })

    colorPickerMaterialCustomAnchor.on('change', function(color) {
        console.log(colorPickerMaterialCustomAnchor.getColor());
    });
}

$(document).ready(function() {
    $('#filter').change(function () {
        $('.group').hide();
        // $('.group').addClass('w-0');
        $('.'+$(this).val()).show();
    });

    $('.play-item').click(function(){
       var idToSRC = this.id;
       $('#vid1').attr('src', idToSRC);
    });
});

if($('.chat-sidebar').length && localStorage.getItem('sent')){
    id = localStorage.getItem('user_id');
    name = localStorage.getItem('name');
    status = localStorage.getItem('status');
    img = localStorage.getItem('img');
    lastSeen = localStorage.getItem('lastSeen');
    job = localStorage.getItem('job');
    homePageOnly();
    $('.new_message').hide();
    $('#nomessage').hide();
    localStorage.removeItem('sent')
    localStorage.removeItem('user_id')
    localStorage.removeItem('name')
    localStorage.removeItem('status')
    localStorage.removeItem('img')
    localStorage.removeItem('lastSeen')
    localStorage.removeItem('job')
}

function homePageOnly(){
        chat = ""

        //set current chat time
        var unique_time = $.now();
        var currentdate = new Date(); 
        var hours = currentdate.getHours();
        var minutes = currentdate.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var datetime = hours + ":"  
                    + minutes + " " + ampm

                    $(".chat-sidebar").prepend('\
                                                <div class="backgrond-muted message_detail cursor active_message" id="'+id+'" >\
                                                    <div class="px-3 position-relative message_detail_click"  id="'+id+'" data-full-name="'+name+'" data-status="'+status+'" data-demo-src="'+img+'" data-id="'+id+'" data-job="'+job+'" data-last-seen="'+lastSeen+'">\
                                                        <div class="row py-2 border-bottom">\
                                                            <div class="col-lg-3 col-3 text-center ">\
                                                                <img src="img/'+img+'" class="img-fluid" alt="user name" />\
                                                            </div>\
                                                            <div class="col-lg-9 col-9">\
                                                                <div class="row">\
                                                                    <div class="col">\
                                                                        <p class="text-dark mb-0 weight-semi-bold">'+name+'</p>\
                                                                    </div>\
                                                                    <div class="text-right col-5">\
                                                                    </div>\
                                                                </div>\
                                                                <p class="text-muted font-13 mb-1">'+chat+'</p>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                    <div class="question_info_1 cursor" id="delete_user" data-id="'+id+'">\
                                                        <img src="img/delete_dark.svg" class="position-absolute" style="right: 5px; bottom: 40px;" />\
                                                    </div> \
                                                </div>');


        //Check if chat has already been itialized with a selected user

        if($('#'+id).length == 0 && !localStorage.getItem('sent')){

                $(".chat_history").append('\
                                        <div id="convo'+id+'" class="chat-conversation" style="min-height:40vh;">\
                                            <div class="d-flex border-bottom height--50p">\
                                                <div class="col">\
                                                    <p class="mb-0 text-dark">Louis <img src="img/'+status+'.svg" /></p>\
                                                    <p class="small mb-0 text-grey font-weight-light">'+lastSeen+'</p>\
                                                </div>\
                                            </div>\
                                            <div class="px-3 mt-2">\
                                                <div class="row py-2 border-bottom">\
                                                    <div class="col-2 text-md-center">\
                                                        <img class="img-avatar" src="img/'+img+'" class="img-fluid" alt="user name" />\
                                                    </div>\
                                                    <div class="col-9 pl-lg-0">\
                                                        <div class="row">\
                                                            <div class="col">\
                                                                <p class="text-dark mb-0 weight-semi-bold">'+name+'</p>\
                                                            </div>\
                                                        </div>\
                                                        <p class="text-muted font-13 mb-1">'+job+'</p>\
                                                    </div>\
                                                </div>\
                                                <div class="chat-wrapper"></div>\
                                            </div>\
                                        </div>');


        }else{
            $('.message_detail#'+id).addClass('active_message');
            $('.timeline-wrapper').show();
            $.ajax({
                url: 'https://reqres.in/api/users',
                dataType: 'json',
                type: 'get',
                contentType: 'application/json',
                param: '{}',
                async: true,
                success: function( data, textStatus, jQxhr ){
                    $(".chat_history").html('\
                                                <div id="convo'+id+'" class="chat-conversation" style="min-height:40vh;">\
                                                    <div class="d-flex border-bottom height--50p">\
                                                        <div class="col">\
                                                            <p class="mb-0 text-dark">Louis <img src="img/'+status+'.svg" /></p>\
                                                            <p class="small mb-0 text-grey font-weight-light">'+lastSeen+'</p>\
                                                        </div>\
                                                    </div>\
                                                    <div class="px-3 mt-2">\
                                                        <div class="row py-2 border-bottom">\
                                                            <div class="col-2 text-md-center">\
                                                                <img class="img-avatar" src="img/'+img+'" class="img-fluid" alt="user name" />\
                                                            </div>\
                                                            <div class="col-9 pl-lg-0">\
                                                                <div class="row">\
                                                                    <div class="col">\
                                                                        <p class="text-dark mb-0 weight-semi-bold">'+name+'</p>\
                                                                    </div>\
                                                                </div>\
                                                                <p class="text-muted font-13 mb-1">'+job+'</p>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                    <div class="chat-wrapper"></div>\
                                                </div>');
                                                $.each(data.data, function(index, item) {
                                                    $(".chat-wrapper").append('\
                                                                <div class="row py-2 sent" id="delete'+unique_time+'">\
                                                                    <div class="col-lg-12 pl-lg-2">\
                                                                        <div class="row chat-time">\
                                                                            <div class="text-right">\
                                                                                <div class="text-dim font-weight-light mb-0 message_time chat-time">'+item.id+' pm</div>\
                                                                            </div>\
                                                                        </div>\
                                                                        <div class="wrappers">\
                                                                            <p class="text-muted font-13 mb-1">'+item.email+'</p>\
                                                                            <i id="delete_chat" class="fa fa-trash-alt cursor" data-id="'+unique_time+'"></i>\
                                                                        </div>\
                                                                    </div>\
                                                                </div>\
                                                        ');
                                                });
                    $('#convo'+id).show();
                    $('.timeline-wrapper').hide();
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });

            // $('#convo'+id).show();
        }
}


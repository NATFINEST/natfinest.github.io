// A $( document ).ready() block.
$(document).ready(function () {
    var color = "20A354"
    document.documentElement.style.setProperty('--theme-color', `#${color}`);
    document.documentElement.style.setProperty('--primary-color', `#${color}`);
    $(".btn-success").css("background", `#${color}`);
    $(".btn--outline-success").css({"border": `#${color}`, "color": `#${color}`});
    $("#sidebar ul li a:hover").css("color", `#${color}`);
    $(".custom-file-container__custom-file__custom-file-control__button").css("background-color", `#${color}`);

    console.log('set')
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
    //			Pie chart
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

$(document).ready(function() {
    $('.chat-conversation').hide();


    function formatRepo (repo) {
      if (repo.loading) {
        return repo.text;
      }

      var $container = $(
        "<div class='select2-result-repository clearfix'>" +
            "<div class='select2-result-repository__title'></div>" +
            "</div>" +
          "</div>" +
        "</div>"
      );

      $container.find(".select2-result-repository__title").text(repo.first_name);

      return $container;
    }

    function formatRepoSelection (repo) {
      return repo.first_name || repo.text;
    }

    $('.webinar').select2({
        placeholder: "Select a contact",
        dropdownParent: $("#webinar"),
          ajax: {
            url: "https://reqres.in/api/users",
            dataType: 'json',
            delay: 250,
            data: function (params) {
              return {
                q: params.term, // search term
                page: params.page
              };
            },
            processResults: function (data, params) {
              params.page = params.page || 1;
              return {
                results: data.data,
                pagination: {
                  more: (params.page * 30) < data.total_count
                }
              };
            },
            cache: true
          },
          minimumInputLength: 1,
          templateResult: formatRepo,
          templateSelection: formatRepoSelection

    })

    $('.js-example-basic-single').select2({
        placeholder: "Select a contact",
        dropdownParent: $("#compose"),
          ajax: {
            url: "https://reqres.in/api/users",
            dataType: 'json',
            delay: 250,
            data: function (params) {
              return {
                q: params.term, // search term
                page: params.page
              };
            },
            processResults: function (data, params) {
              params.page = params.page || 1;
              return {
                results: data.data,
                pagination: {
                  more: (params.page * 30) < data.total_count
                }
              };
            },
            cache: true
          },
          minimumInputLength: 1,
          templateResult: formatRepo,
          templateSelection: formatRepoSelection

    }).on("change", function(e) {
        //Initialize variables
        name = $("#select-contact").select2('data')[0].element.dataset['fullName'];
        status = $("#select-contact").select2('data')[0].element.dataset['status'];
        img = $("#select-contact").select2('data')[0].element.dataset['demoSrc'];
        id = $("#select-contact").select2('data')[0].element.dataset['id'];
        lastSeen = $("#select-contact").select2('data')[0].element.dataset['lastSeen'];        
        job = $("#select-contact").select2('data')[0].element.dataset['job'];

        //Set cursor to text area
        $('#chat-text').focus();
        var chat = $('#chat-text').val()
        $('#nomessage').hide();
        $('.new_message').hide();
        $('.chat-conversation').hide();
        $('.message_detail').removeClass('active_message');

        homePageOnly();

    });

    //Press Enter to send
    $('#chat-text').keypress(function (e) {
      if (e.keyCode == 13 && !e.shiftKey) {
        $(this).blur();
        $('#chat-send').focus().click();
        return false;    //<---- Add this line
      }
    });
    
    //When user sends a message
    $('#chat-send').on('click', function () {
        var unique_time = $.now();
        var chat = $('#chat-text').val()
        var currentdate = new Date(); 
        var hours = currentdate.getHours();
        var minutes = currentdate.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var datetime = hours + ":"  
                    + minutes + " " + ampm

        //Check if the textarea is empty
        if (chat != "") {
            $('#chat-text').focus();

                     $('#'+id).html('\
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
                            </div>');

            //Output the message that was sent on the screen
            $("#convo"+ id).find('.chat-wrapper').append('\
                                    <div class="row py-2 sent" id="delete'+unique_time+'">\
                                        <div class="col-lg-12 pl-lg-2">\
                                            <div class="row chat-time">\
                                                <div class="text-right">\
                                                    <div class="text-dim font-weight-light mb-0 message_time chat-time">'+datetime+'</div>\
                                                </div>\
                                            </div>\
                                            <div class="wrappers">\
                                                <p class="text-muted font-13 mb-1">'+chat+'</p>\
                                                <i id="delete_chat" class="fa fa-trash-alt cursor" data-id="'+unique_time+'"></i>\
                                            </div>\
                                        </div>\
                                    </div>');

            $.ajax({
                url: 'https://reqres.in/api/users',
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({"message":chat,"recipient-name":name,"recipient-id":id,"recipient-status":status,"send-time":datetime,"unique_time":unique_time}),
                processData: false,
                success: function( data, textStatus, jQxhr ){
                    $('#response pre').html( JSON.stringify( data ) );
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });
            $('#chat-text').val('');
                    $('.chat-wrapper').animate({
                        scrollTop: $(this).offset().top
                    }, 1500);
        }
    });

    $('#start-conversation').click(function(){
        $('.new_message').show();
        $('.chat-conversation').hide();
        // $('#convo'+id).hide();
    })

    if($('.message_detail').length > 0){
        $('#nomessage').hide();
    }

    $(document).on('click', '.message_detail_click', function () {
        id = $(this).attr('id');
        name = $(this).data('fullName');
        status = $(this).data('status');
        img = $(this).data('demoSrc');
        lastSeen = $(this).data('lastSeen');
        job = $(this).data('job');
        id = $(this).data('id');
        var unique_time = $.now();
        $('.new_message').hide();
        $('.chat-conversation').hide();
        $('.timeline-wrapper').show();
        $(this).removeClass('unread');
        $.ajax({
            url: 'https://reqres.in/api/users',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            param: '{}',
            async: true,
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( JSON.stringify( data ) );
                $('.message_detail').removeClass('active_message');
                $('.new_message').hide();
                $('.chat-conversation').hide();
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
                                                                <img src="img/'+img+'" class="img-fluid" alt="user name" />\
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
                $('.message_detail#'+id).addClass('active_message');
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    })

});

//Delete User Chat
$(document).on('click','#delete_chat',function(e){
    e.preventDefault();
    id = $(this).data("id");
    $.ajax({
        url: 'https://reqres.in/api/users',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        param: '{}',
        async: true,
        success: function( data, textStatus, jQxhr ){
            $(".row #delete"+id).remove();
        }
    })
});

//Delete User
$(document).on('click','#delete_user',function(e){
    e.preventDefault();
    id = $(this).data("id");
    $.ajax({
        url: 'https://reqres.in/api/users',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        param: '{}',
        async: true,
        success: function( data, textStatus, jQxhr ){
            $(".message_detail#"+id).remove();
            $("#convo"+id).remove();
            $(".new_message").show();
        }
    })
});

// For Community


$(function () {
    $(".loadReply").on('click', function (e) {
        e.preventDefault();
        id = $(this).data("id");
        $("." + id + ":hidden").slice(0, 2).slideDown();
        if ($("." + id + ":hidden").length == 0) {
            $(".loadReply#"+id).fadeOut('slow');
        }
        $('.post').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
});
$(function () {
    imglen = $('.card--dashboard').length
    for (i = 1; i <= imglen; i++) {
        $(".img-p"+i).slice(0, 1).show();
    };
});
$(function () {
    gallen = $('.col-gallery .col-6').length
    for (i = 1; i <= gallen; i++) {
        $(".img-gallery").slice(0, 4).show();
    };
});

// Get current time to use as unique id
function gettime(){
    var unique_time = $.now();
    return unique_time
}

//Use to get the how long ago the message was sent
function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return Math.floor(interval) + "w";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  return "Now";
}

function getMorePost(){
    $.ajax({
        url: 'https://reqres.in/api/users',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        param: '{}',
        async: true,
        success: function( data, textStatus, jQxhr ){
            im = '';
            result = '';
            // if(data.hasimage){
                imglen = 5;
                uniqueid = 44;
                imgsrc = 'https://www.businessinsider.in/photo/80011697/happy-new-year-2021-wishes-and-messages-for-your-dear-ones.jpg?imgsize=431835';
                function showPostImg(){
                    for (i=0; i<imglen; i++){
                        result += `
                            <div class="col-12 post-image">
                                <a href="`+imgsrc+`" data-lightbox="im`+uniqueid+`" class="content">
                                    <div class="content-overlay"></div>
                                    <img src="`+imgsrc+`" class="img-fluid mt-2 comm-img" />
                                    <div class="content-details fadeIn-top">
                                        <h3><i class="fa fa-search-plus fa-2x"></i></h3>
                                    </div>
                                </a>
                            </div>`
                    }
                    return result
                }
                im = showPostImg();
            // }
                $(".card-content").append(`
                    <div class="card--dashboard my-3" style="display: block;">

                        <div class="row">
                            <div class="col-md-12 my-2 pt-2">
                                <div class="px-4 row">
                                    <div class="col-9 d-flex">
                                        <div class="mr-2">
                                            <img src="images/course_img.png" class="mt-1">
                                        </div>
                                        <div class="info cursor" data-user="1">
                                            <p class="font-weight-bold mb-0 font-14">Brandee Sanders
                                            </p><p class="font-weight-light font-14">5 mins ago</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="px-4">
                                    <p class="font-14 font-weight-light">I am Post 1</p>
                                </div>

                                <div class="row">
                                    `+im+`
                                </div>

                                <div class="like-comment row my-3 px-5">
                                    <div class="like-comment-value text-right">
                                        <span class="mr-1 font-12 likes-val"><span class="num-likes" id="num-likes-1">1</span> <span class="text-likes">like</span></span>
                                        <span class="mr-1 font-12 comments-val"><span class="num-comments" id="num-comment-1">0</span> <span class="text-comments">comment</span></span> 
                                    </div>
                                </div>

                                <hr>

                                <div class="like-share row my-0 px-5">
                                    <div class="text-left mr-4 ">
                                        <a class="like font-weight-500 d-flex align-items-center" href="#" data-user="1" data-post="1" data-id="1">
                                            <span class="icon" id="icon-1"><i class="far fa-thumbs-up font-20 mr-1"></i></span>
                                            <span class="like-unlike font-14" id="like-unlike-1">Like</span>
                                        </a>
                                    </div>
                                    <div class="text-left mr-4 d-flex align-items-center">
                                        <a class="show-comments font-weight-500 d-flex align-items-center" href="#" data-user="1" data-post="1" data-id="1">
                                            <span><i class="fa fa-comment-dots font-20 mr-1"></i></span>
                                            <span class="font-14" id="cmt-1">Comment</span>
                                        </a>
                                    </div>
                                    <div class="share text-left mr-4 d-flex align-items-center">
                                        <a class="share_link font-weight-500 d-flex align-items-center cursor" data-post="1" data-user="1" data-id="1">
                                            <span><i class="font-20 mr-1 fa fa-share"></i></span>
                                            <span class="font-14">Share</span>
                                        </a>
                                    </div>
                                    <div class="share text-left mr-4 d-flex align-items-center">
                                        <a class="font-weight-500 d-flex align-items-center cursor" data-post="1" data-user="1" data-id="1">
                                            <span><i class="font-20 mr-1 fa fa-paper-plane"></i></span>
                                            <span class="font-14">Send</span>
                                        </a>
                                    </div>
                                </div>

                                <div class="comments" style="display: none;">

                                    <hr>

                                    
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
}

function getComments(comments){
    since = timeSince(1611410592880);
    $.ajax({
            url: 'https://reqres.in/api/users',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            param: '{}',
            async: true,
            success: function( data, textStatus, jQxhr ){
                for (i = 0; i < data.data.length; i++){
                    $(comments.parent()).append(`
                        <div class="col-12 blog_comment reply-item pt-1 px-4" data-reply-id="1" style="display:block">
                            <div class="row main-comment">
                                <div class="col-1 px-1">
                                    <img src="`+img+`" class="mt-1" />
                                </div>
                                <div class="col-11 p-2 position-relative info cursor">
                                    <p class="weight-semi-bold mb-1" id="comment-name"> `+name+` <span class="font-12 float-right font-weight-400">`+since+`</span></p>
                                    <p class="font-14 font-weight-light mb-1" id="comment-text">Love</p>
                                </div>
                                <div class="col-12 mb-2">
                                    <a href="#" class="font-12 font-weight-500 add-reply-likes mr-2">Like</a>
                                
                                    <span href="#" class="font-12 reply-likes mr-2"><span class="reply-likes-value">0</span> <span class="reply-likes-text">Like</span></span>
                                
                                    <a href="#" class="font-12 font-weight-500 add-reply-comments mr-2">Reply</a>
                                
                                    <span href="#" class="font-12 reply-comments mr-2"><span class="reply-comments-value">0</span> <span class="reply-comments-text">Reply</span></span>
                                </div>
                                <div class="w-100 text-left px-4 mb-2">
                                    <a href="#" class="font-10 btn loadReply">Load Previous Replies</a>
                                </div>
                            </div>

                            <div class="replies">
                            </div>
                        </div>
                    `);
                    $(comments.parent()).slideDown();
                }
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
}

function getReply(id, comments){
    since = timeSince(1611410592880);
    $.ajax({
        url: 'https://reqres.in/api/users',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        param: '{}',
        async: true,
        success: function( data, textStatus, jQxhr ){
            for (i = 0; i < data.data.length; i++){
                $(comments.parent()).after(`
                    <div class="col-12 blog_comment reply-item pt-1 pl-4 pr-0" data-reply-id="1" style="display:block">
                        <div class="row main-comment">
                            <div class="col-1 px-1">
                                <img src="`+img+`" class="mt-1" />
                            </div>
                            <div class="col-11 p-2 position-relative info cursor">
                                <p class="weight-semi-bold mb-1" id="comment-name"> `+name+` <span class="font-12 float-right font-weight-400">`+since+`</span></p>
                                <p class="font-14 font-weight-light mb-1" id="comment-text">Love</p>
                            </div>
                            <div class="col-12 mb-2">
                                <a href="#" class="font-12 font-weight-500 add-reply-likes mr-2">Like</a>
                            
                                <span href="#" class="font-12 reply-likes mr-2"><span class="reply-likes-value">0</span> <span class="reply-likes-text">Like</span></span>
                            
                                <a href="#" class="font-12 font-weight-500 add-reply-comments mr-2">Reply</a>
                            
                                <span href="#" class="font-12 reply-comments mr-2"><span class="reply-comments-value">0</span> <span class="reply-comments-text">Reply</span></span>
                            </div>
                            <div class="w-100 text-left px-4 mb-2">
                                <a href="#" class="font-10 btn loadReply">Load Previous Replies</a>
                            </div>
                        </div>

                        <div class="replies">
                        </div>
                    </div>
                `);
                $(comments.parent()).slideDown();
            }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

$(function () {
    $("body").delegate(".loadReply", "click", function(e){
        e.preventDefault();
        comments = $(this).parent();
        id = $(this).closest('.blog_comment').attr('data-reply-id')
        console.log(comments)
        console.log(id)
        getReply(id, comments);
        $('html,body').animate({
            scrollTop: $(this).offset().top - 130
        }, 1500);
    });
});

$(function () {
    $(".card--dashboard").slice(0, 12).show();

    // Load more post when users get to the bottom of the page
    $(window).bind('scroll', function() {
        if($(window).scrollTop() >= $('.card-content').offset().top + $('.card-content').outerHeight() - window.innerHeight) {
            getMorePost();
        }
    });
    
    // Load more post when users show more botton is clicked
    $(".loadPost").on('click', function (e) {
        e.preventDefault();
        getMorePost();
        $('html,body').animate({
            scrollTop: $(this).offset().top - 130
        }, 1500);
    });
});

// Global User Info from Database
img = 'images/course_img.png' // Will be a global value
name = 'James Smart'; // Will be a global value

function createInput(){
    time = gettime();
    inputname = "example" + time;
    $("." + inputname).emojioneArea({
        search: false
    });
    return inputname
}

// Open comment box
$("body").delegate(".show-comments", "click", function(e){
    e.preventDefault();
    section = $(this).closest('.card--dashboard').find('.comments');
    if(section.hasClass('open')){
        return
    }
    else{
        $(section).html('');
        time = gettime();
        $(section).append(`
            <div class="px-4 row my-3">
                <div class="col-lg-12 col-12 d-flex lead emoji-picker-container px-1">
                    <img src="`+img+`" class="mt-1 mr-2" />
                    <input type="text" placeholder="Add a comment" class="form-control mt-2 comment-text example`+time+`" id="input-comment-1" data-img="course_img.png" data-name="Kelvin Sam" />
                    <button class="btn btn-sm btn-green mt-2 comment-send btn-round ml-2" data-id="comment-1" data-load="p1">Send</button>
                </div>
                <div class="col-12 comment_reply mx-auto" id="p1">
                    <div class="d-flex">
                        <div class="p-2 position-relative info cursor" data-user='1'>
                            <p class="weight-semi-bold mb-1" id="comment-reply-name"></p>
                            <p class="font-14 font-weight-light mb-1" id="comment-reply-text"></p>
                            <p class="d-none" id="comment-reply-post-id"></p>
                            <p class="d-none" id="comment-reply-comment-id"></p>
                        </div>
                        <div class="ml-auto mt-2">
                            <a href="#" class="hide-comment"><i class="fa fa-times"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `);

        $(".example" + time).emojioneArea({
            search: false
        });
        $(section).slideDown();
        $(section).addClass('open');
        $(".example" + time).data('emojioneArea').setFocus();
        getComments(section);
        $(section.parent().parent()).append(`
            <div class="w-100 text-left px-4">
                <a href="#" class="font-14 btn loadMore">Load More Comments</a>
            </div>`
        )
    }
})

$(function () {
    $("body").delegate(".loadMore", "click", function(e){
        e.preventDefault();
        comments = $(this).closest('.card--dashboard').find('.comments');
        getComments(comments);
        $('html,body').animate({
            scrollTop: $(this).offset().top - 130
        }, 1500);
    });
});

// Comment on a Post
$("body").delegate(".comment-send", "click", function(){

    section = $(this).closest('.card--dashboard').find('.comments');

    comment = $(this).closest('.comments').find('.emojionearea-editor').html();
    user_id = $(".comment_reply div div").data('user');

    time = gettime();
    since = (timeSince(time))
    
    //Check if the textarea is empty
    if (comment != "") {
            $(section).after(`

                <div class="col-12 blog_comment reply-item pt-1 px-4" data-reply-id="`+time+`" style="display:block">
                    <div class="row main-comment">
                        <div class="col-1 px-1">
                            <img src="`+img+`" class="mt-1" />
                        </div>
                        <div class="col-11 p-2 position-relative info cursor">
                            <p class="weight-semi-bold mb-1" id="comment-name"> `+name+` <span class="font-12 float-right font-weight-400">`+since+`</span></p>
                            <p class="font-14 font-weight-light mb-1" id="comment-text">`+comment+`</p>
                        </div>
                        <div class="col-12 mb-2">
                            <a href="#" class="font-12 font-weight-500 add-reply-likes mr-2">Like</a>
                        
                            <span href="#" class="font-12 reply-likes mr-2"><span class="reply-likes-value">0</span> <span class="reply-likes-text">Like</span></span>
                        
                            <a href="#" class="font-12 font-weight-500 add-reply-comments mr-2">Reply</a>
                        
                            <span href="#" class="font-12 reply-comments mr-2"><span class="reply-comments-value">0</span> <span class="reply-comments-text">Reply</span></span>
                        </div>
                    </div>

                    <div class="replies">
                    </div>
                </div>`);

            $(".example"+time).emojioneArea({
                search: false
            });

            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/todos/',
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({'post_id':time,'reply_text':comment}),
                processData: false,
                success: function( data, textStatus, jQxhr ){
                    $('#response pre').html( JSON.stringify( data ) );
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    // $(".like-unlike#like-unlike-" + id).html('Like');
                    // $(".icon#icon-"+id).html('<i class="fa fa-thumbs-up mt-1"></i>');
                }
            });
        }
        num_comment = $(this).closest('.card--dashboard').find('.num-comments');
        $(num_comment).text(parseInt((num_comment).text())+1)
    // $(".num-comments#num-"+id).text(parseInt($(".num-comments#num-"+id).text()) + 1);
    plural();

    $(this).closest('.comments').find('.emojionearea-editor').html('');
});

// Like a comment of a post
$("body").delegate(".add-reply-likes", "click", function(e){
    e.preventDefault();
    val = $(this).closest('.reply-item').find('.reply-likes-value').first().text();

    if($(this).hasClass('text-primary')){
        val = parseInt(parseInt(val) - 1);
        $(this).removeClass('text-primary')
    }
    else{
        val = parseInt(parseInt(val) + 1);
        $(this).addClass('text-primary')
    }
    if(val <= 1){
        $(this).closest('.reply-item').find('.reply-likes-text').first().text('Like');
    }
    else{
        $(this).closest('.reply-item').find('.reply-likes-text').first().text('Likes');
    }
    $(this).closest('.reply-item').find('.reply-likes-value').first().text(val);
})

// Open reply a comment box
$("body").delegate(".add-reply-comments", "click", function(e){
    e.preventDefault();
    if($(this).closest('.blog_comment').find('.emoji-picker-container')){
        $(this).closest('.blog_comment').find('.emoji-picker-container').remove();
    }
    var time = gettime();
    $(this).closest('.main-comment').append(`
        <div class="row lead emoji-picker-container pl-4 mb-3 w-100">
            <div class="col-1 px-1">
                <img src="images/course_img.png" class="mt-1" />
            </div>
            <div class="col-10 px-0">
                <input type="text" placeholder="Add a comment" class="form-control mt-2 comment-text example`+time+`" id="input-comment-1" />
            </div>
            <div class="col-1 px-0">
                <button class="btn btn-sm btn-green mt-2 reply-send btn-round ml-2" data-id="comment-1" data-load="p1">Send</button>
            </div>
        </div>`
    ).slideDown('slow');
    $(".example"+time).emojioneArea({
        search: false
    });
    $('.comments').slideDown();
    $(".example"+time).data('emojioneArea').setFocus();
});

// Reply to a comment 
$("body").delegate(".reply-send", "click", function(e){
    e.preventDefault();
    unique_time = gettime();

    comment = $(this).closest('.reply-item').find('.emojionearea-editor').html();
    unique_id = $(this).closest('.reply-item').attr('data-reply-id');

    time = gettime();
    since = (timeSince(unique_time));

    val = $(this).closest('.reply-item').find('.reply-comments-value').first().text();
    val = parseInt(parseInt(val) + 1);

    $(this).closest('.reply-item').find('.reply-comments-value').first().text(val)
    if(val <= 1){
        $(this).closest('.reply-item').find('.reply-comments-text').text('Reply');
    }
    else{
        $(this).closest('.reply-item').find('.reply-comments-text').text('Replies');
    }

    $($(this).parent().parent().parent()).after(`
        <div class="col-12 blog_comment reply-item pt-2 pl-4 pr-0" data-reply-id="`+unique_time+`" style="display:block">
            <div class="row main-comment">
                <div class="col-1 px-1">
                    <img src="`+img+`" class="mt-1" />
                </div>
                <div class="col-11 p-2 position-relative info cursor">
                    <p class="weight-semi-bold mb-1" id="comment-name"> `+name+` <span class="font-12 float-right font-weight-400">`+since+`</span></p>
                    <p class="font-12 font-weight-light mb-1" id="comment-text">`+comment+`</p>
                </div>
                <div class="col-12 mb-2">
                    <a href="#" class="font-12 font-weight-500 add-reply-likes mr-2">Like</a>
                
                    <span href="#" class="font-12 reply-likes mr-2"><span class="reply-likes-value">0</span> <span class="reply-likes-text">Like</span></span>
                
                    <a href="#" class="font-12 font-weight-500 add-reply-comments mr-2">Reply</a>
                
                    <span href="#" class="font-12 reply-comments mr-2"><span class="reply-comments-value">0</span> <span class="reply-comments-text">Reply</span></span>
                </div>
                <div class="w-100 text-left px-4 mb-2">
                    <a href="#" class="font-10 btn loadReply">Load Previous Replies</a>
                </div>
            </div>
        </div>
    `);
    $(this).closest('.emoji-picker-container').remove();

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos/',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({'unique_id':unique_id,'reply_text':comment}),
        processData: false,
        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( JSON.stringify( data ) );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            // $(".like-unlike#like-unlike-" + id).html('Like');
            // $(".icon#icon-"+id).html('<i class="fa fa-thumbs-up mt-1"></i>');
        }
    });
});

function getUserBio(url) {
    console.log(url);
    var result = null;
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data.data;
            console.log(result.avatar)
        }
    });
   return `
        <div class="row w-100">
            <div class="col-12 d-flex">
                <div class="mr-2">
                    <img src="`+result.avatar+`" class="mt-1 avatar-img" />
                </div>
                <div class="">
                    <p class="font-weight-bold mb-0 font-14">`+result.first_name+`</a>
                    <p class="font-weight-light font-14 my-0">Email: `+result.email+`</p>
                    <p class="font-weight-light font-14 my-0">Staff ID: `+result.id+`</p>
                    <p class="font-weight-light font-14 my-0">Department: `+result.id+`</p>
                    <a href="#" class="btn btn-green btn-round font-14 mt-2">Message</a>
                </div>
            </div>
        </div>
    `;
}

$(".pop")
.popover({
        trigger: "manual",
        html: true,
        animation: false,
        container: document.body,
        placement: 'right'
    })
.on("mouseenter", function() {
    var _this = this;
    id = $(this).attr('data-user');
    $(this).data("bs.popover").options.content = getUserBio('https://reqres.in/api/users/' + id);
    $(this).popover("show");
    $(".popover").on("mouseleave", function() {
        $(_this).popover('hide');
    });
})
.on("mouseleave", function() {
    var _this = this;
    setTimeout(function() {
        if (!$(".popover:hover").length) {
            $(_this).popover("hide");
        }
    }, 300);
});

// Prevent Lightbox Popup from displaying
$(document).ready(function(){
    $('.post-image a').on('click', function(e){
        $('body').css({'position':'fixed'});
        console.log('kj')
    });
    $('.lb-close, .lightbox').on('click', function(e){
        $('body').css({'position':'unset'});
    });
    $(document).keyup(function(e) {
      if (e.keyCode == 27){ $('body').css({'position':'unset'})}
    });
});

//Pluralize like(s) and comment(s)
function plural() {
    $.each($('.like-comment'), function(index, val) {
        $(this).find(".text-likes").text($(this).find(".num-likes").text() >= 2 ? 'likes' : 'like');
        $(this).find(".text-comments").text($(this).find(".num-comments").text() >= 2 ? 'comments' : 'comment');
    });
}

$(document).ready(function(){
    plural();
    $("body").delegate(".share_link", "click", function(){
        id = $(this).data("id");
        user_id = $(this).data("user");
        post_id = $(this).data("post");
        $('#share').modal('show');
    })
});

$("body").delegate(".like", "click", function(){
    like_val = $(this).closest('.card--dashboard').find('.num-likes');
    post_id = $(this).closest('.card--dashboard').attr('data-post-id');
    if (!$(this).hasClass('text-primary')) {
        $(this).addClass('text-primary');
        $(this).html('<i class="fa fa-thumbs-up font-20 mr-1 text-primary"></i>Like');
        val_added = 1
    }
    else {
        $(this).removeClass('text-primary');
        $(this).html('<i class="far fa-thumbs-up font-20 mr-1"></i>Like');
        val_added = -1
    }

    $(".like").css("pointer-events", "auto");
    $(like_val).text(parseInt($(like_val).text()) + val_added);
    plural();
    // $(this).css("pointer-events", "none");
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos/',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({'post_id':post_id,'value':val_added}),
        processData: false,
        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( JSON.stringify( data ) );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            // $(".like-unlike#like-unlike-" + id).html('Like');
            // $(".icon#icon-"+id).html('<i class="fa fa-thumbs-up mt-1"></i>');
        }
    });
    return false;
});


$("body").delegate("#send-message", "click", function(e){
    e.preventDefault();
    user_id = $(this).data("id");
    name = $(this).data('fullName');
    status = $(this).data('status');
    img = $(this).data('demoSrc');
    lastSeen = $(this).data('lastSeen');
    job = $(this).data('job');
    localStorage.setItem('user_id', user_id)
    localStorage.setItem('name', name)
    localStorage.setItem('status', status)
    localStorage.setItem('img', img)
    localStorage.setItem('lastSeen', lastSeen)
    localStorage.setItem('job', job)
    localStorage.setItem('sent', true)
    window.location.href = "message.html";
    // $.redirect('message.html', {'arg1': 'value1', 'arg2': 'value2'});
})

//Newly Added  

$(document).ready(function() {
    $(".example1").emojioneArea({
        search: false,
        hidePickerOnBlur: false
    });
});

$(document).ready(function() {
    $(".example2").emojioneArea({
        pickerPosition: "bottom",
        search: false,
        hidePickerOnBlur: false
    });
});
         
$("body").delegate(".show-drop", "click", function(e){
    e.preventDefault();
    e.stopPropagation();
    id = $(this).attr('id')
    $('.post#'+id).slideDown("slow");
    $(this).text('Hide Comment');
    $(this).removeClass('show-drop');
    $(this).addClass('hide-drop');
});
$("body").delegate(".hide-drop", "click", function(e){
    e.preventDefault();
    e.stopPropagation();
    id = $(this).attr('id')
    $('.post#'+id).slideUp("slow");
    $(this).text('Show Comment');
    $(this).removeClass('hide-drop');
    $(this).addClass('show-drop');
});

$(function () {
    $(".openDir").click(function () {
        var desc = $(this).data('desc');
        var title = $(this).data('title');
        var ig = $(this).data('ig');
        var web = $(this).data('web');
        var email = $(this).data('email');
        var cat = $(this).data('cat');
        var phone = $(this).data('phone');
        var email = $(this).data('email');
        $(".modal-body .cat").html(cat);
        $(".modal-body .web").html(`<a href="`+web+`" class="text-primary">`+web+`</a>`);
        $(".modal-body .ig").html(`<a href="`+ig+`" class="text-primary">`+ig+`</a>`);
        $(".modal-body .email").html(`<a href="mailto:/`+email+`" class="text-primary">`+email+`</a>`);
        $(".modal-body .phone").html(`<a href="tel:/`+phone+`" class="text-primary">`+phone+`</a>`);
        $(".modal-body .desc").html(desc);
        $(".modal-body .title").html(title);
        $(".modal-title").html(title);
    })
});

$(document).ready(function(){
    $("body").delegate(".get_id", "click", function(){
        id = $(this).parent().parent().parent().closest('tr').find('.sorting_1').text();
        modalTitle = $(this).attr('data-target').substring(1)
        if($('#'+modalTitle).find('form').find('.'+modalTitle+'_id').length > 0){
            $('#'+modalTitle).find('form').find('.'+modalTitle+'_id').val(id)
        }
        else{
            $('#'+modalTitle).find('form').prepend(`
                <input type="hidden" class="`+modalTitle+`_id" name="`+modalTitle+`_id" value="`+id+`">`)
        }
        // $('#'+modalTitle).find('.meta_id').val(id)
    })
})

$(document).ready(function(){
    $("body").delegate(".edit_id", "click", function(){
        id = $(this).parent().parent().closest('tr').find('.sorting_1').text();
        modalTitle = $(this).attr('data-target').substring(1);
        if($('#'+modalTitle).find('form').find('.'+modalTitle+'_id').length > 0){
            $('#'+modalTitle).find('form').find('.'+modalTitle+'_id').val(id)
        }
        else{
            $('#'+modalTitle).find('form').prepend(`
                <input type="hidden" class="`+modalTitle+`_id" name="`+modalTitle+`_id" value="`+id+`">`)
        }
        // $('#'+modalTitle).find('.meta_id').val(id)
    })
})

$(document).ready(function(){
    $("body").delegate(".rate", "click", function(){
        id = $(this).attr('id');
        $('#rate_course').find('.rate_id').val(id)
    })
})
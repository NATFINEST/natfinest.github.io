// A $( document ).ready() block.
$(document).ready(function () {
    var color = "20A354"
    document.documentElement.style.setProperty('--theme-color', `#${color}`);
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
            window.location.href = `/index.html`;
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
    if ($(".display_image_upload").length) {
        $('.display_image_upload').click(function () {
            $('.blog_upload').show('slow');
            $('.hide_upload').show('slow');
            $('.text_upload').hide('slow');
            // var myDropzone = new Dropzone("#my-awesome-dropzone", { url: "/file/post"});
            $('.dropzone').get(0).dropzone.hiddenFileInput.click();
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
            , nextArrow: '<button class="btn right-slide-arrow"><img src="../img/right_arrow.svg" class="img-fluid pl-1" alt="slide right"></button>'
            , prevArrow: '<button class="btn left-slide-arrow d-none"><i class="fa fa-angle-left fa-1x"></i></button>'
        });
    }

    // if ($('.compose_message').length) {
    //     $('.compose_message').click(function(){
    //         $('.new_message').show()
    //         $('.chat_history').hide()
    //     });
    // }

    // if ($('.message_detail').length) {
    //     $('.message_detail').click(function(){
    //         $('.new_message').hide()
    //         $('.chat_history').show()
    //     });
    // }

    if ($('#assign_staff').length) {
        $('#assign_staff').modal('show');
    }


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
            // url: "https://www.cssninja.io/dropzone.pp";
            console(url);
            this.on("processing", function(file) {
              this.options.url = "/some-other-url";
            });
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

$("#d-sub").on("click", function(e) {
    console.log(myAwesomeDropzone.files);
});

$(document).ready(function() {
    $('[data-search]').on('keyup', function() {
        var searchVal = $(this).val();
        var filterItems = $('[data-filter-item]');

        if ( searchVal != '' ) {
            filterItems.hide();
            $('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').show();
        } else {
            filterItems.show();
        }
    });

    $('#CourseSelect2').change(function () {
        $('.group').hide();
        $('.'+$(this).val()).show();
    })

    
});
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
$(document).ready(function() {
    $('.chat-conversation').hide();

    $('.js-example-basic-single').select2({
        placeholder: "Select a contact to start a conversation",
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

        //set current chat time
        var currentdate = new Date(); 
        var hours = currentdate.getHours();
        var minutes = currentdate.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var datetime = hours + ":"  
                    + minutes + " " + ampm

        //Check if chat has already been itialized with a selected user
        if($('#convo'+id).length == 0){

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
                                                    <div class="col-lg-2 text-md-center">\
                                                        <img src="img/'+img+'" class="img-fluid" alt="user name" />\
                                                    </div>\
                                                    <div class="col-lg-9 pl-lg-0">\
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
            $('#convo'+id).show();
        }
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

                if($('#'+id).length == 0){
                    $(".chat-sidebar").append('\
                                                <div class="backgrond-muted message_detail cursor active_message" id="'+id+'">\
                                                    <div class="px-3 position-relative">\
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
                                                                        <p class="text-dark font-weight-light mb-0 message_time">'+datetime+'</p>\
                                                                    </div>\
                                                                </div>\
                                                                <p class="text-muted font-13 mb-1">'+chat+'</p>\
                                                            </div>\
                                                        </div>\
                                                        <div class="question_info_1">\
                                                            <img src="img/delete_dark.svg" class="position-absolute" style="right: 50px; top: 10px;" />\
                                                            <img src="img/mail_dark.svg" class="position-absolute" style="right: 15px; top: 10px;" />\
                                                        </div>\
                                                    </div>\
                                                </div>');
                }else{
                     $('#'+id).html('\
                            <div class="px-3 position-relative">\
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
                                                <p class="text-dark font-weight-light mb-0 message_time">'+datetime+'</p>\
                                            </div>\
                                        </div>\
                                        <p class="text-muted font-13 mb-1">'+chat+'</p>\
                                    </div>\
                                </div>\
                                <div class="question_info_1">\
                                    <img src="img/delete_dark.svg" class="position-absolute" style="right: 50px; top: 10px;" />\
                                    <img src="img/mail_dark.svg" class="position-absolute" style="right: 15px; top: 10px;" />\
                                </div>\
                            </div>');
                }

            //Output the message that was sent on the screen
            $("#convo"+ id).find('.chat-wrapper').append('\
                                    <div class="row py-2 sent">\
                                        <div class="col-lg-12 pl-lg-2">\
                                            <div class="row chat-time">\
                                                <div class="text-right">\
                                                    <div class="text-dim font-weight-light mb-0 message_time chat-time">'+datetime+'</div>\
                                                </div>\
                                            </div>\
                                            <p class="text-muted font-13 mb-1">'+chat+'</p>\
                                        </div>\
                                    </div>');

            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/todos/',
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({"message":chat,"recipient-name":name,"recipient-id":id,"recipient-status":status,"send-time":datetime}),
                processData: false,
                success: function( data, textStatus, jQxhr ){
                    $('#response pre').html( JSON.stringify( data ) );
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });
            $('#chat-text').val('');
        }
    })
    $('#start-conversation').click(function(){
        $('.new_message').show();
        $('.chat-conversation').hide();
        // $('#convo'+id).hide();
    })
    $(document).on('click', '.message_detail', function () {
        var id = $(this).attr('id');
        $('.message_detail').removeClass('active_message');
        $(this).addClass('active_message');
        $('.new_message').hide();
        $('.chat-conversation').hide();
        $('#convo'+id).show();
    })
});

/*! chat.js | Friendkit | © Css Ninja. 2018-2019 */

/* ==========================================================================
Chat js file
========================================================================== */

$(document).ready(function () {
    "use strict";

    //Close chat app
    $('.close-chat, .open-chat').on('click', function () {
        $('.chat-wrapper').toggleClass('is-active');
        $('body').toggleClass('is-frozen');
    })

    //Close chat side panel
    $('#chat-panel .panel-close').on('click', function () {
        $('#chat-body, #chat-panel').removeClass('is-opened');
    })

    $("#nomessage").hide();

    if($('.user-item').length == 0){
        $("#nomessage").show();
    }

    $(document).on('click', '#myDiv1 .user-item', function () {

        //Declare variables
        var targetUser = $(this).attr('data-chat-user');
        var userAvatar = $(this).find('img').attr('src');
        var targetUserFullname = $(this).attr('data-full-name');
        var userStatus = $(this).attr('data-status');
        var lastSeen = $(this).attr('data-last-seen');

        //Handle sidebar chat items active state
        $('.user-item.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        //Resize chat body and open side panel
        $('#chat-body, #chat-panel').addClass('is-opened');

        //Handle user details toggle
        $('.chat-body-inner').addClass('is-hidden');
        $('#' + targetUser + '-conversation').removeClass('is-hidden');
        //Handle user conversation toggle
        $('.panel-body').addClass('is-hidden');
        $('#' + targetUser + '-details').removeClass('is-hidden');
        //Handle conversation header update
        $('.recipient-block').find('.user-avatar').attr('src', userAvatar);
        $('.recipient-block').find('.username span:first-child').html(targetUserFullname + '<i class="dripicons-media-record tag-'+userStatus+'"></i>');
        $('.recipient-block').find('.username span span').text(lastSeen);

    })

    //Declare some global varaibles
    var name, status, img, id, lastSeen;

    // STart a conversation
    $("#target" ).click(function() {

        //Declare some global varaibles
        name = $("#select-contact").select2('data')[0].element.dataset['fullName'];
        status = $("#select-contact").select2('data')[0].element.dataset['status'];
        img = $("#select-contact").select2('data')[0].element.dataset['demoSrc'];
        id = $("#select-contact").select2('data')[0].element.dataset['id'];
        lastSeen = $("#select-contact").select2('data')[0].element.dataset['lastSeen'];
        //Ensure cursor is on textarea
        $('#chat-text').focus();

        //Check if chat has already been itialized with a selected user
        if($('.user-item#'+id).length == 0){
            if($('.select2 .select2-container')){

                $('.user-item.is-active').removeClass('is-active');
                $('.chat-body-inner').addClass('is-hidden');

                $("#myDiv2").append('\
                                    <div id="'+ id +'-conversation" class="chat-body-inner has-slimscroll">\
                                        <div class="date-divider">\
                                            <hr class="date-divider-line">\
                                            <span class="date-divider-text">Today</span>\
                                        </div>\
                                    </div>');
                $('#add-conversation-modal').removeClass('is-active');
                $('.recipient-block').find('.user-avatar').attr('src', 'assets\/images\/avatars\/' + img);
                $('.recipient-block').find('.username span:first-child').html(name + '<i class="dripicons-media-record tag-'+status+'"></i>');
                $('.recipient-block').find('.username span span').text(lastSeen);
            }
        }else{
            $('#add-conversation-modal').removeClass('is-active');
            $('.user-item.is-active').removeClass('is-active');
            $('#myDiv1 .user-item#'+id).addClass('is-active');
            $('#' + id + '-conversation').removeClass('is-hidden');
        }


        //The user can now send messges
        $('#chat-send').removeAttr("disabled")
    });

    //Press Enter to send
    $('.textarea.comment-textarea').keypress(function (e) {
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
            $("#nomessage").hide();

            //Check if a conversation has already begun
            if($('.user-item#'+id).length == 0){
                $("#myDiv1").append('\
                                    <div class="user-item is-active" data-chat-user="'+ id +'" data-full-name="'+ name +'" data-status="'+status+'" data-last-seen="'+ lastSeen +'" id="'+id+'">\
                                        <div class="avatar-container">\
                                            <img class="user-avatar" src="assets\/images\/avatars\/'+ img +'" data-demo-src="assets\/images\/avatars\/'+ img +'" alt="">\
                                            <div class="user-status is-'+ status +'"></div>\
                                        </div>\
                                        <div class="msg-container">\
                                            <div class="fs-14 side-msg">'+ chat +'</div>\
                                        </div>\
                                        <div class="msg-time">\
                                            <div class="fs-12">'+datetime+'</div>\
                                        </div>\
                                    </div>');

            }else{
                $('#'+id).html('\
                                <div class="avatar-container">\
                                        <img class="user-avatar" src="assets\/images\/avatars\/'+ img +'" data-demo-src="assets\/images\/avatars\/'+ img +'" alt="">\
                                        <div class="user-status is-'+ status +'"></div>\
                                    </div>\
                                    <div class="msg-container">\
                                        <div class="fs-14 side-msg">'+ chat +'</div>\
                                    </div>\
                                    <div class="msg-time">\
                                        <div class="fs-12">'+datetime+'</div>\
                                    </div>');
            }

            //Output the message that was sent on the screen
            $("#"+ id +"-conversation").append('\
                                <div class="chat-message is-sent">\
                                    <div class="message-block">\
                                        <span>'+ datetime +'</span>\
                                        <div class="message-text">'+ chat +'</div>\
                                    </div>\
                                </div>')

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


})
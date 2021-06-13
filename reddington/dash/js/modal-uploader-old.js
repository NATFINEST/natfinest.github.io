/*! modal-uploader.js | Friendkit | © Css Ninja. 2018-2019 */

/* ==========================================================================
Uploader used in the create album modal
========================================================================== */

"use strict";

$('#start').on('click', function () {
    $('.modal-uploader').hide();
});

if ($('.modal-uploader').length) {
        Dropzone.autoDiscover = false;

    // Get the template HTML and remove it from the doument
    var previewNode = document.querySelector("#template");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    var modalUploader = new Dropzone(document.body, { // Make the whole body a dropzone
        url: "https://jsonplaceholder.typicode.com/todos/", // Set the url
        thumbnailWidth: 800,
        thumbnailHeight: 600,
        parallelUploads: 20,
        previewTemplate: previewTemplate,
        acceptedFiles: "image/jpeg,image/png,image/gif",
        autoProcessQueue: true,
        autoQueue: true, // Make sure the files aren't queued until manually added
        previewsContainer: "#previews", // Define the container to display the previews
        clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
    });

    $("#d-sub").on("click", function(e) {
        // Make sure that the form isn't actually being sent.
        e.preventDefault();
        e.stopPropagation();
        var up_file = modalUploader.files
        var time = $.now(); 
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "-"
                + ("0" + currentdate.getMonth()+1).slice(-2) + "-" 
                + ("0" + currentdate.getDate()).slice(-2) + " " 
                + ("0" + currentdate.getHours()).slice(-2) + ":"  
                + ("0" + currentdate.getMinutes()).slice(-2) + ":" 
                + ("0" + currentdate.getSeconds()).slice(-2);

        
        if (modalUploader.files != "") {
            $(".card-content").prepend(`
                <div class="card--dashboard mt-4" style="display: block;">

                    <div class="row mb-4">
                        <div class="col-md-12 my-2 pt-2">
                            <div class="px-4 row">
                                <div class="col-9 d-flex">
                                    <div class="mr-2">
                                        <img src="images/course_img.png" class="mt-1" />
                                    </div>
                                    <div class="info cursor" data-user='1'>
                                        <p class="font-weight-bold mb-0 font-14">Brandee Sanders</p>
                                        <p class="font-weight-light font-14">`+datetime+`</p>
                                    </div>
                                </div>
                            </div>

                            <div class="px-4">
                                <p class="font-14 font-weight-light">`+$('#media-text').val()+`</p>
                            </div>
                            <div class="row">
                                <div class="col col-image" id="col-image-`+time+`">
                                    
                                </div>
                            </div>

                            <div class="like-share row my-3 px-4">
                                <div class=" col text-left">
                                    <a class="like" data-user='1' data-post='`+time+`' data-id="`+time+`">
                                        <span class="icon" id="icon-`+time+`"><i class="fa fa-thumbs-up"></i></span>
                                        <span class="like-unlike" id="like-unlike-`+time+`">Like</span>
                                    </a>
                                </div>
                                <div class="share col text-left">
                                    <a class="share_link" data-post='`+time+`' data-user='1' data-id="`+time+`">
                                        <span><i class="fa fa-share"></i></span>
                                        <span>Share</span>
                                    </a>
                                </div>
                                <div class="like-share-value text-right">
                                    <span class="mr-1 fs-12 likes-val"><span class="num-likes" id="num-likes-`+time+`">0</span> <span class="text-likes">like</span></span>
                                    <span class="mr-1 fs-12 comments-val"><span class="num-comments" id="num-comment-`+time+`">0</span> <span class="text-comments">comment</span></span>
                                </div>
                            </div>

                            <hr>

                            <div class="px-4 row mt-3">
                                <div class="col-lg-12 col-12 d-flex">
                                    <img src="images/course_img.png" class="mt-1 mr-2" />
                                    <input type="text" placeholder="Add a comment" class="form-control mt-2 comment-text" id="input-comment-`+time+`" data-img="course_img.png" data-name="Kelvin Sam"/>
                                    <button class="btn btn-sm btn-green mt-2 comment-send" data-id="comment-`+time+`" data-load="p`+time+`">Send</button>
                                </div>
                                <div class="col-12 comment_reply mx-auto" id="p`+time+`">
                                    <div class="d-flex">
                                        <div class="p-2 position-relative">
                                            <p class="weight-semi-bold mb-1" id="comment-reply-name"></p>
                                            <p class="font-13 font-weight-light mb-1" id="comment-reply-text"></p>
                                            <p class="d-none" id="comment-reply-post-id"></p>
                                            <p class="d-none" id="comment-reply-comment-id"></p>
                                        </div>
                                        <div class="ml-auto mt-2">
                                            <a href="#" class="hide-comment"><i class="mdi mdi-close"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="px-4 row mt-3 post" style="overflow-y:auto;max-height: 280px" id="comment-`+time+`">

                            </div>
                        </div>
                    </div>
                </div>`)

                for (i = 0; i < up_file.length; i++) {
                    if(i==0){
                        $(".col-image#col-image-"+time).append(`
                            <div class="col-12 img-p`+time+` post-image" style="display:block;">
                                <a href="`+up_file[i].dataURL+`" data-lightbox="img-p`+time+`" class="content">
                                    <div class="content-overlay"></div>
                                    <img src="`+up_file[i].dataURL+`" class="img-fluid mt-2 comm-img" />
                                    <div class="content-details fadeIn-top">
                                        <h3>VIEW IMAGE</h3>
                                    </div>
                                </a>
                                
                            </div>`)
                    }
                    else{
                        $(".col-image#col-image-"+time).append(`
                            <div class="col-12 img-p`+time+` post-image">
                                <a href="`+up_file[i].dataURL+`" data-lightbox="img-p`+time+`" ><img class="img-fluid mt-2 comm-img" src="`+up_file[i].dataURL+`"></a>
                            </div>`)
                    }
                }

                $('html,body').animate({
                    scrollTop: $('.card-content').offset().top
                }, 1500);

            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/todos/',
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({"files":up_file,"media-text":$('#media-text').val()}),
                processData: false,
                success: function( data, textStatus, jQxhr ){
                    $('#response pre').html( JSON.stringify( data ) );
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });
        }else{
            $(".card-content").prepend(`
                <div class="card--dashboard mt-4" style="display: block;">

                    <div class="row mb-4">
                        <div class="col-md-12 my-2 pt-2">
                            <div class="px-4 row">
                                <div class="col-9 d-flex">
                                    <div class="mr-2">
                                        <img src="images/course_img.png" class="mt-1" />
                                    </div>
                                    <div class="info cursor" data-user='1'>
                                        <p class="font-weight-bold mb-0 font-14">Brandee Sanders</p>
                                        <p class="font-weight-light font-14">`+datetime+`</p>
                                    </div>
                                </div>
                            </div>

                            <div class="px-4">
                                <p class="font-14 font-weight-light">`+$('#media-text').val()+`</p>
                            </div>
                            <div class="row">
                                <div class="col col-image" id="col-image-`+time+`">
                                    
                                </div>
                            </div>

                            <div class="like-share row my-3 px-4">
                                <div class=" col text-left">
                                    <a class="like" data-user='1' data-post='`+time+`' data-id="`+time+`">
                                        <span class="icon" id="icon-`+time+`"><i class="fa fa-thumbs-up"></i></span>
                                        <span class="like-unlike" id="like-unlike-`+time+`">Like</span>
                                    </a>
                                </div>
                                <div class="share col text-left">
                                    <a class="share_link" data-post='`+time+`' data-user='1' data-id="`+time+`">
                                        <span><i class="fa fa-share"></i></span>
                                        <span>Share</span>
                                    </a>
                                </div>
                                <div class="like-share-value text-right">
                                    <span class="mr-1 fs-12 likes-val"><span class="num-likes" id="num-likes-`+time+`">0</span> <span class="text-likes">like</span></span>
                                    <span class="mr-1 fs-12 comments-val"><span class="num-comments" id="num-comment-`+time+`">0</span> <span class="text-comments">comment</span></span>
                                </div>
                            </div>

                            <hr>

                            <div class="px-4 row mt-3">
                                <div class="col-lg-12 col-12 d-flex">
                                    <img src="images/course_img.png" class="mt-1 mr-2" />
                                    <input type="text" placeholder="Add a comment" class="form-control mt-2 comment-text" id="input-comment-`+time+`" data-img="course_img.png" data-name="Kelvin Sam"/>
                                    <button class="btn btn-sm btn-green mt-2 comment-send" data-id="comment-`+time+`" data-load="p`+time+`">Send</button>
                                </div>
                                <div class="col-12 comment_reply mx-auto" id="p`+time+`">
                                    <div class="d-flex">
                                        <div class="p-2 position-relative">
                                            <p class="weight-semi-bold mb-1" id="comment-reply-name"></p>
                                            <p class="font-13 font-weight-light mb-1" id="comment-reply-text"></p>
                                            <p class="d-none" id="comment-reply-post-id"></p>
                                            <p class="d-none" id="comment-reply-comment-id"></p>
                                        </div>
                                        <div class="ml-auto mt-2">
                                            <a href="#" class="hide-comment"><i class="mdi mdi-close"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="px-4 row mt-3 post" style="overflow-y:auto;max-height: 280px" id="comment-`+time+`">

                            </div>
                        </div>
                    </div>
                </div>`)
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/todos/',
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({"media-text":$('#media-text').val()}),
                processData: false,
                success: function( data, textStatus, jQxhr ){
                    $('#response pre').html( JSON.stringify( data ) );
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });
        }
        
        $('#media-text').val("");
        $('#albums-modal').modal('hide');
        $('.backdrop.fade.in').remove();
        // $('#albums-modal').removeClass('show');
        modalUploader.removeAllFiles(true);
    });

    modalUploader.on("addedfile", function(file) {
        //Get the file count
        var count= modalUploader.files.length;
        // Hookup the start button
        file.previewElement.querySelector(".start").onclick = function() { modalUploader.enqueueFile(file); };
        //Set the new file count
        $('#modal-uploader-file-count').html(count);
    });

    modalUploader.on("removedfile", function(file) {
        //Get the file count
        var count= modalUploader.files.length;
        //Set the new file count
        $('#modal-uploader-file-count').html(count);
    });

    // Update the total progress bar
    modalUploader.on("totaluploadprogress", function(progress) {
        document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
    });

    modalUploader.on("sending", function(file) {
        // Show the total progress bar when upload starts
        document.querySelector("#total-progress").style.opacity = "1";
        // And disable the start button
        file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
    });

    // Hide the total progress bar when nothing's uploading anymore
    modalUploader.on("queuecomplete", function(progress) {
        document.querySelector("#total-progress").style.opacity = "0";
    });

    // Setup the buttons for all transfers
    // The "add files" button doesn't need to be setup because the config
    // `clickable` has already been specified.
    document.querySelector("#actions .start").onclick = function() {
        modalUploader.enqueueFiles(modalUploader.getFilesWithStatus(Dropzone.ADDED));
    };
    document.querySelector("#actions .cancel").onclick = function() {
        modalUploader.removeAllFiles(true);
    };

    

    // Now fake the file upload

    var minSteps = 6,
        maxSteps = 60,
        timeBetweenSteps = 100,
        bytesPerStep = 100000;

    modalUploader.uploadFiles = function(files) {
        var self = this;

        for (var i = 0; i < files.length; i++) {

            var file = files[i];
            var totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

            for (var step = 0; step < totalSteps; step++) {
                var duration = timeBetweenSteps * (step + 1);
                setTimeout(function(file, totalSteps, step) {
                    return function() {
                        file.upload = {
                            progress: 100 * (step + 1) / totalSteps,
                            total: file.size,
                            bytesSent: (step + 1) * file.size / totalSteps
                        };

                        self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
                        if (file.upload.progress == 100) {
                            file.status = Dropzone.SUCCESS;
                            self.emit("success", file, 'success', null);
                            self.emit("complete", file);
                            self.processQueue();
                        }
                    };
                }(file, totalSteps, step), duration);
            }
        }
    }

}


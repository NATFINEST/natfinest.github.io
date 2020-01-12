$('input[type="file"]').each(function() {
    // Refs
    var ava = $(".uk-border-circle.user-profile-tiny")
    var $file = $(this),
        $label = $file.next('label'),
        $labelText = $label.find('span'),
        labelDefault = $labelText.text();

    // When a new file is selected
    $file.on('change', function(event) {
        var fileName = $file.val().split('\\').pop(),
            tmppath = URL.createObjectURL(event.target.files[0]);
        var f = $file[0].files[0];

        //Check successfully selection
        if (fileName) {
            reader = new FileReader();

            reader.onloadend = function() {
                // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
                var b64 = reader.result;
                $label
                    .addClass('file-ok')
                    .css('background-image', 'url(' + tmppath + ')');
                $labelText.text(fileName);
                ava.attr('src', tmppath);
                $.ajax({
                    url: 'https://jsonplaceholder.typicode.com/todos/',
                    dataType: 'json',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "b64": b64
                    }),
                    processData: false,
                    success: function(data, textStatus, jQxhr) {
                        $('#response pre').html(JSON.stringify(data));
                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            };

            reader.readAsDataURL(f);

        } else {
            $label.removeClass('file-ok');
            $labelText.text(labelDefault);
        }
    });

    // End loop of file input elements
});

$('#profile').submit(function(e) {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos/',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "img": fileName
        }),
        processData: false,
        success: function(data, textStatus, jQxhr) {
            $('#response pre').html(JSON.stringify(data));
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
});
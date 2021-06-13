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
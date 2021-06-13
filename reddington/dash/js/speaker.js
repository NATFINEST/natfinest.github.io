$(document).ready(function(){
    $('.chat-conversation').hide();

    $('.about-speaker').on('click', function(e){
      e.preventDefault();
      name = $(this).attr('data-name');
      bio = $(this).attr('data-bio');
      $('.speaker-name').text('About ' + name);
      $('.speaker-bio').text(bio);
      $('#about-speaker').modal('show');
    })

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

    $('.select-cat').select2({
        placeholder: "Select Categories",
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

    })

    $('.edit-cat').select2({
        placeholder: "Select Categories",
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
})

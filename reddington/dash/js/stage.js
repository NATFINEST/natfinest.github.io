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

      $container.find(".select2-result-repository__title").text(repo.email);

      return $container;
    }

    function formatRepoSelection (repo) {
      return repo.email || repo.text;
    }

    $('.search-course').select2({
        placeholder: "Search Course List",
        // dropdownParent: $("#webinar"),
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
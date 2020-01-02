(function ($) {
  "use strict";
  // preloader
  $(window).load(function () {
    $('.preloader').fadeOut('slow');
  });

  // Meanmenu menu
  jQuery('#mobile-menu-active').meanmenu({
    meanMenuContainer: '.mobile-menu',
    meanScreenWidth: "768"
  });

  // main slider 
  function mainSlider() {
    var BasicSlider = $('.slider-active');
    BasicSlider.on('init', function (e, slick) {
      var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find(
        '[data-animation]');
      doAnimations($animatingElements);
    });
    BasicSlider.slick({
      dots: false,
      infinite: true,
      autoplay: true,
      fade: true,
      autoplaySpeed: 5000,
      prevArrow: '<button type="button" class="main slick-prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="main slick-next"><i class="fas fa-chevron-right"></i></button>',
      responsive: [{
          breakpoint: 1200,
          settings: {
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: false,
            fade: true,
            autoplaySpeed: 10000
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: false,
            fade: true,
            autoplaySpeed: 10000
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

    function doAnimations(elements) {
      var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
          'animation-delay': $animationDelay,
          '-webkit-animation-delay': $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();





  // course slider
  $('.course-slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [{
        breakpoint: 1200,
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // success slider
  $('.success-img').slick({
    dots: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i></button>',
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });


  // testimonial slider
  $('.testimonial-silder').slick({
    dots: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1500,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });


  // news slider
  $('.news-slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1200,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // brand slider
  $('.brand-slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          arrows: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // home-2
  // main slider 
  function mainSliderTwo() {
    var BasicSlider = $('.slider-active-2');
    BasicSlider.on('init', function (e, slick) {
      var $firstAnimatingElements = $('.single-slider-2:first-child').find('[data-animation]');
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $('.single-slider-2[data-slick-index="' + nextSlide + '"]').find(
        '[data-animation]');
      doAnimations($animatingElements);
    });
    BasicSlider.slick({
      arrows: false,
      dots: false,
      infinite: true,
      autoplay: false,
      fade: true,
      autoplaySpeed: 10000,
      responsive: [{
          breakpoint: 1200,
          settings: {
            arrows: false,
            dots: false,
            infinite: true,
            autoplay: false,
            fade: true,
            autoplaySpeed: 10000
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            dots: false,
            infinite: true,
            autoplay: false,
            fade: true,
            autoplaySpeed: 10000
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

    function doAnimations(elements) {
      var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
          'animation-delay': $animationDelay,
          '-webkit-animation-delay': $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSliderTwo();

  // home4
  // Latest Course slider
  $('.latest-course-4').slick({
    dots: false,
    infinite: false,
    autoplay: false,
    fade: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1500,
        settings: {
          arrows: false,
          dots: false,
          infinite: false,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 1350,
        settings: {
          arrows: true,
          dots: false,
          infinite: false,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 992,
        settings: {
          arrows: true,
          dots: false,
          infinite: false,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          arrows: true,
          dots: false,
          infinite: false,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  // Latest event slider
  $('.latest-event-h2').slick({
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1500,
        settings: {
          arrows: true,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 1350,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  //   Latest Events Slider
  $('.latest-events-4').slick({
    dots: false,
    infinite: true,
    autoplay: false,
    fade: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1500,
        settings: {
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  //   Team Slider Home PAge 4
  $('.team-slider-4-active').slick({
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: false,
    fade: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1500,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 1199.98,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // testimonial3-slider
  $('.testimonial3-slider').slick({
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1500,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 1199.98,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // home-3 js
  // home3-feature
  $('.home3-feature').slick({
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: false,
          infinite: false,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
          infinite: false,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // testimonial slider
  $('.h3-testimonial').slick({
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: true,
    fade: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1500,
        settings: {
          arrows: true,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 992,
        settings: {
          arrows: true,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: false,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  // home-3 js end

  // about us page
  // Journey Image slider
  $('.journey-img').slick({
    dots: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i></button>',
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });




  // About Features Slider
  $('.about-features-slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1200,
        settings: {
          arrows: false,
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 560,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  //  Event Details Slider
  $('.event-details-slider').slick({
    dots: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1400,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // Journey Image slider
  $('.product-info-slider-active').slick({
    dots: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
    infinite: true,
    autoplay: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          autoplay: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });


  //   Team Slider Home PAge 4
  $('.single-product-active').slick({
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    fade: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1500,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: true,
          fade: false,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 1199.98,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: true,
          fade: false,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: true,
          fade: false,
          speed: 300,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: true,
          fade: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  // aside info
  $('.info-bar').click(function(){
    $('.extra-info').addClass('info-open');
  })
  $('.close-icon').click(function(){
    $('.extra-info').removeClass('info-open');
  })


  // Course Selector
  $('select').niceSelect();


  new WOW().init();

  // Isotope Active
  var $grid = $('.gallery-4-active').isotope({
    itemSelector: '.grid-item',
  })

  //isotope button
  $('.gallery-menu-4').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({
      filter: filterValue
    });
  });

  //for menu active class
  $('.gallery-menu-4 button').on('click', function (event) {
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
    event.preventDefault();
  });

  $('.video-play-btn').magnificPopup({
    type: 'image'
  });

  // Home 2 Counter
  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });

  // modal video play
  $('.video-play-popup').magnificPopup({
    type:'iframe',
    iframe: {
      markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
              '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
    
      patterns: {
        youtube: {
          index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
    
          id: 'v=', // String that splits URL in a two parts, second part should be %id%
          // Or null - full URL will be returned
          // Or a function that should return %id%, for example:
          // id: function(url) { return 'parsed id'; }
    
          src: 'https://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: '//player.vimeo.com/video/%id%?autoplay=1'
        },
        gmaps: {
          index: '//maps.google.',
          src: '%id%&output=embed'
        }
    
        // you may add here more sources
    
      },
    
      srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
    }
  });


})(jQuery);
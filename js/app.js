$(function() {

/*---------------------------------------------

	01: Slider -> slider advantages /  slider certificates /  slider partners / slider cases
  02: Scroll to block
  03: Menu -> menu item active / menu open/close / open submenu
  04: Lazy load
  05: Popup -> popup 
  07: Map
  08: Load video
  09: Title animation
  10: Parallax
  11: Timer

  ----------------------------------------------*/

 /*============================================
  08: Load video
  ==============================================*/

  setTimeout(function() {

    $('video[data-src]').each(function(){

      let str = $(this).attr('data-src');

      let src = str.split('|')[0]; 
      let type = str.split('|')[1]; 
      $(this).append('<source>');

      $(this).find('source').attr('src', src).attr('type', type);
      $(this).removeAttr('data-src');
    });

  }, 2000);


 /*============================================
  09: Title animation
  ==============================================*/

  let animationDelay = 2500;

  animateHeadline($('.cd-headline'));

  function animateHeadline($headlines) {
    $headlines.each(function(){
      let headline = $(this);
      setTimeout(function(){ hideWord( headline.find('.is-visible') ) }, animationDelay);
    });
  }

  function hideWord($word) {
   let nextWord = takeNext($word);
   switchWord($word, nextWord);
   setTimeout(function(){ hideWord(nextWord) }, animationDelay);
 }

 function takeNext($word) {
   return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
 }

 function switchWord($oldWord, $newWord) {
   $oldWord.removeClass('is-visible').addClass('is-hidden');
   $newWord.removeClass('is-hidden').addClass('is-visible');
 }


   /*============================================
  10: Parallax
  ==============================================*/

  $(window).scroll(function(){
    let scroll = $(window).scrollTop();

    scroll *= -0.2;
    scroll = (scroll < -80) ? -80 : scroll;
    $('.s-main__bg-img').css('transform', 'translate(0, ' + scroll + 'px)');

    scroll *= 0.5;
    $('.s-main').css('background-position', 'center ' + scroll + 'px');
  });



  /*============================================
  11: Timer
  ==============================================*/
  $('.js-timer').each(function(){

    var time = $(this).data('time').split('-');
    var ts = new Date(time[0], time[1] - 1, time[2], time[3], time[4], time[5]); 

    $(this).countdown({
      timestamp : ts
    });

  });


  /*============================================
  01: Slider -> slider advantages /  slider certificates /  slider partners / slider cases
  //
  ==============================================*/
  let advantagesItemsLenght = $('.advantages-items__item').length;
  $('.advantages-items__item').each(function(i){
    $(this).attr('data-index', i)
  });

  // slider advantages
  $('.js-slider-advantages').slick({
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1, 
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: false,
    responsive: [
    {
      breakpoint: 991,
      settings: {
      }
    },
    {
      breakpoint: 767,
      settings: {
      }
    },
    {
      breakpoint: 575,
      settings: {
      }
    }
    ]
  });
  $('.js-slider-advantages').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    let sliderIndexNext = nextSlide;
    let sliderIndexNextNext = nextSlide + 1;
    let sliderIndexNextNextNext = sliderIndexNextNext + 1;
    let sliderIndexNextNextNextNext = sliderIndexNextNextNext + 1;
    let sliderIndexNextNextNextNextNext = sliderIndexNextNextNextNext + 1;

    if (sliderIndexNext > (advantagesItemsLenght - 2)) {
      sliderIndexNextNextNext = 1;
      sliderIndexNextNextNextNext = 2;
      sliderIndexNextNextNextNextNext = 3;
    }
    else if (sliderIndexNext > (advantagesItemsLenght - 3)) {
      sliderIndexNextNextNext = 0;
      sliderIndexNextNextNextNext = 1;
      sliderIndexNextNextNextNextNext = 2;
    }
    else if (sliderIndexNext > (advantagesItemsLenght - 4)) {
      sliderIndexNextNextNextNext = 0;
      sliderIndexNextNextNextNextNext = 1;
    }
    else if (sliderIndexNext > (advantagesItemsLenght - 5)) {
      sliderIndexNextNextNextNextNext = 0;
    }


    $('.advantages-items__item').removeClass('advantages-items__item_sm advantages-items__item_md advantages-items__item_lg');

    $('.advantages-items__item[data-index=' + (sliderIndexNext) + ']').addClass('advantages-items__item_sm');
    $('.advantages-items__item[data-index=' + (sliderIndexNextNext) + ']').addClass('advantages-items__item_md');
    $('.advantages-items__item[data-index=' + (sliderIndexNextNextNext) + ']').addClass('advantages-items__item_lg');
    $('.advantages-items__item[data-index=' + (sliderIndexNextNextNextNext) + ']').addClass('advantages-items__item_md');
    $('.advantages-items__item[data-index=' + (sliderIndexNextNextNextNextNext) + ']').addClass('advantages-items__item_sm');
  });

  // slider certificates
  $('.js-slider-certificates').slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1, 
    responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      }
    }
    ]
  });

  // slider partners
  $('.js-slider-partners').slick({
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1, 
    lazyLoad: 'ondemand',
    responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4, 
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      }
    }
    ]
  });

  // slider cases
  $('.js-slider-cases').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1, 
    lazyLoad: 'ondemand',
    responsive: [
    {
      breakpoint: 991,
      settings: {
      }
    },
    {
      breakpoint: 767,
      settings: {
        arrows: false,
      }
    },
    {
      breakpoint: 575,
      settings: {
        arrows: false,
      }
    }
    ]
  });


  /*============================================
    02: Scroll to block
    ==============================================*/

    $('body').on('click', '.js-scroll', function (e) {
      e.preventDefault();

    // upload all photos
    let imgDownload = false;
    $('img[data-src]').each(function(){
      $(this).attr('src', $(this).attr('data-src')).css('opacity', '1');
      $(this).removeAttr('data-src');
      imgDownload = true;
    });

    // scroll delay
    let delay = 0;
    if (imgDownload) delay = 500; 

    let ths = $(this);
    setTimeout(function() { 
      let id  = ths.attr('href');  if ((id=='#top') && ($(window).scrollTop() < 1)) return false;
      let top = $(id).offset().top - 60;
      $('body, html').animate({scrollTop: top}, 1500);
    }, delay);
  });


  /*============================================
    03: Menu -> menu item active / menu open/close / open submenu
    ==============================================*/

  // menu item active
  $(window).scroll(function(){
    let $sections = $('section, header');
    $sections.each(function(i,el){
      let top  = $(el).offset().top,
      bottom = top  + $(el).height(),
      scroll = $(window).scrollTop() + 100,
      id = $(el).attr('id');

      if (scroll > top && scroll < bottom){
        $('.menu__link.active').removeClass('active');
        $('.menu__link[href="#' + id + '"]').addClass('active');
      }
    })
  });

  // menu open/close
  $('body').on('click', '.js-menu-hamburger', function (e) {
    e.preventDefault();

    $('.menu-hamburger, .menu-overflow, .nav__mobile, .nav, .header').toggleClass('active');
  });

  // menu close
  $('body').on('click', '.nav__mobile a:not(.js-menu-sub), .js-nav-close, .js-menu-overflow', function (e) {
    $('.menu-hamburger, .menu-overflow, .nav__mobile, .menu__item_sub, .nav, .header').removeClass('active active-sub');
  });

  // open submenu
  $('body').on('click', '.js-menu-sub', function (e) {
    e.preventDefault();

    let itemActive = $(this).parents('.menu__item_sub').eq(0).hasClass('active');

    $('.nav').removeClass('active');
    $('.menu__item_sub').removeClass('active');

    if (!itemActive) {
      $(this).parents('.menu__item').eq(0).addClass('active');
      $(this).parents('.nav').eq(0).addClass('active');
    }

    if ($(this).parents('.nav__mobile').eq(0).hasClass('active')) $(this).parents('.nav').eq(0).addClass('active');

    if ($('.menu__item_sub.active').length == 0)
      $('.menu-overflow').removeClass('active-sub');
    else if ($(this).parents('.menu__item').hasClass('menu__item_sub'))
      $('.menu-overflow').addClass('active-sub');

  });


  /*============================================
    04: lazy load
    ==============================================*/

    $('img[data-src], section[data-src], .section[data-src], .js-img-lazy').Lazy();


  /*============================================
    05: Popup -> popup / popup youtube video
    ==============================================*/

  // popup
  $('.js-fancybox').fancybox({
    autoSize: true,
    padding: 0,
    fixed: false,
    penEffect: 'fade',
    closeEffect: 'fade',
    nextEffect: 'fade',
    prevEffect: 'fade',
    margin: [40, 20, 40, 20],
    autoCenter: false,
    beforeShow: function(){
    },
    afterhow: function(){
    },
    afterShow: function(){
      $('.popup .input.required').eq(0).focus();
    },
    afterClose: function() {
      $('.popup__video').html('');
      $('.popup .input_error').removeClass('input_error');
    }
  });


 });

  /*============================================
    07: Map
    ==============================================*/

//map loading after page loading
window.onload = function() { 
  jQuery.loadScript = function (url, callback) {
   jQuery.ajax({
     url: url,
     dataType: 'script',
     success: callback,
     async: true
   });
 }
 setTimeout(function() {

  if ($('.js-map').length <= 0) return false;

  if (typeof someObject == 'undefined') $.loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1', function(){
    ymaps.ready(function () {

      $('.js-map').each(function(){

        let map_id = $(this).attr('id'),

        width = $(window).width(),

        x_y_center = $(this).attr('data-x_y_center').split(','),
        x_center = x_y_center[0],
        y_center = x_y_center[1],

        x_y = $(this).attr('data-x_y').split('|'),

        x_y_center_offset = $(this).attr('data-x_y_center_offset').split(','),
        x_center_offset = x_y_center_offset[0],
        y_center_offset = x_y_center_offset[1];

        if (width < 768) {
          x_center_offset = 0;
          y_center_offset = 0;
        }

        let myMap = new ymaps.Map(map_id, {
          center: [x_center - x_center_offset, y_center - y_center_offset],
          zoom: 15
        });

        myMap.controls.remove('mapTools');
        myMap.controls.remove('typeSelector');
        myMap.controls.remove('scaleLine');
        myMap.controls.remove('searchControl');
        myMap.controls.remove('trafficControl');
        myMap.behaviors.disable('scrollZoom');

          if (width <= 991)  myMap.behaviors.disable('drag'); //for mobile disable scrolling

          for (let i = 0; i < x_y.length; i++) {

            let x1 = x_y[i].split(',');

            //marker
            myPlacemark = new ymaps.Placemark([x1[0], x1[1]], {
              hintContent: '',
              balloonContent: ''
            }, {
              iconLayout: 'default#image',
              iconImageHref: 'img/dest/icons/marker.svg',
              iconImageSize: [50, 50],
              iconImageOffset: [-25, -50]
            });

            myMap.geoObjects.add(myPlacemark);

          }

        });
    });
  });
}, 2500);
}
$(function (){
  console.log('init');


  
  $('.nav__toggler').click(function(e){
    var target = $(this).data('target');
    $(this).toggleClass('navbar-toggler--active');
    $('#'+target).toggleClass('nav--active');
  });

  $('.nav__item--parent').click(function(e){
    console.log('clicked');
    $(this).toggleClass('nav__item--active');
  });

  $('.search__toggler').click(function(e){
    console.log('search toggler');
    var target = $(this).data('target');
    $('#'+target).toggleClass('search--active');
    return false;
  });

  $('html').click(function() {
    $('.search--active').removeClass('search--active');
  });

  $('.search').click(function(e){
    return false;
  });
  
  $('.accordeon__preview').click(function(e){
    $(this).closest('.accordeon').toggleClass('accordeon--active');
  });

  $('.checkbox__label').click(function(e){
    $(this).closest('.accordeon').toggleClass('accordeon--active');
  });


  $('.im--phone').mask('+7 (000) 000-00-00');


  $('.input-group__input').change(function(e){
    $(this).toggleClass('used',$(this).val()!='');
  });1

  $('.tabs__link').click(function(e){
    var w_width = $(window).width();
    var target = $(this).data('target');
    if (w_width<788) {
      $(this).toggleClass('tabs__link--active');
      $('.tabs__body[data-name="'+target+'"]').toggleClass('tabs__body--active');
     } else {
      
      $('.tabs__link').removeClass('tabs__link--active');
      $(this).addClass('tabs__link--active');
      $('.tabs__body').removeClass('tabs__body--active');
      $('.tabs__body[data-name="'+target+'"]').addClass('tabs__body--active');
    }
  });


  if ($('.slider--images').length) {
    var slider_images = $('.slider--images .slider__list').slick({
      arrows:false,
      dots:true,
      dotsClass: 'slider__nav',
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 300
    });

    // On swipe event

    if ($('.slider-desc').length) {
      $('.slider--images').on('beforeChange', function(event, slick,  currentSlide, nextSlide){
        $('.slider-desc__item[data-id="'+currentSlide+'"]').removeClass('slider-desc__item--active');
        $('.slider-desc__item[data-id="'+nextSlide+'"]').addClass('slider-desc__item--active');
      });  
    }

    if ($('.slider-nav').length) {
      $('.slider-nav__item').click(function(e){
        var target = $(this).data('target');
        let slickObj = slider_images.slick('getSlick');
        slickObj.slickGoTo( parseInt(target) );
        
        $('.slider-nav__item').removeClass('slider-nav__item--active');
        $(this).addClass('slider-nav__item--active');
      });
    }
  }
  if ($('.slider--projects').length) {
    $('.slider--projects .projects').slick({
      arrows:false,
      
      dotsClass: 'slider__nav slider__nav--dark',
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2, slidesToScroll: 1,dots:false,arrows:true,
            prevArrow: '<span class="slider__arrow slider__arrow--big slider__arrow--prev"></span>',
            nextArrow: '<span class="slider__arrow slider__arrow--big slider__arrow--next"></span>',
          }
        },
        {
          breakpoint: 768,
          settings: {slidesToShow: 1, slidesToScroll: 1,dots:true,}
        },

      ]
    });
  }

  if ($('.slider--clients').length) {
    $('.slider--clients .slider__list').slick({
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      
      prevArrow: '<span class="slider__arrow slider__arrow--prev"></span>',
      nextArrow: '<span class="slider__arrow slider__arrow--next"></span>',

      responsive: [
        {
          breakpoint: 1024,
          settings: {slidesToShow: 1,slidesToScroll: 1,infinite: true,}
        },
        {
          breakpoint: 480,
          settings: {slidesToShow: 1,slidesToScroll: 1}
        }
      ]
    });
  }

  if ($('.main-slider').length) {
    $('.main-slider .slider-nav__item').click(function(e){
      var target  = $(this).data('target');
      $('.main-slider .slider-nav__item').removeClass('slider-nav__item--active');
      $(this).addClass('slider-nav__item--active');

      $('.main-slider__slide').removeClass('main-slider__slide--active');
      $('.main-slider__slide[data-id="'+target+'"]').addClass('main-slider__slide--active');

      
    });
    
  }


  $('.type-filter__item').click(function(e){
    $('.type-filter__item').removeClass('type-filter__item--active');
    $(this).addClass('type-filter__item--active');
    return false;
  });
  
  if ($('.main__clipper').length) {
    
    baron({
        root: '.clipper-1',
        scroller: '.scroller-1',
        bar: '.bar-1',
        scrollingCls: '_scrolling',
        draggingCls: '_dragging',
        direction: 'h'
    });

    baron({
        root: '.clipper-2',
        scroller: '.scroller-2',
        bar: '.bar-2',
        scrollingCls: '_scrolling',
        draggingCls: '_dragging',
        direction: 'h'
    });


    
    $('.clipper-1').css('max-height',$('.clipper-1').height()-25);
    $('.clipper-2').css('max-height',$('.clipper-2').height()-25);

    $(".scroller-1").scroll(function() {
      $(".scroller-2").scrollLeft($(".scroller-1").scrollLeft());
    });
    $(".scroller-2").scroll(function() {
      $(".scroller-1").scrollLeft($(".scroller-2").scrollLeft());
    });
  }


  if ($('#price-slider').length) {
    var min = $('#min-price'); 
    var max = $('#max-price'); 
    var minVal = 0; 
    var maxVal = 3000; 
    var start = 400;
    var end = 1500;
    var step = 1; 
    
    var slider = $("#price-slider").noUiSlider({
      start: [500, 1000],
      range: {
        'min': minVal,
        'max': maxVal
      },

      connect: true,
      step: step,
    });



    function updatePips( value, type ){

        switch(true)   {
            case (value > 300):
             //   value = "More"
                break;       
        }
        return value;
    }

    slider.noUiSlider_pips({
      mode: 'values',
      density: 5,
      values: [0,600,1200,1800,2400,3000,],
      stepped: true,
        
    });

    
    setTimeout(function(){
      slider.Link('lower').to(min);
      slider.Link('upper').to(max);
    },400);
  }
});

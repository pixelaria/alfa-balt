function add_to_compare(id){
    console.log("add_to_compare "+id);
    var chek = document.getElementById('compare_'+id);
    
    var chek = $('#compare_'+id);
    if (!chek.prop("checked")){ //Добавить 
        console.log('выбрали');
        var count = $('#compareCount').html() * 1 + 1;
        $('#compareCount').html(count);     
        
        console.log("/ajax/compare.php?action=ADD_TO_COMPARE_LIST&id="+id);

        $.ajax({
            url: "/ajax/compare.php?action=ADD_TO_COMPARE_LIST&id="+id, 
            success: function(result){
              console.log(result);
              //$("#flbl").html(result);
              
              if ($('.js-compare-products-carousel').length) {
                  $('.js-compare-products-carousel .block-line').slick({
                      slidesToShow: 5,
                      slidesToScroll: 1,
                      arrows: true,
                      dots: false,
                      infinite: true,
                      responsive: [
                          {
                              breakpoint: 1024,
                              settings: {
                                  slidesToShow: 3
                              }
                          },
                          {
                              breakpoint: 769,
                              settings: {
                                  slidesToShow: 1
                              }
                          }
                      ]
                  });
              }
            }
        });
    }else{//Удалить  
        console.log('сняли');
        var count = $('#compareCount').html() * 1 - 1;
        $('#compareCount').html(count); 

        console.log("/ajax/compare.php?action=DELETE_FROM_COMPARE_LIST&id="+id);
        $.ajax({
            url: "/ajax/compare.php?action=DELETE_FROM_COMPARE_LIST&id="+id, 
            success: function(result){
              //$("#flbl").html(result);
              if ($('.js-compare-products-carousel').length) {
                  $('.js-compare-products-carousel .block-line').slick({
                      slidesToShow: 5,
                      slidesToScroll: 1,
                      arrows: true,
                      dots: false,
                      infinite: true,
                      responsive: [
                          {
                              breakpoint: 1024,
                              settings: {
                                  slidesToShow: 3
                              }
                          },
                          {
                              breakpoint: 769,
                              settings: {
                                  slidesToShow: 1
                              }
                          }
                      ]
                  });
              }
            }
        });    
    }
    
    $('.footer-compare').addClass('footer-compare--active');
}

function onLoadjqm(hash){
  var name = $(hash.t).data('name');

  if($(hash.t).data('autohide')){
    $(hash.w).data('autohide', $(hash.t).data('autohide'));
  }

  if(name == 'callprice'){
    console.log('callprice');
    if($(hash.t).data('product')) {
      var product = $(hash.t).data('product');
      console.log(product);
      var type = $(hash.t).data('product-type');
      if(type) {
        product = product + ' (' + type + ')'; 
        console.log(product);
      }
      $('input[name="PRODUCT"]').val(product);
      $('input[name="PRODUCT"]').parent().hide();

      console.log( $('input[name="PRODUCT"]').val());
    }

    if($(hash.t).data('title')) {
      $('span.title').html($(hash.t).data('title'));
    }

    if($(hash.t).data('product-type')) {
      $('.popup__body').prepend('<hr style="margin-bottom:30px;"/>');
      $('.popup__body').prepend('<p class="popup__info">Исполнение: <span>'+$(hash.t).data('product-type')+'</span></p>');
      $('.popup__body').prepend('<p class="popup__info popup__info--full">'+$(hash.t).data('product')+'</p>');
    }
  }
}

function onHide(hash){
  if($(hash.w).data('autohide')){
    eval($(hash.w).data('autohide'));
  }
  hash.w.empty();
  hash.o.remove();
  hash.w.removeClass('show');
}

$.fn.jqmEx = function(){
  
  $(this).each(function(){
    var _this = $(this);
    var name = _this.data('name');

    if(name.length){
      var script = '/bitrix/components/pixelaria/form/ajax/form.php';
      var paramsStr = ''; var trigger = ''; var arTriggerAttrs = {};
      
      $.each(_this.get(0).attributes, function(index, attr){
        var attrName = attr.nodeName;
        var attrValue = _this.attr(attrName);
        trigger += '[' + attrName + '=\"' + attrValue + '\"]';
        arTriggerAttrs[attrName] = attrValue;
        if(/^data\-param\-(.+)$/.test(attrName)){
          var key = attrName.match(/^data\-param\-(.+)$/)[1];
          paramsStr += key + '=' + attrValue + '&';
        }
      });
      
      var triggerAttrs = JSON.stringify(arTriggerAttrs);
      var encTriggerAttrs = encodeURIComponent(triggerAttrs);
      script += '?' + paramsStr + 'data-trigger=' + encTriggerAttrs;
      
      if(!$('.' + name + '_frame[data-trigger="' + encTriggerAttrs + '"]').length){
        if(_this.attr('disabled') != 'disabled'){
          $('body').find('.' + name + '_frame[data-trigger="' + encTriggerAttrs + '"]').remove();
          $('body').append('<div class="' + name + '_frame jqmWindow" style="width:500px" data-trigger="' + encTriggerAttrs + '"></div>');
          
          $('.' + name + '_frame[data-trigger="' + encTriggerAttrs + '"]').jqm({
            trigger: trigger, 
            onLoad: function(hash){
              onLoadjqm(hash);
            }, 
            onHide: function(hash){
              onHide(hash);
            },
            ajax:script,
          });
        }
      }
    }
  })
}
  

$(function (){
  console.log('init');

  $('main').append('<div class="scroll-to-top"></div>');


  $('body').delegate('*[data-event="jqm"]','click', function(e){
    console.log('jqmEx');
    e.preventDefault();
    
    $(this).jqmEx();
    $(this).trigger('click');
  });

  $(window).scroll(function(){
    var header = $('.header'),
        main = $('main'),
        scroll = $(window).scrollTop();

    if (scroll >= 145) {
      header.addClass('header--fixed');
      main.addClass('main--fixed');
    } else {
      header.removeClass('header--fixed');
      main.removeClass('main--fixed');
    }

    if (scroll >= 245) header.addClass('header--top');
    else header.removeClass('header--top');



    if (scroll >= 300) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }

  });

  $('.scroll-to-top').click(function () {
      $('body,html').animate({
          scrollTop: 0
      }, 400);
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


    
    //$('.clipper-1').css('max-height',$('.clipper-1').height()-25);
    //$('.clipper-2').css('max-height',$('.clipper-2').height()-25);

    $(".scroller-1").scroll(function() {
      $(".scroller-2").scrollLeft($(".scroller-1").scrollLeft());
    });
    $(".scroller-2").scroll(function() {
      $(".scroller-1").scrollLeft($(".scroller-2").scrollLeft());
    });
  }


  
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
    $('#'+target).find('.search__input').focus();
    return false;
  });

  $('.search__submit').click(function(e){
    var form = $(this).closest('form');
    form.submit();
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
  });

  $('.tabs__link').click(function(e){
    var w_width = $(window).width();
    var target = $(this).data('target');
    //if (w_width<788) {
     // $(this).toggleClass('tabs__link--active');
      //$('.tabs__body[data-name="'+target+'"]').toggleClass('tabs__body--active');
     //} else {
      
      $('.tabs__link').removeClass('tabs__link--active');
      $(this).addClass('tabs__link--active');
      $('.tabs__body').removeClass('tabs__body--active');
      $('.tabs__body[data-name="'+target+'"]').addClass('tabs__body--active');
    //}
  });



  $('.product-types__type').click(function(e){
    var type = $(this).data('type');
    $('.product-types__type').removeClass('product-types__type--active');
    $(this).addClass('product-types__type--active');

    $('#product__btn').data('product-type',type);

  });

  if ($('.slider--images').length) {
    var slider_images = $('.slider--images .slider__list').slick({
      arrows:false,
      dots:true,
      dotsClass: 'slider__nav',
      autoplay: true,
      autoplaySpeed: 2500,
      speed: 500
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

      $('.slider--images').on('beforeChange', function(event, slick,  currentSlide, nextSlide){
        $('.slider-nav__item').removeClass('slider-nav__item--active');
        $('.slider-nav__item[data-target="'+nextSlide+'"]').addClass('slider-nav__item--active');
      });
    }
  }

  if ($('.slider--projects').length) {
    $('.slider--projects .projects').slick({
      arrows:true,
      prevArrow: '<span class="slider__arrow slider__arrow--big slider__arrow--prev"></span>',
      nextArrow: '<span class="slider__arrow slider__arrow--big slider__arrow--next"></span>',
      
      dotsClass: 'slider__nav slider__nav--dark',
      slidesToShow: 3,
      //autoplay: true,
      autoplaySpeed: 2500,
      infinite: true,
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
          settings: {slidesToShow: 1, slidesToScroll: 1,dots:true,arrows:false,}
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
      autoplaySpeed: 2500,
      
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

  if ($('.slider--news').length) {
    $('.slider--news').slick({
      infinite: true,
      
      autoplay: false,
      autoplaySpeed: 2500,
      dots:true,
      arrows:false,
      dotsClass: 'slider__nav',


      responsive: [
        {
          breakpoint: 99999,
          settings: "unslick"
        },
        {
          breakpoint: 768,
          settings: {slidesToShow: 1,slidesToScroll: 1}
          
        }
    ]
    });
  }

  if ($('.main-slider').length) {
    var current = 0;  // STARTING SLIDE(<li>element button) INDEX
    var slN = $('.main-slider-nav__item').length; // get number of slides(buttons.. all the same)

    function auto(){
      intv = setInterval(function() {
        $('.main-slider-nav__item').eq( current++%slN  ).click();
      }, 5000 );       
    }
    auto(); // to start immediately auto-slide

    // PAUSE ON MOUSEOVER

    $('.main-slider').on('mouseenter mouseleave', function( e ){
        var onMouEnt = e.type=='mouseenter' ? clearInterval(intv) : auto() ;
    });


    $('.main-slider-nav__item').click(function(e){
      var target  = $(this).data('target');
      
      $('.main-slider-nav__item').removeClass('main-slider-nav__item--active');
      $('.main-slider-nav__item[data-target="'+target+'"]').addClass('main-slider-nav__item--active');

      $('.main-slider__slide').removeClass('main-slider__slide--active');
      $('.main-slider__slide[data-id="'+target+'"]').addClass('main-slider__slide--active');

    });
    
  }


  $('.link--readmore').click(function(e){
    console.log('readmore');
    var target = $(this).data('target');
    $('#'+target).toggleClass('section__readmore--active');
    
    $(this).hide();
    
    return false;
  });

  $('.link--less').click(function(e){
    console.log('less');
    var target = $(this).data('target');
    $('#'+target).removeClass('section__readmore--active');
    
    $('.link--readmore').show();
    return false;
    
  });

  if ($('.product__image').length) {
    $('.product__image--main').slick({
      arrows:false,
      dots:false,
      
      autoplay: false,
      variableWidth: true,
      centerMode: true,
      speed: 500
    });

    $('.product__image').click(function(e){
      console.log('product__image');
      var target = $(this).data('target');
      if (target) {
        $('.product__img--active').removeClass('product__img--active');
        $('.product__img[data-id="'+target+'"]').addClass('product__img--active');  
      }
    });
    
  }
  if ($('.slider--projects-single').length) {
    $('.slider--projects-single .projects').slick({
      arrows:true,
      prevArrow: '<span class="slider__arrow slider__arrow--big slider__arrow--prev"></span>',
      nextArrow: '<span class="slider__arrow slider__arrow--big slider__arrow--next"></span>',
      dots:false,
      
      slidesToShow: 1,
      slidesToScroll: 1,
      
      
      infinite: true
      
    });
  }
});

function init() {
  
}

init();
BX.addCustomEvent('onAjaxSuccess', init); 
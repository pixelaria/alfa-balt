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
    var target = $(this).data('target');

    $('.tabs__link').removeClass('tabs__link--active');

    $(this).addClass('tabs__link--active');
    

    $('.tabs__body').removeClass('tabs__body--active');
    $('.tabs__body[data-name="'+target+'"]').addClass('tabs__body--active');
  });


  if ($('.slider').length) {
    var slider = $('.slider').unslider({ 
      nav: true,
      autoplay: false, 
      arrows: false,
      speed: 1000
        
    });

    slider.on('unslider.change', function(event, index, slide) {
      var target = $('.slider__item.unslider-active').data('target');
      console.log(target);
      $('.slider-desc__item').removeClass('slider-desc__item--active');
      $('.slider-desc__item[data-id="'+target+'"]').addClass('slider-desc__item--active');
    });
  }

  
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
    /*baron({
        root: '.baron',
        scroller: '.baron__scroller',
        bar: '.baron__bar',
        scrollingCls: '_scrolling',
        draggingCls: '_dragging',
        direction: 'h'
    }).fix({
        elements: '.header__title',
        outside: 'header__title_state_fixed',
        before: 'header__title_position_top',
        after: 'header__title_position_bottom',
        clickable: true
    }).controls({
        // Element to be used as interactive track. Note: it could be different from 'track' param of baron.
        track: '.baron__track',
        forward: '.baron__down',
        backward: '.baron__up'
    });*/
  }

});

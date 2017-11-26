$(function (){
  console.log('init');

  $('.search__toggler').click(function(e){
    console.log('search toggler');
    var target = $(this).data('target');
    $('#'+target).toggleClass('search--active');
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

});

import $ from 'jquery';

export const toggleInfo = () => {
  $('.info-container').hide()
  $('.note-container').hide()

  //toggle more information when clicking the "more info" icon
  $('.checklist-item__expand').on('click', function () {
    $(this).parent().parent().parent().find('.info-container').slideToggle('slow');
    $(this).find('.line').toggleClass('active');
  });

  //also toggle more info when clicking the step title
  $('.checklist-item__title').on('click', function () {
    $(this).parent().parent().find('.info-container').slideToggle('slow');
    $(this).parent().parent().find('.line').toggleClass('active');
  });

  //toggle notes section when clicking the "note" icon
  $('.checklist-note__expand').on('click', function () {
    $(this).parent().parent().parent().find('.note-container').slideToggle('fast');
    $(this).find('.svg-note-icon').toggleClass('active');
  });

  // add the 'hovering' class to the info-expander on hover 
  // (The hover effect can't be done in pure CSS or JQuery because the
  // icon is made up of nested items that use pseudo classes.)
  $(function () {
    $('.checklist-item__expand').hover(function () {
      $(this).find('.line').toggleClass('hovering');
    }, function () {
      $(this).find('.line').toggleClass('hovering');
    })
  })
}

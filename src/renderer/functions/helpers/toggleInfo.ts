import $ from 'jquery';

export const toggleInfo = () => {
  $('.info-container').hide()
  $('.note-container').hide()

  //toggle more information when clicking the "more info" icon
  $('.checklist-item__expand').on('click', function () {
    if (!$(this).parent().parent().parent().find('.info-container').is(':animated')) {
      $(this).parent().parent().parent().find('.info-container').slideToggle('slow');
      $(this).find('.line').toggleClass('active');
    } 
  });

  //also toggle more info when clicking the step title
  $('.checklist-item__title').on('click', function () {
    if (!$(this).parent().parent().find('.info-container').is(':animated')) {
      $(this).parent().parent().find('.info-container').slideToggle('slow');
      $(this).parent().parent().find('.line').toggleClass('active');
    }
  });

  //also toggle more info when clicking the collapse bar
  $('.info-collapse-bar').on('click', function () {
    if (!$(this).parent().find('.info-container').is(':animated')) {
      $(this).parent().parent().find('.info-container').slideToggle('slow');
      $(this).parent().parent().find('.line').toggleClass('active');
      $('#main-content').animate({
        scrollTop: ($('#main-content').scrollTop() + $(this).parent().parent().position().top)
      }, 500)
    }
  });

  //toggle notes section when clicking the "note" icon
  $('.checklist-note__expand').on('click', function () {
    if (!$(this).parent().parent().parent().find('.note-container').is(':animated')) {
      $(this).parent().parent().parent().find('.note-container').slideToggle('fast');
      $(this).find('.svg-note-icon').toggleClass('active');
    }
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

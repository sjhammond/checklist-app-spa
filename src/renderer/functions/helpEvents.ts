import $ from 'jquery'
import { includeHTML } from './helpers/includeHtml';

export const loadHelpEvents = () => {

    $('.help-content').hide()
    includeHTML();

    //toggle more information when clicking the "more info" icon
    $('.checklist-item__expand').on('click', function () {
        $(this).parent().parent().find('.help-content').slideToggle('slow');
        $(this).find('.line').toggleClass('active');
    });

    //also toggle more info when clicking the step title
    $('.help-topic__title').on('click', function () {
        $(this).parent().parent().find('.help-content').slideToggle('slow');
        $(this).parent().parent().find('.line').toggleClass('active');
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
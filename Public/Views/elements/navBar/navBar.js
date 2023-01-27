var sidebar = $('.sidebar');
var header = $('.header');
var button = $('.header > button');
var item_list = $('.item_list');
var li = $('.item_list > li');
var a = $('.item_list > li > a');
var i = $('.item_list > li > a > i');
var span = $('.item_list > li > a > span');

button.on('click', function(){
    if(sidebar.hasClass('open')){
        sidebar.removeClass('open');
        header.removeClass('open');
        button.removeClass('open');
        item_list.removeClass('open');
        li.removeClass('open');
        a.removeClass('open');
        i.removeClass('open');
        span.removeClass('open');
    }else{
        sidebar.addClass('open');
        header.addClass('open');
        button.addClass('open');
        item_list.addClass('open');
        li.addClass('open');
        a.addClass('open');
        i.addClass('open');
        span.addClass('open');
    }
})
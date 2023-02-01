// require('Jquery');
var movement = $('.movementContainer');
var product = $('.productContainer');
var sale = $('.saleContainer');
var client = $('.clientContainer');

$('.movementView').on('click', function(){
    movement.removeClass('close');
    product.removeClass('open');
    sale.removeClass('open');
    client.removeClass('open');
})

$('.productsView').on('click', function(){
    movement.addClass('close');
    product.addClass('open');
    sale.removeClass('open');
    client.removeClass('open');
})

$('.saleView').on('click', function(){
    movement.addClass('close');
    product.removeClass('open');
    sale.addClass('open');
    client.removeClass('open');
})

$('.clientView').on('click', function(){
    movement.addClass('close');
    product.removeClass('open');
    sale.removeClass('open');
    client.addClass('open');
})
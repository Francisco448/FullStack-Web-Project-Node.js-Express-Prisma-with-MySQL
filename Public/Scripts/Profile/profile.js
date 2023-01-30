// require('Jquery');

$('.productsView').on('click', function(){
    $('.productContainer').removeClass('hidden');
    $('.movementContainer').removeClass('show');
    $('.clientContainer').removeClass('show');
    $('.saleContainer').removeClass('show');
})

$('.movementView').on('click', function(){
    $('.productContainer').addClass('hidden');
    $('.saleContainer').removeClass('show');
    $('.clientContainer').removeClass('show');
    $('.movementContainer').addClass('show');
})

$('.clientView').on('click', function(){
    $('.productContainer').addClass('hidden');
    $('.movementContainer').removeClass('show');
    $('.saleContainer').removeClass('show');
    $('.clientContainer').addClass('show');
})

$('.saleView').on('click', function(){
    $('.productContainer').addClass('hidden');
    $('.movementContainer').removeClass('show');
    $('.clientContainer').removeClass('show');
    $('.saleContainer').addClass('show');
})
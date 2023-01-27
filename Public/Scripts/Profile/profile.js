// require('Jquery');

$('.productsView').on('click', function(){
    $('.productContainer').removeClass('hidden');
    $('.movementContainer').removeClass('show');
})

$('.movementView').on('click', function(){
    $('.productContainer').addClass('hidden');
    $('.movementContainer').addClass('show');
})
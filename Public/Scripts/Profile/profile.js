var Name = $('.Name');
var BuyCost = $('.BuyCost');
var SalePrice = $('.SalePrice');
var inputProduct = $('#inputProduct');

// Validations------------------------------------------------------------------------
function valid() {
    isValid = false;
    if (Name.val() != "" && BuyCost.val() != "" && SalePrice.val() != null) {
        isValid = true;
    } else {
        isValid = false;
    }
    return isValid;
}

function inputValid(){
    if(Name.val() == ""){
        Name.css('border', '1px solid red');
    }else{
        Name.css('border', 'none');
    }
    if(BuyCost.val() == ""){
        BuyCost.css('border', '1px solid red');;
    }else{
        BuyCost.css('border', 'none');
    }
    if(SalePrice.val() == ""){
        SalePrice.css('border', '1px solid red');;
    }else{
        SalePrice.css('border', 'none');
    }
}

// Datatable-------------------------------------------------------------------------------------------------
$(document).ready(function () {
    $('#DataGridView').DataTable({
        "ajax": {
            "url": "/Products",
            "type": "POST",
            "columns": [
                { "data": "Id" },
                { "data": "Name" },
                { "data": "BuyCost" },
                { "data": "SalePrice" }
            ]
        },
        "paging": false,
        "scrollY": 400,
        "ordering": false,
        "select": true,
        "search": true
    });
});

// CRUD---------------------------------------------------------------------------------------------------------------------------------------
$('.logout').on('click', function () {
    $.ajax({
        url: '/singout',
        method: 'POST',
        success: function (result) {
            if (result == true) {
                location.href = location.protocol + '//' + location.host + '/signin'
            }
        }
    })
})

$('.Add').on('click', function () {
    if(valid()){
        $.ajax({
            url: 'addProduct',
            method: 'POST',
            data: {
                Name: $('.Name').val(),
                BuyCost: $('.BuyCost').val(),
                SalePrice: $('.SalePrice').val()
            },
            success: function (result) {
                console.log(result);
                $('#DataGridView').DataTable().ajax().reload();
            }
        })
    }else{
        inputValid();
    }
})



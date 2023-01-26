var Name = $('.Name');
var BuyCost = $('.BuyCost');
var SalePrice = $('.SalePrice');
var Units = $('.Units');

// Validations------------------------------------------------------------------------
function valid() {
    isValid = false;
    if (Name.val() != "" && BuyCost.val() != "" && SalePrice.val() != null && Units.val()) {
        isValid = true;
    } else {
        isValid = false;
    }
    return isValid;
}

function inputValid() {
    if (Name.val() == "") {
        Name.css('border', '1px solid red');
    } else {
        Name.css('border', 'none');
    }
    if (BuyCost.val() == "") {
        BuyCost.css('border', '1px solid red');;
    } else {
        BuyCost.css('border', 'none');
    }
    if (SalePrice.val() == "") {
        SalePrice.css('border', '1px solid red');;
    } else {
        SalePrice.css('border', 'none');
    }
    if (Units.val() == "") {
        Units.css('border', '1px solid red');;
    } else {
        Units.css('border', 'none');
    }
}

// Datatable-------------------------------------------------------------------------------------------------
$(document).ready(function () {
    $('#DataGridView').DataTable({
        "ajax": {
            "url": "/Products",
            "dataSrc": ""
        },
        "scrollY": true,
        "responsive": true,
        "scrollCollapse": true,
        "columns": [
            { "data": "Id" },
            { "data": "Name" },
            { "data": "BuyCost" },
            { "data": "SalePrice" },
            { "data": "Units" }
        ],
        "paging": false,
    });

    $('#DataGridView tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $('#DataGridView').DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $('#DataGridView tbody').on('dblclick', 'tr', function () {
        Name.val($('#DataGridView').DataTable().row(this).data().Name)
        BuyCost.val($('#DataGridView').DataTable().row(this).data().BuyCost)
        SalePrice.val($('#DataGridView').DataTable().row(this).data().SalePrice)
        Units.val($('#DataGridView').DataTable().row(this).data().Units)
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
    if (valid()) {
        $.ajax({
            url: '/addProduct',
            method: 'POST',
            data: {
                Name: Name.val(),
                BuyCost: BuyCost.val(),
                SalePrice: SalePrice.val(),
                Units: Units.val()
            },
            success: function (result) {
                if (result == true) {
                    $('#DataGridView').DataTable().ajax.reload();
                    Name.val("");
                    BuyCost.val("");
                    SalePrice.val("");
                    Units.val("");
                }
            }
        })
    } else {
        inputValid();
    }
})


$('.Edit').on('click', function () {
    const Id = $('#DataGridView').DataTable().row('tr.selected').data().Id;    
    if (valid()) {
        $.ajax({
            url: '/editProduct/' + Id,
            method: 'POST',
            data: {
                Name: Name.val(),
                BuyCost: BuyCost.val(),
                SalePrice: SalePrice.val(),
                Units: Units.val()
            },
            success: function (result) {
                if (result == true) {
                    $('#DataGridView').DataTable().ajax.reload();
                    Name.val("");
                    BuyCost.val("");
                    SalePrice.val("");
                    Units.val("");
                }
            }
        })
    } else {
        inputValid();
    }
})
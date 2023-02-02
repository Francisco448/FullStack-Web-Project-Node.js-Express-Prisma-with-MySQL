var dataTableStock = $('#DataGridStock');
var dataTableSale = $('#DataGridSale');

$(document).ready(function () {
    $('#DataGridStock').DataTable({
        "ajax": {
            "url": "/getProducts",
            "dataSrc": ""
        },
        "columns": [
            { "data": "Id" },
            { "data": "Name" },
            { "data": "SalePrice" },
            { "data": "Units" }
        ],
        "paging": false,
    });
    $('#DataGridStock tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            dataTableStock.DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $('.addProduct').on('click', function () {
        if (dataTableStock.DataTable().row('tr.selected').data() != undefined) {
            dataTableSale.DataTable().row.add({
                "Name": dataTableStock.DataTable().row('tr.selected').data().Name,
                "SalePrice": dataTableStock.DataTable().row('tr.selected').data().SalePrice,
                "Units": $('#addUnits').val()
            }).draw(false);
        }
    })
});
// require('Jquery');
$(document).ready(function () {
    $('#DataGridSale').DataTable({
        "columns": [
            { "data": "Name", "name": "Name", "autoWidth": true },
            { "data": "SalePrice", "name": "SalePrice", "autoWidth": true },
            { "data": "Units", "name": "Units", "autoWidth": true }
        ],
        "columnDefs": [{
            "defaultContent": "-",
            "targets": "_all"
        }],
        "paging": false,
    });
    $('#DataGridSale tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            dataTableSale.DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $('#Process').on('click', function () {
        var newSale = [];
        for (i = 0; i < $('#DataGridSale').DataTable().column(0).data().count(); i++) {
            var sale = {
                Name: $('#DataGridSale').DataTable().rows().data()[i].Name,
                SalePrice: $('#DataGridSale').DataTable().rows().data()[i].SalePrice,
                Units: $('#DataGridSale').DataTable().rows().data()[i].Units,
            }
            newSale.push(sale);
        }
        $.ajax({
            url: '/addSale',
            method: 'post',
            dataType: 'JSON',
            traditional: true,
            data: { newSale: JSON.stringify(newSale) },
            success: function (result) {
                console.log(result);
            }
        })
    })
});


var dataTableStock = $('#DataGridStock');
var dataTableSale = $('#DataGridSale');
var selectClient = $('.selectClient');

// require('Jquery');
$.ajax({
    url: '/getClients',
    method: 'get',
    success: function (raw) {
        var options;
        for (i = 0; i < raw.length; i++) {
            options += "<option value='" + raw[i].Id + "'>" + raw[i].FirstName + ' ' + raw[i].LastName + "</option>";
        }
        selectClient.append(options);
    }
})

$.ajax({
    url: '/getCapital',
    method: 'get',
    success: function (raw) {
        $('.capitalValue').text('$ ' + raw.Capital + ' is your capital');
    }
})

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
        var Id = dataTableStock.DataTable().row('tr.selected').data().Id;
        var Name = dataTableStock.DataTable().row('tr.selected').data().Name;
        var SalePrice = dataTableStock.DataTable().row('tr.selected').data().SalePrice;
        var UnitTable = dataTableStock.DataTable().cell('tr.selected > td:eq(3)');
        var Units = $('#addUnits').val();
        if (dataTableStock.DataTable().row('tr.selected').data() != undefined) {
            if (UnitTable.data() > 0 && Units < UnitTable.data()) {
                dataTableSale.DataTable().row.add({
                    "Id": Id,
                    "Name": Name,
                    "SalePrice": SalePrice,
                    "Units": Units
                }).draw(false);
                var newUnits = parseInt(UnitTable.data() - Units);
                UnitTable.data(newUnits)
            }else if(UnitTable.data() > 0 && Units > UnitTable.data()){
                dataTableSale.DataTable().row.add({
                    "Id": Id,
                    "Name": Name,
                    "SalePrice": SalePrice,
                    "Units": UnitTable.data()
                }).draw(false);
                var newUnits = parseInt(UnitTable.data() - Units);
                UnitTable.data('0')
            }
        }else if(UnitTable.data() == 0){
            event.preventDefault();
        }
    })
});

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    $('#DataGridSale').DataTable({
        "columns": [
            { "data": "Id", "name": "Id", "autoWidth": true },
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
                IdProduct: $('#DataGridSale').DataTable().rows().data()[i].Id,
                IdClient: parseInt(selectClient.val()),
                SalePrice: $('#DataGridSale').DataTable().rows().data()[i].SalePrice,
                Units: parseInt($('#DataGridSale').DataTable().rows().data()[i].Units),
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

    $('#Delete').on('click', function(){
        var saleCount = $('#DataGridSale').DataTable().column(0).data().count();
        var stockCount = $('#DataGridStock').DataTable().column(0).data().count();
        var UnitTable = dataTableStock.DataTable().cell('tr > td:eq(3)');

        for(i = 0; i < saleCount; i++){
            for(z = 0; z < stockCount; z++){
                var saleId = $('#DataGridSale').DataTable().rows().data()[i].Id
                var stockId = $('#DataGridStock').DataTable().rows().data()[i].Id                
                var saleUnits = $('#DataGridSale').DataTable().rows().data()[i].Units;
                var stockUnits = $('#DataGridStock').DataTable().rows().data()[i].Units;     

                if(saleId ==  stockId){
                    UnitTable.data(parseInt(saleUnits + stockUnits))
                }
            }
        }
    })


});


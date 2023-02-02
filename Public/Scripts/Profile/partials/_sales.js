$(document).ready(function () {
    $('#DataGridStock').DataTable({
        "ajax": {
            "url": "/Products",
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
            $('#DataGridStock').DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
});


$(document).ready(function () {
    $('.addProduct').on('click', function () {
        if ($('#DataGridStock').DataTable().row('tr.selected').data() != undefined) {
            $('#DataGridSale').DataTable().row.add({
                "Name": $('#DataGridStock').DataTable().row('tr.selected').data().Name,
                "SalePrice": $('#DataGridStock').DataTable().row('tr.selected').data().SalePrice,
                "Units": $('#addUnits').val()
            }).draw(false);
        }
    })
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
            $('#DataGridSale').DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
});


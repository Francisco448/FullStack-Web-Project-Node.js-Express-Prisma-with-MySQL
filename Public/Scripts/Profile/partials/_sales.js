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
    $('#DataGridSale').DataTable({
        "columns": [
            { "data": "Name" },
            { "data": "SalePrice" },
            { "data": "Units" }
        ],
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


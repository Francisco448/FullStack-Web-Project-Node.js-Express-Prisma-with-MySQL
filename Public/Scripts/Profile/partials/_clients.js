$(document).ready(function () {
    $('#clientDatatable').DataTable({
        "columns": [
            { "data": "Id" },
            { "data": "FirstName" },
            { "data": "LastName" },
            { "data": "Alias" },
            { "data": "Email" },
            { "data": "UidSerie" },
            { "data": "Phone" },
        ],
        "paging": false,
    });
    $('#clientDatatable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $('#clientDatatable').DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
});

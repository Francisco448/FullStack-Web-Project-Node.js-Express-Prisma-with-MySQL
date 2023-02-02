var FirstName = $('.FirstName');
var LastName = $('.LastName');
var Alias = $('.Alias');
var UidSerie = $('.UidSerie');
var Email = $('.Email');
var Phone = $('.Phone');

// Validations --------------------------------------------------------------------------------------------------------------------------
function valid() {
    isValid = false;
    if (FirstName.val() != "" && LastName.val() != "" && Alias.val() != null && UidSerie.val() && Email.val() && Phone.val()) {
        isValid = true;
    } else {
        isValid = false;
    }
    return isValid;
}

function inputValid() {
    if (FirstName.val() == "") {
        LastName.css('border', '1px solid red');
    } else {
        LastName.css('border', 'none');
    }
    if (LastName.val() == "") {
        LastName.css('border', '1px solid red');
    } else {
        LastName.css('border', 'none');
    }
    if (Alias.val() == "") {
        Alias.css('border', '1px solid red');
    } else {
        Alias.css('border', 'none');
    }
    if (UidSerie.val() == "") {
        UidSerie.css('border', '1px solid red');
    } else {
        UidSerie.css('border', 'none');
    }
    if (Email.val() == "") {
        LastName.css('border', '1px solid red');
    } else {
        LastName.css('border', 'none');
    }
    if (Phone.val() == "") {
        Phone.css('border', '1px solid red');
    } else {
        Phone.css('border', 'none');
    }
}

// -------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    $('#clientDatatable').DataTable({
        "ajax": {
            "url": "getClients",
            "dataSrc": ""
        },
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
    $('.addClient').on('click', function () {
        if (valid()) {
            $.ajax({
                url: '/addClient',
                method: 'post',
                data: {
                    FirstName: FirstName.val(),
                    LastName: LastName.val(),
                    Alias: Alias.val(),
                    UidSerie: UidSerie.val(),
                    Email: Email.val(),
                    Phone: Phone.val()
                },
                success: function (result) {
                    if (result == true) {
                        $('#clientDatatable').DataTable().ajax.reload();
                    }
                }
            })
        } else {
            inputValid();
        }
    })
});

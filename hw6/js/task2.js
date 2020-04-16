$(document).ready(function () {
    const url = 'http://dummy.restapiexample.com/api/v1/employees';
    
    $('#table').text('Loading');

    $.ajax({
        url: url,
        dataType: "json",
        success: handleResponse
    });

    function handleResponse({ data }) {
        const tableHeaders = Object.keys(data[0]).map(key => $(`<th></th>`).text(key));
        const tableRows = data.map(emp => Object.values(emp))
                              .map(values => values.map(val => $('<td></td>').text(val)))
                              .map(row => $('<tr></tr>').append(row));

        $('#table').text('');
        $('#table').append($('<tr></tr>').append(tableHeaders));
        $('#table').append(tableRows);
    }
});
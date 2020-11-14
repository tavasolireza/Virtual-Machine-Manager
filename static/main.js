$(document).ready(function () {

    $('.wrapper').on('click', '.get_result', function () {
        $("#btnAddProfile").prop('value', 'Save');
        var val1 = $("#input_A").val();
        var val2 = $("#input_B").val();
        $.ajax({
            url: "/calculate_result",
            type: "get",
            data: {val1: val1, val2: val2},
            success: function (response) {
                $(".result").html('<p>' + response.result.toString() + '</p>');
                $(".get_result").html('Sffffffave');
            },
        })
    });
});
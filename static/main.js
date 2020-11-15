$(document).ready(function () {


    $('#vm1wrapper').on('click', '#NCMMSend1', function () {
        console.log("333")
        // $("#NCMMSend1").prop('value', 'Save');
        var cpu = $("#NoC1").val();
        var memory = $("#MMS1").val();
        $.ajax({
            url: "/vm_cpu_memory",
            type: "get",
            data: {cpu: cpu, memory: memory},
            success: function (response) {
                $(".result").html('<p>' + response.result.toString() + '</p>');
                // $(".get_result").html('Sffffffave');
            },
        })
    });

    $('#vm1cmdwrapper').on('click', '#MessageSend1', function () {
        var commands = $("#Message1").val();
        console.log(commands)
        $.ajax({
            url: "/vm_command",
            type: "get",
            data: {commands: commands},
            success: function (response) {
                $(".resultCmd").html('<p>' + response.result.toString() + '</p>');
            },
        })
    });

    // $('.wrapper').on('click', '.get_result', function () {
    //     console.log("333")
    //     $("#btnAddProfile").prop('value', 'Save');
    //     var val1 = $("#input_A").val();
    //     var val2 = $("#input_B").val();
    //     $.ajax({
    //         url: "/calculate_result",
    //         type: "get",
    //         data: {val1: val1, val2: val2},
    //         success: function (response) {
    //             console.log("mmcvbxvb")
    //             $(".result").html('<p>' + response.result.toString() + '</p>');
    //             $(".get_result").html('Sffffffave');
    //         },
    //     })
    // });

    // $("a#delete1click").click(function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         url: "/vm1_on",
    //         type: "get",
    //         // data: {val1: val1},
    //         success: function (response) {
    //             console.log("delete success")
    //         },
    //     })
    // });
    $("a#clone1click").click(function (e) {
        e.preventDefault();
        console.log("clone1");
        var val1 = 999;
        $.ajax({
            url: "/vm_on",
            type: "get",
            // data: {val1: val1},
            success: function (response) {
                console.log("clone success")
            },
        })
    });
        $("a#delete1click").click(function (e) {
        e.preventDefault();
        console.log("clone1");
        var val1 = 999;
        $.ajax({
            url: "/vm1_off",
            type: "get",
            // data: {val1: val1},
            success: function (response) {
                console.log("clone success")
            },
        })
    });


    // $('a#clone1click').on('click', function (e) {
    //     e.preventDefault()
    //     $.getJSON('/ahmad',
    //         function (data) {
    //
    //         });
    //     return false;
    // });

    // $('a#clone1click').on('click', function (e) {
    //     e.preventDefault()
    //     $.getJSON('/ahmad',
    //         function (data) {
    //
    //         });
    //     return false;
    // });


    // $('#myonoffswitch1').on('change',function() {
    //         e.preventDefault();
    //         if(this.checked){
    //         alert("hiiiiii");
    //
    //         }
    //   });

    // $('.wrappp').on('click', '#emailNotification', function () {
    //     print('here4')
    //     alert($(this).attr('id'));  //-->this will alert id of checked checkbox.
    //     if (this.checked) {
    //         $.ajax({
    //             type: "get",
    //             url: '/calculate_result',
    //             data: $(this).attr('id'), //--> send id of checked checkbox on other page
    //             success: function (data) {
    //                 alert('it worked');
    //                 print('here1')
    //                 alert(data);
    //                 $('#container').html(data);
    //             },
    //             error: function () {
    //                 alert('it broke');
    //                 print('here2')
    //             },
    //             complete: function () {
    //                 alert('it completed');
    //                 print('here3')
    //             }
    //         });
    //
    //     }
    // });

    // $("#myonoffswitch1click").click(function() {
    //     e.preventDefault();
    //     alert("hi");
    //     // alert($(this).attr('id'));  //-->this will alert id of checked checkbox.
    //     if ($("#myonoffswitch1").checked) {
    //         $.ajax({
    //             type: "post",
    //             url: '/vm_on',
    //             // data: $(this).attr('id'), //--> send id of checked checkbox on other page
    //             success: function (data) {
    //
    //             }
    //         });
    //
    //     }
    // });


});
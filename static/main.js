$(document).ready(function () {


    $(".NCMMSend").click(function (e) {
        // alert(this.id);
        let el_id = this.id;
        let el_no = el_id.charAt(el_id.length - 1);
        // alert(el_id.charAt(el_id.length - 1));
        let cpu_no = "#NoC".concat(el_no);
        let mem_no = "#MMS".concat(el_no);
        // alert(cpu_no);
        // $("#NCMMSend1").prop('value', 'Save');
        var cpu = $(cpu_no).val();
        var memory = $(mem_no).val();
        $.ajax({
            url: "/vm_cpu_memory",
            type: "get",
            data: {cpu: cpu, memory: memory, el_id: el_id},
            success: function (response) {
                let result_no = "#output".concat(el_no);
                $(result_no).html('<p>' + response.result_stdout + '</p>'
                    + '<p>' + response.result_error.toString() + '</p>');
                // $(".result").html('<p>' + response.result.toString() + '</p>');
                // $(".get_result").html('Sffffffave');
            },
        })
    });

    $(".messageSend").click(function (e) {
        // alert(this.id);
        let el_id = this.id;
        let el_no = el_id.charAt(el_id.length - 1);
        let message_no = "#message".concat(el_no);
        let commands = $(message_no).val();
        // console.log(commands)
        $.ajax({
            url: "/vm_command",
            type: "get",
            data: {commands: commands, el_id: el_id},
            success: function (response) {
                let result_no = "#output".concat(el_no);
                $(result_no).html('<p>' + response.result_stdout + '</p>'
                    + '<p>' + response.result_error.toString() + '</p>');
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
    $("a.cloneClick").click(function (e) {
        e.preventDefault();
        // alert(this.id);
        let el_id = this.id;
        let el_no = el_id.charAt(el_id.length - 1);
        $.ajax({
            url: "/vm_clone",
            type: "get",
            data: {el_id: el_id},
            success: function (response) {
                let result_no = "#output".concat(el_no);
                            $(result_no).html('<p>' + response.result_stdout + '</p>'
                                + '<p>' + response.result_error.toString() + '</p>');
            },
        })
    });

    $("a.deleteClick").click(function (e) {
        e.preventDefault();
        // alert(this.id);
        let el_id = this.id;
        let el_no = el_id.charAt(el_id.length - 1);
        $.ajax({
            url: "/vm_delete",
            type: "get",
            data: {el_id: el_id},
            success: function (response) {
                let result_no = "#output".concat(el_no);
                            $(result_no).html('<p>' + response.result_stdout + '</p>'
                                + '<p>' + response.result_error.toString() + '</p>');
            },
        })
    });

    //     $("a#delete1click").click(function (e) {
    //     e.preventDefault();
    //     console.log("clone1");
    //     var val1 = 999;
    //     $.ajax({
    //         url: "/vm1_off",
    //         type: "get",
    //         // data: {val1: val1},
    //         success: function (response) {
    //             console.log("clone success")
    //         },
    //     })
    // });


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
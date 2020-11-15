let vm_count_no = 1;


function create(vm_count) {
    var new_vm = `        <div class='w3-third'>
            <div class='w3-white   w3-card-4 w3-round-large'>
                <div class='w3-display-container LeftCont '>
                    <div class='w3-row-padding'>
                        <div class='w3-row-padding'>
                            <div class=' w3-container myName w3-round-large PageName'>
                                <h1 class='myName w3-hover-opacity '>VM ${vm_count}</h1>
                            </div>
                            <div class='OnOffStatus' style='margin-top: 0%; hight:100px; padding:1%;'
                                 class='w3-twothird w3-container myName w3-round-large PageName'>
                                <h3 class='myName w3-hover-opacity '> On / Off Status</h3>
                            </div>
                            <div style='margin-top: 0%;' class='w3-rest w3-container  w3-round-large PageName'>
                                <form>
                                    <!--                                    <a href=# id='myonoffswitch1click'>-->
                                    <div class='onoffswitch'>
                                        <input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox'
                                               id='myonoffswitch${vm_count}' tabindex='0'>
                                        <label class='onoffswitch-label' for='myonoffswitch${vm_count}'>
                                            <span class='onoffswitch-inner'></span>
                                            <span class='onoffswitch-switch'></span>
                                        </label>
                                    </div>
                                    <!--                                    </a>-->
                                </form>
                            </div>

                        </div>
                        <div class='w3-row' style='padding-left: 3.5%; padding-right: 3.5%;'>
                            <form>
                                <a href=# class='cloneClick' id='cloneClick${vm_count}'>
                                    <button id='clone${vm_count}' style='Margin-left: 0%; Margin-right: 22%;'
                                            class=' w3-third w3-round-large w3-button w3-yellow w3-hover-opacity'>Clone
                                    </button>
                                </a>
                            </form>
                            <form>
                                <a href=# class='deleteClick' id='deleteClick${vm_count}'>
                                    <button id='delete${vm_count}' style='Margin-left: 10%; Margin-right:0%;'
                                            class=' w3-third w3-round-large w3-button w3-red  w3-hover-opacity'>Delete
                                    </button>
                                </a>

                            </form>

                        </div>
                        <div class='vmWrapper' id='vmWrapper${vm_count}'>
                            <form class='NCMMForm' id='NCMMForm${vm_count}' action='/action_page.php'
                                  class='w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin'>

                                <div class='w3-row w3-section'>
                                    <div class='w3-col' style='width:70px'>
                                        <img src='https://cdn1.iconfinder.com/data/icons/computer-hardware-531/64/Processor-chip-cpu-memory-ram-512.png'
                                             style='width:50px' alt=''>
                                    </div>
                                    <div class='w3-rest'>
                                        <input id='NoC${vm_count}' class='w3-input w3-border' name='Cores' type='text'
                                               placeholder='Number of Cores'>
                                    </div>
                                </div>
                                <div class='w3-row w3-section'>
                                    <div class='w3-col' style='width:70px; hight:70px'>
                                        <img src='https://www.flaticon.com/svg/static/icons/svg/1689/1689137.svg'
                                             style='width:50px' alt=''>
                                    </div>
                                    <div class='w3-rest'>
                                        <input id='MMS${vm_count}' class='w3-input w3-border' name='Memory' type='text'
                                               placeholder='Main Memory Space'>
                                    </div>
                                </div>
                            </form>
                            <button id='NCMMSend${vm_count}' style='color: royalblue;'
                                    class='w3-button w3-block w3-section  w3-round-large w3-indigo w3-ripple w3-padding NCMMSend'>
                                Send
                            </button>
                            <!--                            <div class='result'>nnnnnn</div>-->
                        </div>
                        <div class='vmCmdWrapper' id='vmCmdWrapper${vm_count}'>
                            <div class='w3-row w3-section'>
                                <div class='w3-col' style='width:70px'>
                                    <img src='https://icons-for-free.com/iconfiles/png/512/text+icon-1320166904007805068.png'
                                         style='width:50px' alt=''>
                                </div>
                                <form id='messageForm${vm_count}' action='/action_page.php'
                                      class='w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin messageForm'>
                                    <div class='w3-rest'>
                                        <input id='message${vm_count}' class='w3-input w3-border' name='Message' type='text'
                                               placeholder='Message'>
                                    </div>
                                </form>
                            </div>
                            <button id='messageSend${vm_count}' style='color: royalblue;'
                                    class='w3-button w3-block w3-section  w3-round-large w3-indigo w3-ripple w3-padding messageSend'>
                                Send
                            </button>
                            <div>Output:
                                <div id='output${vm_count}'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <br>
            <!-- End 1 Column -->
        </div>
`;
    return $(new_vm);
}


$(document).ready(function () {
    $.ajax({
        url: '/vm_running',
        type: 'get',
        // data: {el_id: el_id},
        success: function (response) {
            // console.log(response.all_vms);
            let all_vms = response.all_vms;
            let running_vms = response.running_vms;
            let x_all;
            let y_running;
            $("#vm_grid").html("");
            for (x_all of all_vms) {
                console.log(x_all.slice(2,));

                $("#vm_grid").append(create(x_all.slice(2,)));
            }
            for (y_running of running_vms) {
                console.log(y_running.slice(2,));
                el_name=`#myonoffswitch${y_running.slice(2,)}`;
                $( el_name ).prop( "checked", true );
            }
            // let result_no = '#output'.concat(el_no);
            // $(result_no).html('<p>' + response.result_stdout + '</p>'
            //     + '<p>' + response.result_error.toString() + '</p>');
        },
    });
});

$(document).on('click', '.NCMMSend', function () {
    // $(".NCMMSend").click(function (e) {
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

$(document).on('click', '.messageSend', function () {
// $(".messageSend").click(function (e) {
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
$(document).on('click', 'a.cloneClick', function (e) {
// $("a.cloneClick").click(function (e) {
    e.preventDefault();
    vm_count_no = vm_count_no + 1
    $("#vm_grid").append(create(vm_count_no));
    // document.getElementById('vm_grid').appendChild(create());
    // alert(this.id);
    let el_id = this.id;
    let el_no = el_id.charAt(el_id.length - 1);
    $.ajax({
        url: "/vm_clone",
        type: "get",
        data: {el_id: el_id, vm_count_no: vm_count_no},
        success: function (response) {
            let result_no = "#output".concat(el_no);
            $(result_no).html('<p>' + response.result_stdout + '</p>'
                + '<p>' + response.result_error.toString() + '</p>');
        },
    })
});

$(document).on('click', 'a.deleteClick', function (e) {
// $("a.deleteClick").click(function (e) {
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
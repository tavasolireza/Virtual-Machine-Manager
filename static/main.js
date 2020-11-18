let vm_count_no = 1;

function create(vm_count) {
    var new_vm = `        <div class='w3-third vm_box'>
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
                                    <div class='onoffswitch'>
                                        <input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox'
                                               id='myonoffswitch${vm_count}' tabindex='0'>
                                        <label class='onoffswitch-label' for='myonoffswitch${vm_count}'>
                                            <span class='onoffswitch-inner'></span>
                                            <span class='onoffswitch-switch'></span>
                                        </label>
                                    </div>
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
        success: function (response) {
            let all_vms = response.all_vms;
            let running_vms = response.running_vms;
            vm_count_no=parseInt(all_vms.sort().slice(-1)[0].slice(2,));
            let x_all;
            let y_running;
            $("#vm_grid").html("");
            for (x_all of all_vms) {
                console.log(x_all.slice(2,));
                $("#vm_grid").append(create(x_all.slice(2,)));
            }
            for (y_running of running_vms) {
                console.log(y_running.slice(2,));
                let el_name = `#myonoffswitch${y_running.slice(2,)}`;
                $(el_name).prop("checked", true);
            }
        },
    });
});

 $(document).on('change','.onoffswitch-checkbox', function () {
                let el_id = this.id;
                let el_no = el_id.slice(13,);
                if (this.checked) {
                    $.ajax({
                        url: '/vm_on',
                        type: 'get',
                        data: {el_id: el_id},
                        success: function (response) {
                            let result_no = '#output'.concat(el_no);
                            $(result_no).html('<p>' + response.result_stdout + '</p>'
                                + '<p>' + response.result_error.toString() + '</p>');
                        },
                    });
                } else {
                    $.ajax({
                        url: '/vm_off',
                        type: 'get',
                        data: {el_id: el_id},
                        success: function (response) {
                            let result_no = '#output'.concat(el_no);
                            $(result_no).html('<p>' + 'shutting down' + '</p>'+
                                '<p>' + response.result_stdout + '</p>'
                                + '<p>' + response.result_error.toString() + '</p>');
                        },
                    });
                }
            });

$(document).on('click', '.NCMMSend', function () {
    let el_id = this.id;
    let el_no = el_id.slice(8,);
    let cpu_no = "#NoC".concat(el_no);
    let mem_no = "#MMS".concat(el_no);
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
        },
    })
});

$(document).on('click', '.messageSend', function () {
    let el_id = this.id;
    let el_no = el_id.slice(11,);
    let message_no = "#message".concat(el_no);
    let commands = $(message_no).val();
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


$(document).on('click', 'a.cloneClick', function (e) {
    e.preventDefault();
    vm_count_no = vm_count_no + 1
    // $("#vm_grid").append(create(vm_count_no));
    let el_id = this.id;
    let el_no = el_id.slice(10,);
    $.ajax({
        url: "/vm_clone",
        type: "get",
        data: {el_id: el_id, vm_count_no: vm_count_no},
        success: function (response) {
            let result_no = "#output".concat(el_no);
            $(result_no).html('<p>' + response.result_stdout + '</p>'
                + '<p>' + response.result_error.toString() + '</p>');
            if (response.result_error.toString().length < 100){
                $("#vm_grid").append(create(vm_count_no));
            }

        },
    })
});

$(document).on('click', 'a.deleteClick', function (e) {
    e.preventDefault();
    let el_id = this.id;
    let el_no = el_id.slice(11,);
    $.ajax({
        url: "/vm_delete",
        type: "get",
        data: {el_id: el_id},
        success: function (response) {
            $(`#${el_id}`).closest('.vm_box').remove();
        },
    })
});
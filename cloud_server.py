from flask import Flask, request, render_template, jsonify, Response, abort, json
from subprocess import PIPE, run
import subprocess

app = Flask(__name__)

app.config["CACHE_TYPE"] = "null"


@app.route("/")
def home():
    # return "Hello, World!"
    return render_template('dash.html')


@app.route('/vm_on')
def vm_on():
    vm_no = request.args.get('el_id')[-1]
    print(vm_no)
    vm_no = "vm" + vm_no
    # subprocess.call(["VBoxManage", "controlvm", "vm1", "poweroff"])
    command = ["VBoxManage", "startvm", vm_no]
    result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result.returncode, result.stdout, result.stderr)
    # subprocess.call(["VBoxManage", "startvm", "vm1"])
    # return "nothing"
    return jsonify(
        {"result_stdout": result.stdout, "result_error": result.stderr})


# background process happening without any refreshing
# @app.route('/vm1_on')
# def vm_on():
#     print('booyah')
#     # a = int(request.args.get('val1'))
#     subprocess.call(["VBoxManage", "controlvm", "vm1", "poweroff"])
#     return "nothing"
#
#
@app.route('/vm_off')
def vm_off():
    vm_no = request.args.get('el_id')[-1]
    print(vm_no)
    vm_no = "vm" + vm_no
    # subprocess.call(["VBoxManage", "controlvm", "vm1", "poweroff"])
    command = ["VBoxManage", "controlvm", vm_no, "poweroff"]
    result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result.returncode, result.stdout, result.stderr)
    return jsonify(
        {"result_stdout": result.stdout, "result_error": result.stderr})


@app.route('/vm_running')
def vm_running():
    command1 = ["VBoxManage", "list", "vms"]
    all_vms = run(command1, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(all_vms.returncode, all_vms.stdout, all_vms.stderr)
    all_vms = all_vms.stdout.replace("\""," ").split()[0::2]

    command2 = ["VBoxManage", "list", "runningvms"]
    running_vms = run(command2, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(running_vms.returncode, running_vms.stdout, running_vms.stderr)
    running_vms = running_vms.stdout.replace("\""," ").split()[0::2]
    # subprocess.call(["VBoxManage", "modifyvm", "vm1", "--memory", str(b)])
    # subprocess.call(["VBoxManage", "modifyvm", "vm1", "--cpus", str(a)])
    return jsonify(
        {"all_vms": all_vms, "running_vms": running_vms})


@app.route('/vm_cpu_memory')
def vm_change_cpu_memory():
    vm_no = request.args.get('el_id')[-1]
    print(vm_no)
    vm_no = "vm" + vm_no
    a = int(request.args.get('cpu'))
    b = int(request.args.get('memory'))
    command1 = ["VBoxManage", "modifyvm", vm_no, "--memory", str(b)]
    result1 = run(command1, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result1.returncode, result1.stdout, result1.stderr)

    command2 = ["VBoxManage", "modifyvm", vm_no, "--cpus", str(a)]
    result2 = run(command2, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result2.returncode, result2.stdout, result2.stderr)
    change_prompt = ""
    if len(result1.stderr) < 5 and len(result2.stderr) < 5:
        change_prompt = "Changed CPU and memory successfuly"
    else:
        change_prompt = result1.stderr + " " + result2.stderr
    # subprocess.call(["VBoxManage", "modifyvm", "vm1", "--memory", str(b)])
    # subprocess.call(["VBoxManage", "modifyvm", "vm1", "--cpus", str(a)])
    return jsonify(
        {"result_stdout": result1.stdout + " " + result2.stdout, "result_error": change_prompt})


@app.route('/vm_command')
def vm_command():
    vm_no = request.args.get('el_id')[-1]
    print(vm_no)
    vm_no = "vm" + vm_no
    commands = request.args.get('commands')
    commands = commands.split()
    print(commands)
    cmd_list = ["VBoxManage", "guestcontrol", vm_no, "--username", "reza", "--password", "19422010", "run", "--exe",
                f"/bin/{commands[0]}", f"{commands[0]}"]
    if len(commands) > 1:
        cmd_list += commands[1:]
    # subprocess.call(cmd_list)
    # command = ["VBoxManage", "controlvm", "vm1", "poweroff"]
    result = run(cmd_list, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result.returncode, result.stdout, result.stderr)
    # subprocess.call(["VBoxManage", "guestcontrol", "vm1", "----username", str(b), "--password", str(a), ])
    # subprocess.call(["VBoxManage", "modifyvm", "vm1", "--cpus", str(a)])
    # return jsonify({"result": a + b})
    # return jsonify({"result": result.stdout})
    return jsonify(
        {"result_stdout": result.stdout, "result_error": result.stderr})


#
# @app.route('/vm_delete')
# def vm_delete():
#     print('delete')
#     subprocess.call(["VBoxManage", "unregistervm", "vm33", "-delete"])
#     return None
#

@app.route('/vm_delete')
def vm_delete():
    # print("clone kardi?????")
    # subprocess.call(["VBoxManage", "clonevm", "vm1", "--register"])
    # print("clone kardi?????")
    vm_no = request.args.get('el_id')[-1]
    print(vm_no)
    vm_no = "vm" + vm_no
    command = ["VBoxManage", "unregistervm", vm_no, "-delete"]
    result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result.returncode, result.stdout, result.stderr)
    # return "nothing"
    return jsonify(
        {"result_stdout": result.stdout, "result_error": result.stderr})


@app.route('/vm_clone')
def vm_clone():
    print("clone kardi?????")
    # subprocess.call(["VBoxManage", "clonevm", "vm1", "--register"])
    # print("clone kardi?????")
    vm_no = request.args.get('el_id')[-1]
    vm_count_no = int(request.args.get('vm_count_no'))
    print(vm_no)
    vm_no = "vm" + vm_no
    command = ["VBoxManage", "clonevm", vm_no, f"--name=vm{vm_count_no}", "--register"]
    result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result.returncode, result.stdout, result.stderr)
    # return "nothing"
    return jsonify(
        {"result_stdout": result.stdout, "result_error": result.stderr})


#
@app.route('/calculate_result')
def calculate_result():
    print("came here")
    a = int(request.args.get('cpu'))
    # subprocess.call(["VBoxManage", "startvm", "vm1"])
    b = int(request.args.get('memory'))
    return jsonify({"result": a + b})


#
#
# @app.route("/salvador")
# def salvador():
#     return "Hello, Salvador"


if __name__ == "__main__":
    app.run(debug=True)

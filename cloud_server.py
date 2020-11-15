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
    # subprocess.call(["VBoxManage", "controlvm", "vm1", "poweroff"])
    command = ["VBoxManage", "startvm", "vm1"]
    result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result.returncode, result.stdout, result.stderr)
    # subprocess.call(["VBoxManage", "startvm", "vm1"])
    return "nothing"


# background process happening without any refreshing
# @app.route('/vm1_on')
# def vm_on():
#     print('booyah')
#     # a = int(request.args.get('val1'))
#     subprocess.call(["VBoxManage", "controlvm", "vm1", "poweroff"])
#     return "nothing"
#
#
@app.route('/vm1_off')
def vm_off():
    print('koonah')
    # subprocess.call(["VBoxManage", "controlvm", "vm1", "poweroff"])
    command = ["VBoxManage", "controlvm", "vm1", "poweroff"]
    result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result.returncode, result.stdout, result.stderr)
    return "nothing"


@app.route('/vm_cpu_memory')
def vm_change_cpu_memory():
    print("came here")
    a = int(request.args.get('cpu'))
    b = int(request.args.get('memory'))
    command1 = ["VBoxManage", "modifyvm", "vm1", "--memory", str(b)]
    result1 = run(command1, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result1.returncode, result1.stdout, result1.stderr)

    command2 = ["VBoxManage", "modifyvm", "vm1", "--cpus", str(a)]
    result2 = run(command2, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    print(result2.returncode, result2.stdout, result2.stderr)
    # subprocess.call(["VBoxManage", "modifyvm", "vm1", "--memory", str(b)])
    # subprocess.call(["VBoxManage", "modifyvm", "vm1", "--cpus", str(a)])
    return jsonify({"result": a + b})


@app.route('/vm_command')
def vm_command():
    commands = request.args.get('commands')
    commands = commands.split()
    print(commands)
    cmd_list = ["VBoxManage", "guestcontrol", "vm1", "--username", "reza", "--password", "19422010", "run", "--exe",
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
    return jsonify({"result": result.stdout})


#
# @app.route('/vm_delete')
# def vm_delete():
#     print('delete')
#     subprocess.call(["VBoxManage", "unregistervm", "vm33", "-delete"])
#     return None
#
# @app.route('/vm_clone')
# def vm_clone():
#     print("clone kardi?????")
#     subprocess.call(["VBoxManage", "clonevm", "vm1", "--register"])
#     print("clone kardi?????")
#     return None
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

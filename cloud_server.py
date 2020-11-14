from flask import Flask, request, render_template, jsonify, Response, abort, json
import subprocess

app = Flask(__name__)


@app.route("/")
def home():
    # return "Hello, World!"
    return render_template('dashboard.html')


# background process happening without any refreshing
@app.route('/vm1_on')
def vm_on():
    subprocess.call(["VBoxManage", "startvm", "vm1"])
    return None


@app.route('/vm1_off')
def vm_off():
    subprocess.call(["VBoxManage", "controlvm", "vm1", "poweroff"])
    return None

@app.route('/vm_cpu_memory')
def vm_change_cpu_memory():
    subprocess.call(["VBoxManage", "modifyvm", "vm1", "--memory", "4000"])
    subprocess.call(["VBoxManage", "modifyvm", "vm1", "--cpus", "3"])
    return None

@app.route('/vm_delete')
def vm_delete():
    subprocess.call(["VBoxManage", "unregister", "vm1", "-delete"])
    return None

@app.route('/calculate_result')
def calculate_result():
    a = int(request.args.get('val1'))
    b = int(request.args.get('val2'))
    # return jsonify({"result": a + b})
    response = app.response_class(
        response=jsonify({"result": a + b}),
        status=403,
        mimetype='application/json'
    )
    return response


@app.route("/salvador")
def salvador():
    return "Hello, Salvador"


if __name__ == "__main__":
    app.run(debug=True)

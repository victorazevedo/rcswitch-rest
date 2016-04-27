//execute commands
var util = require('util')
var exec = require('child_process').exec;
var sleep = require('sleep');

var data = [{
    "id": "A01",
    "status": false,
    "url": "/switches/0",
    "name": "lâmpada do quarto",
    "pin":20,
    "script": "sudo /home/pi/rcswitch-pi/sendRev",
    "command": "B 0",
}, {
    "id": "A02",
    "status": false,
    "url": "/switches/1",
    "name": "lâmpada da sala",
    "pin":21,
    "script": "sudo /home/pi/rcswitch-pi/sendRev",
    "command": "B 1",
}, {
    "id": "A03",
    "status": false,
    "url": "/switches/2",
    "name": "TV do quarto",
    "pin":26,
    "script": "sudo /home/pi/rcswitch-pi/sendRev",
    "command": "B 2",
}, {
    "id": "A04",
    "status": false,
    "url": "/switches/3",
    "name": "TV da sala",
    "pin":-1,
    "script": "sudo /home/pi/rcswitch-pi/sendRev",
    "command": "B 3",
}];

// GET
exports.getAllSwitches = function(req, res) {
    console.log('SERVER side - getting switches');
    var switches = [];
    res.json(data);
};

exports.getSwitch = function(req, res) {
    var id = req.params.id;
    console.log('SERVER side - getting switch' + id);
    if (id >= 0 && id < data.length) {
        res.json(data[id]);
    } else {
        res.json(404);
    }
};

// POST
exports.addSwitch = function(req, res) {
    var equip = req.body;
    console.log('SERVER side - Adding switch: ' + equip.id + 'Status: ' + equip.status);
    data.push(equip);
    res.send(201);
};

// PUT
exports.editSwitch = function(req, res) {
    var index = data.map(function(x) {return x.name }).indexOf(req.body.name);
    var pin = data[index].pin;
    console.log('Changing:\nid: ' + req.params.id + " status: " + req.body.status + ' RPI pin: '+ pin);
    if (pin !=-1) {
        if(req.body.status == true) switchStatus(pin,1);
        else if(req.body.status == false) switchStatus(pin,0);
        data[index].status = req.body.status;
        res.send(200);
    } else {
        res.json(404);
    }
};

// PUT
exports.editAllSwitches = function(req, res) {
    console.log('SERVER side - :\n' + req.body);
    data = req.body;
    res.send(200);
};

// DELETE
exports.deleteSwitch = function(req, res) {
    console.log(req.params);
    var id = req.params.id;
    if (id >= 0 && id <= data.length) {
        console.log('SERVER side - Delete switch with id: ' + id);
        var index = data.map(function(x) {
            return x.id; }).indexOf(id);
        console.log(index);
        data.splice(index, 1);
        console.log(data);
        res.send(200);
    } else {
        console.log('No objects to delete');
        res.json(404);
    }
};


function switchStatus(pin,zeroOne) {
    console.log('pin:'+pin+' status:'+zeroOne);
    var GPIO = require('onoff').Gpio;
    var led = new GPIO(pin, 'out');
    led.writeSync(zeroOne);
}

function puts(error, stdout, stderr) {
    util.puts(stdout);
    console.warn("Executing Done");
}


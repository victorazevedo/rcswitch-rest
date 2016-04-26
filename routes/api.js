//execute commands
var util = require('util')
var exec = require('child_process').exec;
var sleep = require('sleep');

var data = [{
    "id": "0",
    "status": false,
    "url": "/switches/0",
    "name": "Lâmpada do Quarto",
    "script": "sudo /home/pi/rcswitch-pi/sendRev",
    "command": "B 0",
}, {
    "id": "1",
    "status": false,
    "url": "/switches/1",
    "name": "Lâmpada da Sala",
    "script": "sudo /home/pi/rcswitch-pi/sendRev",
    "command": "B 1",
}, {
    "id": "2",
    "status": false,
    "url": "/switches/2",
    "name": "TV do Quarto",
    "script": "sudo /home/pi/rcswitch-pi/sendRev",
    "command": "B 2",
}, {
    "id": "3",
    "status": false,
    "url": "/switches/3",
    "name": "TV da Sala",
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
    var id = req.params.id;
    console.log('SERVER side - edit switch' + id);
    if (id >= 0 && id <= data.length) {
        console.log('Switch Status of switch with id: ' + id + " to " + req.body.status);
        var script = data[id].script;
        var command = data[id].command;
        switchStatus(script, command, req.body.status);
        data[id].status = req.body.status;
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


function switchStatus(script, command, status) {
    var execString = script + " " + command + " " + status;
    console.log("Executing: " + execString);
    exec(execString, puts);
    sleep.sleep(1) //sleep for 1 seconds
}

function puts(error, stdout, stderr) {
    util.puts(stdout);
    console.warn("Executing Done");
}


// app.get('/:pin', function(req, res){
//   var pin = req.params.pin;

//   gpio.open(pin, 'input', function(err) {
//     gpio.read(pin, function(err, value) {
//       res.send(200, {value: value});
//       gpio.close(pin);
//     });
//   });
// });

// app.put('/:pin', function(req, res) {
//   var pin = req.params.pin;
//   var value = req.body.value;

//   gpio.open(pin, 'output', function(err) {
//     gpio.write(pin, value, function(err) {
//       res.send(200);
//       gpio.close(pin);
//     });
//   });
// });
// https://github.com/rakeshpai/pi-gpio

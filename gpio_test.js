var GPIO = require('onoff').Gpio,
led20 = new GPIO(20, 'out'),
led21 = new GPIO(21, 'out'),
led26 = new GPIO(26, 'out');

led20.writeSync(1);
led21.writeSync(1);
led26.writeSync(1);

setTimeout(function(){

led20.writeSync(0);
led21.writeSync(0);
led26.writeSync(0);


},2000);


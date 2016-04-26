var GPIO = require('onoff').Gpio,
led21 = new GPIO(21, 'out'),
led21.writeSync(1);
 

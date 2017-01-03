module.exports = function (host, port, payload, callback) {
  var broadcast = '000000000000000009000000e00729070b00170a00000000c0a80a0555c100008ec20000000006000000000000000000'
  var dgram = require('dgram');
  
  if (typeof payload === 'object') {
      for (var i = 0; i < payload.length; i++){
        sendPackets(payload[i]);
      };
  }
  else {
       sendPackets(payload);
  };
  
  function sendPackets(payloadMessage){
        var client = dgram.createSocket('udp4');
        var delayTime = Math.floor(Math.random() * 1000) + 1;
        var message = new Buffer(payloadMessage, 'hex');
        setTimeout(function() { 
          client.send(broadcast, 0, broadcast.length, port, host, function(err, bytes) {
            if (err) throw err;
            console.log('UDP message sent to ' + host +':'+ port);

            client.send(message, 0, message.length, port, host, function(err, bytes) {
              if (err) throw err;
              console.log('UDP message sent to ' + host +':'+ port);
              client.close();
              
              callback(err);
            });
            
          });
        }, delayTime);
    }
}

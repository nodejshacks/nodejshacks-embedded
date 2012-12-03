define(function() {
  function Example4() {
    
  }
  
  Example4.handle = function() {
    
    require(['scripts/libs/Noduino.js', 'scripts/libs/Noduino.Socket.js', 'scripts/libs/Logger.js'], function(NoduinoObj, Connector, Logger) {
      var Noduino = new NoduinoObj({debug: false, host: 'http://localhost:8090'}, Connector, Logger);
      Noduino.connect(function(err, board) {
        $('#e4-exampleConnection .alert').addClass('hide'); 
        if (err) {
          $('#e4-exampleConnection .alert-error').removeClass('hide'); }
        else {
          $('#e4-exampleConnection .alert-success').removeClass('hide'); }
          
          // board.withButton({pin: 4}, function(err, Button) {
          //   Button.on('change', function(B) {
          //     if (B.pushed) {
          //       $('#e4-exampleConnection #buttonStatus').html('pushed');
          //       $('#e4-exampleConnection #buttonStatus').addClass('label-success');
          //     } else {
          //       $('#e4-exampleConnection #buttonStatus').html('not pushed');
          //       $('#e4-exampleConnection #buttonStatus').removeClass('label-success');                
          //     }
          //   });
          // });

          board.withLED({pin: 13}, function(err, LED) {
            LED.blink(250);
            LED.on('on', function() {
              console.log('LED is on!');
            });
          });


      });
    });
    
  };
  
  return Example4;
});
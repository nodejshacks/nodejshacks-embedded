/**
 * srv.app.js – Handling HTTP:80 Requests
 * This file is part of noduino (c) 2012 Sebastian Müller <c@semu.mp>
 *
 * @package     noduino
 * @author      Sebastian Müller <c@semu.mp>
 * @license     MIT License – http://www.opensource.org/licenses/mit-license.php 
 * @url         https://github.com/semu/noduino
 */
 
define(['kickstart', 'module', 'path', 'fs'], function (kickstart, module, path, fs) {
  var kickstart = kickstart.withConfig({'name': 'localhost', 'port': 8080, 'path': './'});
  var srv = kickstart.srv();
  
  /**
   * Load file with example snippets
   */
  var fileContents = fs.readFileSync('./examples.snippet'),
    sections = (fileContents + '').split('###'),
    examples = {};
  for (var i = 0; i < sections.length; i++) {
    var tmp = sections[i].split("\n"),
      key = tmp.shift();
    tmp.pop();
    examples[key] = tmp.join("\n");
  }

  /** 
   * Catch request for serving home page
   */
  srv.all('/', function(req, res) {
    res.render('home', {jsApp: 'main', active: 'home', title: 'noduino', 'examples': examples});
  });

  /** 
   * Catch request for noduino example page
   */
  srv.all('/noduino', function(req, res) {
    res.render('noduino', {jsApp: 'main', active: 'noduino', title: 'noduino', 'examples': examples});
  });

  /** 
   * Catch request for serving johnnyfive example page
   */
  srv.all('/johnnyfive', function(req, res) {
    
    res.render('johnnyfive', {jsApp: 'main', active: 'johnnyfive', title: 'johnnyfive', 'examples': examples});

    var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
      board = new five.Board();
      board.on("ready", function() {

///////////////////////// LED

        // // Create an Led on pin 13 and strobe it on/off
        // // Optionally set the speed; defaults to 100ms
        // // (new five.Led(13)).strobe();

        led = new five.Led(13); 

        // led.strobe();

        // // Inject the `led` hardware into
        // // the Repl instance's context;
        // // allows direct command line access

        // board.repl.inject({
        //   led: led
        // });

///////////////////////// PIR

        // This is the old API

        // console.log(five);

        // var ir = new five.IR.Proximity();

        // // Fires when the proximal area is disrupted,
        // // generally by some form of movement
        // ir.on("motionstart", function() {
        //   console.log( "motionstart" );
        // });

        // // Fires when the proximal area is has been cleared
        // // of obstruction.
        // ir.on("motionend", function() {
        //   console.log( "motionend" );
        // });

        // // Fires continuously, every 66ms.
        // ir.on("read", function( err, timestamp ) {
        //   // console.log( "read" );
        // });

        var pir = new five.Pir({"pin": 2});

        board.repl.inject({
          pir: pir
        });

        // console.log(pir);

        pir.on("calibrated", function() {

          console.log( "calibrated" );

            var http = require('http');

            var options = {
              hostname: 'beaglebone.local',
              port: 3333,
              path: '/motion',
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              }
            };

            var req = http.request(options, function(res) {
              console.log('RESPONSE STATUS: ' + res.statusCode);
              console.log('RESPONSE HEADERS: ' + JSON.stringify(res.headers));
              res.setEncoding('utf8');
              res.on('data', function (chunk) {
                console.log('RESPONSE BODY: ' + chunk);
              });
            });

            req.on('error', function(e) {
              console.log('problem with request: ' + e.message);
            });

            // write data to request body
            req.write(JSON.stringify({eventType:"calibrated"}, null,  "  "));
            req.end();

        });

        pir.on("motionstart", function() {

          console.log( "motionstart" );
          
          led.strobe();

            var http = require('http');

            var options = {
              hostname: 'beaglebone.local',
              port: 3333,
              path: '/motion',
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              }
            };

            var req = http.request(options, function(res) {
              console.log('RESPONSE STATUS: ' + res.statusCode);
              console.log('RESPONSE HEADERS: ' + JSON.stringify(res.headers));
              res.setEncoding('utf8');
              res.on('data', function (chunk) {
                console.log('RESPONSE BODY: ' + chunk);
              });
            });

            req.on('error', function(e) {
              console.log('problem with request: ' + e.message);
            });

            // write data to request body
            req.write(JSON.stringify({eventType:"motionstart"}, null,  "  "));
            req.end();

        });

        pir.on("motionend", function() {

          console.log( "motionend" );
          
          led.stop();

            var http = require('http');

            var options = {
              hostname: 'beaglebone.local',
              port: 3333,
              path: '/motion',
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              }
            };

            var req = http.request(options, function(res) {
              console.log('RESPONSE STATUS: ' + res.statusCode);
              console.log('RESPONSE HEADERS: ' + JSON.stringify(res.headers));
              res.setEncoding('utf8');
              res.on('data', function (chunk) {
                console.log('RESPONSE BODY: ' + chunk);
              });
            });

            req.on('error', function(e) {
              console.log('problem with request: ' + e.message);
            });

            // write data to request body
            req.write(JSON.stringify({eventType:"motionend"}, null,  "  "));
            req.end();

        });

    });

  });

  /** 
   * Catch request for serving beaglebone example page
   */
  srv.all('/nodeArDrone', function(req, res) {
    res.render('nodeArDrone', {jsApp: 'main', active: 'nodeArDrone', title: 'nodeArDrone', 'examples': examples});
  });

  /** 
   * Catch request for serving beaglebone example page
   */
  srv.all('/beaglebone', function(req, res) {
    res.render('beaglebone', {jsApp: 'main', active: 'beaglebone', title: 'beaglebone', 'examples': examples});
  });    

  /** 
   * Catch request for serving beaglebone example page
   */
  srv.all('/spacebrew', function(req, res) {
    res.render('spacebrew', {jsApp: 'main', active: 'spacebrew', title: 'spacebrew', 'examples': examples});
  });  

  /** 
 * Catch request for serving cosm example page
 */
  srv.all('/cosm', function(req, res) {
    res.render('cosm', {jsApp: 'main', active: 'cosm', title: 'cosm', 'examples': examples});
  }); 

  /** 
 * Catch request for serving beaglebone example page
 */
  srv.all('/arduinoSSE', function(req, res) {
    res.render('arduinoSSE', {jsApp: 'main', active: 'arduinoSSE', title: 'arduinoSSE', 'examples': examples});
  }); 
  return {'kickstart': kickstart, 'srv': srv};
});
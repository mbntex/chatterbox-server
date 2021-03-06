/* Import node's http module: */
var http = require('http');
var handleRequest = require('./request-handler.js');
var url = require('url');
var fs = require('fs');

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = '127.0.0.1';



// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
var server = http.createServer(handleRequest.requestHandler);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.
///////////////////////////////////////////////////////////////////////////////////

// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };

// var fileServerFunction = function (req, res) {
//   console.log ("Method", req.method)
//   console.log('CURRENT REQUEST URL = ', req.url);
//   var urlPath = url.parse(req.url, true);
//   //console.log('INFO = ', urlPath.pathname);
//   //if (urlPath.pathname === '/index.html') {
//   fs.readFile('./client/' + urlPath.pathname, function (err, data) {
//     if (err) {
//       console.log('ERROR');
//       res.writeHead(404);
//       res.end('FILE NOT FOUND');
//       return;
//     }
//     res.writeHead(200, defaultCorsHeaders);
//     res.write(data);
//     res.end();
//     return;
//   });
//   //}
// };
// var fileServer = http.createServer(fileServerFunction);
// console.log('Listening on http://' + ip + ':' + 8080);
// fileServer.listen(8080, ip);






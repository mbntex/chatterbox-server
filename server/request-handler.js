/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var queryString = require('querystring');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};




var madeUpDataBase = [
  {
    username: 'Jeff',
    text: 'Add Return'
  }, 
  {
    username: 'Michael',
    text: 'It is Returned'
  },
  {
    username: 'Carl',
    text: 'The zombies have returned.'
  }
];

var requestHandler = function(request, response) {
  console.log ('Start of Request');
  var statusCode = 404;
  var headers = defaultCorsHeaders;
  var expectedURL = '/classes/messages';
  headers['Content-Type'] = 'text/plain'; // You will need to change this if you are sending something other than plain text, like JSON or HTML.
  //console.log('URL request', url.request);

  // console.log (request);
  if (request.method === 'OPTIONS') {
    //console.log(request.method);
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
    return;
  }
  
  if (request.method === 'GET' && request.url.includes(expectedURL)) { 
    // console.log ('GET');
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: madeUpDataBase}));
    return;
  }

  if (request.method === 'POST' && request.url.includes(expectedURL)) {
    var body = '';
    request.on('data', function(chunk) { body += chunk; });
    request.on('end', function () {
      statusCode = 201;
      response.writeHead(statusCode, headers);
      try {
        body = JSON.parse(body); //try to JSON parse first, this covers the test JSON string object
      } catch (error) {
        body = queryString.parse(body); //use querySting module to parse the data into an object
      } 
      // console.log (request);
      // console.log ('header content-type: ', request.headers['content-type']);
      madeUpDataBase.unshift(body);
      response.end(JSON.stringify({results: madeUpDataBase[0] }));
    });
    return;
  }

  response.writeHead(statusCode, headers);
  response.end(JSON.stringify({results: madeUpDataBase[0] }));


};
module.exports.requestHandler = requestHandler;





// //////////////////////////////////////
// var requestHandler2 = function(request, response) {
//   var statusCode = 404;
//   var headers = defaultCorsHeaders;
//   console.log ('Start of Request');
//   var expectedURL = '/classes/messages';
//   var response;

//   // Tell the client we are sending them plain text.
//   //
//   // You will need to change this if you are sending something
//   // other than plain text, like JSON or HTML.
//   headers['Content-Type'] = 'text/plain';
  
//   if (request.method === 'OPTIONS') {
//     //console.log(request.method);
//     statusCode = 200;
//     response.writeHead(statusCode, headers);
//     response.end(JSON.stringify('Hello, World!'));
//     return;
//   }
  
//   if (request.method === 'GET' && request.url.includes(expectedURL)) { 
//     // console.log ('GET');

//     statusCode = 200;
//     response.writeHead(statusCode, headers);
//     response.end(JSON.stringify({results: madeUpDataBase}));
//     return;
//   }
  
//   if (request.method === 'POST' && request.url.includes(expectedURL)) { 
//     // console.log ('POST');
//     // console.log('REQUEST +++++===++BODY', request);
//     var body = '';
//     request.on('data', function(chunk) { body += chunk; console.log('here'); });
//     request.on('end', function () {
//       statusCode = 201;
//       response.writeHead(statusCode, headers);
      
//       // console.log ('body AS IS = ', body);
//       // console.log ('body AS IS TYPE = ', typeof body);
      
//       //HELPER FUNCITON TO CLEAN UP STRING
//       //body AS IS =  username=Bob&text=Hella+Cool!&roomname=lobby
//       var parseIt = function(string) {
//         //{"username":"Jono","message":"Do my bidding!"}

//         console.log ('Raw String: ', string);
//         if (string === undefined) { console.log('data body is undefined!'); }
//         var userNameFirst = (string.indexOf('username=')) + 9;
//         var userNameLast = (string.indexOf('&'));
//         var userName = string.slice(userNameFirst, userNameLast);
//         //console.log(userName);
        
//         var userTextFirst = (string.indexOf('text=')) + 5;
//         var userTextLast = (string.indexOf('&roomname'));
//         var messageString = string.slice(userTextFirst, userTextLast);
//         var spacedMessage = messageString.split('+').join(' ');
//         //console.log(spacedMessage);
        
//         return {username: userName, text: spacedMessage};
//       };

//       console.log ('body: ', typeof body);
//       // console.log('FINAL = ', responseLegible);
//       // console.log(JSON.stringify({results: madeUpDataBase[madeUpDataBase.length - 1] }));
//       try {
//         body = JSON.parse(body);
//       } catch (error) {
//         console.error ('body is not a json parsable string');
//       }
//       if (typeof body === 'string') {
//         var responseLegible = parseIt(body);
//       } else if (typeof body === 'object' && !Array.isArray(body)) {
//         let keys = Object.keys(body);
//         keys.forEach(function (element, index) {
//           madeUpDataBase[body[keys[index]]] = element;
//         });
//       }
//       madeUpDataBase.unshift(responseLegible);
//       response.end(JSON.stringify({results: madeUpDataBase[0] }));
//       console.log('CURRENT DB SNAPSHOT = ', madeUpDataBase);
      
//       return;

      
//     });
//     return;  
//   }
//   // .writeHead() writes to the request line and headers of the response,
//   // which includes the status and all headers.
//   response.writeHead(statusCode, headers);
  
//   // Make sure to always call response.end() - Node may not send
//   // anything back to the client until you do. The string you pass to
//   // response.end() will be the body of the response - i.e. what shows
//   // up in the browser.
//   //
//   // Calling .end "flushes" the response's internal buffer, forcing
//   // node to actually send all the data over to the client.
//   response.end('Hello, World!');
// };




// module.exports.requestHandler = requestHandler;



//////////////////////////////////////////////////////////



//module.exports = {
  ////some function 
  //// more code
  //// return {
    // requestHandler: requestHandler
  // }
  
// };


////////saved code before refactoring by using queryString
// var requestHandler = function(request, response) {
  
  
//   // Request and Response come from node's http module.
//   //
//   // They include information about both the incoming request, such as
//   // headers and URL, and about the outgoing response, such as its status
//   // and content.
//   //
//   // Documentation for both request and response can be found in the HTTP section at
//   // http://nodejs.org/documentation/api/

//   // Do some basic logging.
//   //
//   // Adding more logging to your server can be an easy way to get passive
//   // debugging help, but you should always be careful about leaving stray
//   // console.logs in your code.

//   ////console.log('Serving request type ' + request.method + ' for url ' + request.url);
//   var statusCode = 404;
//   var headers = defaultCorsHeaders;
//   console.log ('Start of Request');
//   var expectedURL = '/classes/messages';
//   var response;

//   // Tell the client we are sending them plain text.
//   //
//   // You will need to change this if you are sending something
//   // other than plain text, like JSON or HTML.
//   headers['Content-Type'] = 'text/plain';
  
//   if (request.method === 'OPTIONS') {
//     //console.log(request.method);
//     statusCode = 200;
//     response.writeHead(statusCode, headers);
//     response.end(JSON.stringify('Hello, World!'));
//     return;
//   }
  
//   if (request.method === 'GET' && request.url.includes(expectedURL)) { 
//     // console.log ('GET');

//     statusCode = 200;
//     response.writeHead(statusCode, headers);
//     response.end(JSON.stringify({results: madeUpDataBase}));
//     return;
//   }
  
//   if (request.method === 'POST' && request.url.includes(expectedURL)) { 
//     // console.log ('POST');
//     // console.log('REQUEST +++++===++BODY', request);
//     var body = '';
//     request.on('data', function(chunk) { body += chunk; console.log('here'); });
//     request.on('end', function () {
//       statusCode = 201;
//       response.writeHead(statusCode, headers);
      
//       // console.log ('body AS IS = ', body);
//       // console.log ('body AS IS TYPE = ', typeof body);
      
//       //HELPER FUNCITON TO CLEAN UP STRING
//       //body AS IS =  username=Bob&text=Hella+Cool!&roomname=lobby
//       var parseIt = function(string) {
//         //{"username":"Jono","message":"Do my bidding!"}

//         console.log ('Raw String: ', string);
//         if (string === undefined) { console.log('data body is undefined!'); }
//         var userNameFirst = (string.indexOf('username=')) + 9;
//         var userNameLast = (string.indexOf('&'));
//         var userName = string.slice(userNameFirst, userNameLast);
//         //console.log(userName);
        
//         var userTextFirst = (string.indexOf('text=')) + 5;
//         var userTextLast = (string.indexOf('&roomname'));
//         var messageString = string.slice(userTextFirst, userTextLast);
//         var spacedMessage = messageString.split('+').join(' ');
//         //console.log(spacedMessage);
        
//         return {username: userName, text: spacedMessage};
//       };

//       console.log ('body: ', typeof body);
//       // console.log('FINAL = ', responseLegible);
//       // console.log(JSON.stringify({results: madeUpDataBase[madeUpDataBase.length - 1] }));
//       try {
//         body = JSON.parse(body);
//       } catch (error) {
//         console.error ('body is not a json parsable string');
//       }
//       if (typeof body === 'string') {
//         var responseLegible = parseIt(body);
//       } else if (typeof body === 'object' && !Array.isArray(body)) {
//         let keys = Object.keys(body);
//         keys.forEach(function (element, index) {
//           madeUpDataBase[body[keys[index]]] = element;
//         });
//       }
//       madeUpDataBase.unshift(responseLegible);
//       response.end(JSON.stringify({results: madeUpDataBase[0] }));
//       console.log('CURRENT DB SNAPSHOT = ', madeUpDataBase);
      
//       return;

      
//     });
//     return;  
//   }
//   // .writeHead() writes to the request line and headers of the response,
//   // which includes the status and all headers.
//   response.writeHead(statusCode, headers);
  
//   // Make sure to always call response.end() - Node may not send
//   // anything back to the client until you do. The string you pass to
//   // response.end() will be the body of the response - i.e. what shows
//   // up in the browser.
//   //
//   // Calling .end "flushes" the response's internal buffer, forcing
//   // node to actually send all the data over to the client.
//   response.end('Hello, World!');
// };

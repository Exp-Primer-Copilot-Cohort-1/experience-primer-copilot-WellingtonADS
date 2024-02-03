// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);
    if (url_parts.pathname == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Hello World</p></body></html>');
        res.end();
    }
    else if (url_parts.pathname == '/form') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><form method="POST" action="/submit">');
        res.write('First Name: <input type="text" name="first"><br>');
        res.write('Last Name: <input type="text" name="last"><br>');
        res.write('<input type="submit"></form></body></html>');
        res.end();
    }
    else if (url_parts.pathname == '/submit') {
        var fullBody = '';
        req.on('data', function (chunk) {
            fullBody += chunk.toString();
        });
        req.on('end', function () {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html><body><p>Your name is: ' + querystring.parse(fullBody).first + ' ' + querystring.parse(fullBody).last + '</p></body></html>');
            res.end();
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<html><body><h1>404 Not Found</h1></body></html>');
        res.end();
    }
}).listen(8080);
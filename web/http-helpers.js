var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback, statusCode) {
  // var asset = archive.paths.archivedSites + '/' + asset;

  fs.readFile(asset, 'utf8', (err, data) => {
    
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    } 
    res.writeHead(200, this.headers);
    res.end(data);
    
    // console.log('this is data', data)
    // callback(data.toString());
    // sitesArray = sitesText.split('\n');
  });
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  //Maybe use asset to put into response
};



// As you progress, keep thinking about what helper functions you can put here!

var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers.js');
// require more modules/folders here!


//Next step:
//Take index's form input
//Check it against the url list 

var url;
var archivedSite;
exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    var url = req.url.slice(1);
    // console.log('url at beginning: ', url);

    archive.isUrlInList(url, (bool) => {
      if (bool) {
        console.log('url when found in list: ', url);
        archive.isUrlArchived(url, (bool2) => {
          statusCode = 200;
          helpers.serveAssets(res, url, (page) => {
            res.end(page);
          });
        }); 
      } else {
        console.log('url when NOT found in list: ', url);
        archive.addUrlToList(url, () => {
          statusCode = 404;
          helpers.serveAssets(res, archive.paths.siteAssets + '/loading.html', (page) => {
            res.end(page);
          });
        });
      }
    });
    console.log('status code: ', statusCode);
    // res.end();
    fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data) {
      if (err) {
        statusCode = 404;
        res.end();
        throw err;
      }
      res.end(data);
    });
  } else if (req.method === 'POST') {
    var body = [];

    req.on('data', function(chunk) {
      body.push(chunk);
    });

    req.on('end', function(chunk) {
      body = Buffer.concat(body).toString();
      url = body.slice(4);
      // archivedSite = archive.isUrlInList(url, readList);
      archive.readListOfUrls(function(sitesText) {
        archive.isUrlInList(url, function(sitesText) {
          
        });
      });
    });
    res.end();
  }
  // res.end(archive.paths.list); WILL NEED THIS LATER...?
};

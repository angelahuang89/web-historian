var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};


// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //uses readFile to go through list
  // var sitesArray;
  fs.readFile(exports.paths.list, function(err, data) {
    var sitesText = data.toString();
    // sitesArray = sitesText.split('\n');
    callback(sitesText.split('\n'));
  });
  // return sitesArray;
  //return callback=(isUrlInList) value
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data) {
    callback(data.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {

  fs.appendFile(exports.paths.list, (url + '\n'), function(err, data) {
    if (err) {
      throw err;
    }
    callback();
  });
    
};

exports.isUrlArchived = function(url, callback) {
  //returns true or false
  callback(fs.existsSync(this.paths.archivedSites + '/' + url));
  
};

exports.downloadUrls = function(urls) {
  urls.forEach((url) => {
    request('http://' + url, (err, response, body) => {
      fs.writeFile(this.paths.archivedSites + '/' + url, body, 'utf8', function(err) {
        if (err) {
          throw err;
        }
      });
    });
  });


};

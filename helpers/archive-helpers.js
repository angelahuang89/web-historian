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
    // console.log('this is url: ', url);
    // console.log('this is data: ', data);
    callback(data.includes(url));
  });
//call this function first after given a POSTed url
  
//sites.txt: ['www.google.com', 'yahoo.com']
  // if (sitesText.includes(url)) {
  //   if (isUrlArchived(url)) {
  //     fs.readFile(archivedSites + '/' + url, 'utf8', function(err, data) {
  //       if (err) {
  //         throw err;
  //       }
  //       var archivedPage = data.toString();
  //       return archivedPage;
  //     });
  //   } else {
  //     fs.readFile(siteAssets + '/loading.html', 'utf8', function(err, data) {
  //       if (err) {
  //         throw err;
  //       }

  //       return data.toString();
  //     });
  //   }
  // } else {
  //   addUrlToList(url);
  // }
//if url exists in list
  //call isUrlArchived
    //if UrlArchived is true
      //serve the stored page
    //else
      //serve the loading page
//else 
  //call addUrlToList
};

exports.addUrlToList = function(url, callback) {

  fs.appendFile(exports.paths.list, url, function(err, data) {
    if (err) {
      throw err;
    }
    console.log('url: ', url);
    console.log('list? ', exports.paths.list);
    callback();
  });
    
};

exports.isUrlArchived = function(url, callback) {
  //returns true or false
  callback(fs.existsSync(this.paths.archivedSites + '/' + url));
  
};

exports.downloadUrls = function(urls) {
  console.log('these are our urls: ', urls);
  console.log('paths/archivedSites: ', this.paths.archivedSites);
  
  //SEE TESTING.JS FILE TAB ABOVE

  // request('http://www.google.com', function (error, response, body) {
  //   console.log('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the HTML for the Google homepage.
  // });

  urls.forEach((url) => {
    request(url, (err, response, body) => {
      fs.writeFile(this.paths.archivedSites + '/' + url, body, 'utf8', function(err) {
        if (err) {
          throw err;
        }
      });
    });
  });


};

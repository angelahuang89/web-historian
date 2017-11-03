// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var cron = require('node-cron');

var task = cron.schedule('*/1 * * * *', function() {
  console.log('cron job ran!');
  archive.readListOfUrls((arr) => {
    archive.downloadUrls(arr);
  });
});

task.start();

// invoke readListOfUrls
// invoke downloadUrls with the correct list of urls
// MAYBE write cron scheduling in here?
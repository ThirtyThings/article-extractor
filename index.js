var request = require('request');
var url = require('url');
var cleaner = require('./lib/cleaner');
var author = require('./lib/parser/author');
var content = require('./lib/parser/content');
var title = require('./lib/parser/title');
var summary = require('./lib/parser/summary');

module.exports = {
  extractData: function (articleUrl, callback) {
    var opts = {headers: {
      'User-Agent': 'Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0'
    }}
    request(articleUrl, opts, function (err, response, body) {
      if(err) return callback(err)
      if(res.statusCode != 200) return callback('Invalid response')
      var data = {};
      var preppedHtml = cleaner.prepForParsing(body);

      data.domain = url.parse(articleUrl).host;
      data.author = author.getAuthor(preppedHtml);
      data.title = title.getTitle(preppedHtml);
      data.content = content.getArticleContent(preppedHtml, data.host);
      data.summary = summary.getSummary(preppedHtml, data.content);

      callback(null, data);
    });
  }
}

'use strict';

module.exports = function (Business) {
    // make biz title unique
    Business.validatesUniquenessOf('title');
    // [GET] request to fetch all businesses by keywords
    Business.fetchByKeywords = function (keywords, cb) {
        var keys = keywords.split(' '); // every word is considered seprately
        console.log(keys); // output keys
        Business.find(function (err, results) { // consider adding search limit
            if (err) return cb(err)
            var matches = [];
            var k = 0;
            // loop throught
            for (var i = 0; i < results.length; i++) {

                for (var j = 0; j < keys.length; j++)

                    if (results[i].title.toLowerCase().includes(keys[j].toLowerCase()) ||
                        results[i].about.toLowerCase().includes(keys[j].toLowerCase()) ||
                        results[i].status.toLowerCase().includes(keys[j].toLowerCase())) {
                        matches[k++] = results[i];
                        // list.splice( list.indexOf(match), 1 );
                        break;
                    }
            }
            // console.log(matches);
            return cb(null, matches);
        });
    };

    Business.remoteMethod(
        'fetchByKeywords', {
        http: {
            path: '/fetchByKeywords',
            verb: 'get'
        },
        accepts: {
            arg: 'keywords',
            type: 'any',
            http: {
                source: 'query'
            }
        },
        returns: {
            arg: 'matches',
            type: 'array'
        }
    }
    );

    Business.globalSearch = function (config, cb) {
        console.log(config)
        // var keys = keywords.split(' '); // every word is considered seprately
        // console.log(keys); // output keys
        Business.find(function (err, results) { // consider adding search limit
            if (err) return cb(err)
            var matches = [];
            Business.fetchByKeywords(config.patterns.term, function (err, rows) {
                var k = 0;

                return cb(null, rows);
            });
        });
    };

    Business.remoteMethod(
        'globalSearch', {
        http: {
            path: '/globalSearch',
            verb: 'post'
        },
        accepts:
        {
            arg: 'patterns',
            type: 'any',
            http: {
                source: 'body'
            }
        },
        returns: {
            arg: 'matches',
            type: 'array'
        }
    }
    );
};

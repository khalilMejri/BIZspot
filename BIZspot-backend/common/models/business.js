'use strict';

module.exports = function (Business) {
    // make biz title unique
    Business.validatesUniquenessOf('title');
    // [GET] request to fetch all businesses by keywords
    Business.fetchByKeywords = function (keywords, cb) {
        Business.find(function (err, matches) {
            var response = [];
            var k = 0;
            for (var i = 0; i < matches.length; i++) {

                for (var j = 0; j < keywords.length; j++)
                    if (matches[i].title.toLowerCase().includes(keywords[j].toLowerCase()) ||
                        matches[i].about.toLowerCase().includes(keywords[j].toLowerCase()) ||
                        matches[i].status.toLowerCase().includes(keywords[j].toLowerCase())) {
                        response[k++] = matches[i];
                        // list.splice( list.indexOf(match), 1 );
                        break;
                    }
            }
            console.log(response);
            cb(null, response);
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
            type: 'any'
        }
    }
    );
};

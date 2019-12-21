'use strict';

module.exports = function (Business) {
    // make biz title unique
    Business.validatesUniquenessOf('title');
    // require instance of loopback server
    var app = require("../../server/server");

    /**
     * @GET request to fetch all businesses by keywords
     **/
    Business.fetchByKeywords = function (keywords, cb) {
        var keys = keywords.split(' '); // every word is considered seprately
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

    /**
     * @POST request to fetch all businesses by multiple creterias
     **/
    Business.globalSearch = function (config, cb) {
        // // console.log(keys); // output keys
        Business.find(function (err, all) { // consider adding search limit
            if (err) return cb(err)
            Business.fetchByKeywords(config.patterns.term, function (err, rows) {
                if (rows.length == 0) rows = all // all biz returned
                Business.fetchByCategory(rows, config.patterns.category, function (err, rows) {
                    if (rows.length == 0)
                        return cb(null, rows); // return no data to match
                    else
                        Business.fetchByLevel(rows, config.patterns.stars, function (err, rows) {
                            if (rows.length == 0)
                                return cb(null, rows); // return no data to match
                            else
                                Business.fetchByReviews(rows, config.patterns.reviews, function (err, rows) {
                                    if (rows.length == 0)
                                        return cb(null, rows); // return no data to match
                                    else
                                        Business.fetchByLocation(rows, config.location, function (err, rows) {
                                            return cb(null, rows); // return result matched
                                        });
                                });
                        });
                });
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


    /**
    * @Model [PROTOTYPE] method to fetch all businesses by category
    **/
    Business.fetchByCategory = function (rows, category, cb) {
        if (category != "") {
            var matches = [];
            rows.filter((biz, index) => {
                app.models.category.findOne({ where: { id: biz.categoryId } }, function (err, first) {
                    if (err) return false;
                    if (first.name == category) {
                        matches.push(biz);
                    }
                    if (index == rows.length - 1) return cb(null, matches)
                    return true;
                })
            });
        }
        else return cb(null, rows);
    };


    /**
     * @Model [PROTOTYPE] method to fetch all businesses by level
     **/
    Business.fetchByLevel = function (rows, level, cb) {
        if (level != "") {
            var matches = rows.filter((row) => { return row.level == level });
            return cb(null, matches);
        }
        return cb(null, rows);
    };

    /**
     * @Model [PROTOTYPE] method to fetch all businesses by reviews pattern
     **/
    Business.fetchByReviews = function (rows, reviews, cb) {
        var matches = [];
        if (reviews == "") return cb(null, rows)
        if (reviews == "top") { // top rated
            for (let index = 0; index < rows.length; index++) {
                let biz = rows[index];
                biz.reviews.find({ where: { 'rating': { gt: 2 } } }, function (err, results) { // greater than 2 stars
                    if (results.length > 0) matches.push(biz)
                    if (index == rows.length - 1) {
                        return cb(null, matches);
                    }
                })
            }
        }
        else { // least rated
            for (let index = 0; index < rows.length; index++) {
                let biz = rows[index];
                biz.reviews.find({ where: { 'rating': { lt: 3 } } }, function (err, results) { // greater than 2 stars
                    if (results.length > 0) matches.push(biz)
                    if (index == rows.length - 1) {
                        return cb(null, matches);
                    }
                })
            }
        }

    };

    /**
     * @Model [PROTOTYPE] method to fetch all businesses by location coords
     **/
    Business.fetchByLocation = function (rows, location, cb) {
        var matches = [];
        if (location.lat != null & location.lng != null) { // match location if exists
            for (let index = 0; index < rows.length; index++) {
                let biz = rows[index];
                app.models.location.findOne({ where: { 'id': biz.locationId } }, function (err, bizLocaltion) { // greater than 2 stars
                    let roundedLat = Math.round(location.lat * 10) / 10
                    let roundedLng = Math.round(location.lng * 10) / 10

                    let roundedBizLat = Math.round(bizLocaltion.latitude * 10) / 10
                    let roundedBizLng = Math.round(bizLocaltion.longitude * 10) / 10

                    if (roundedBizLat == roundedLat && roundedBizLng == roundedLng)
                        matches.push(biz)

                    if (index == rows.length - 1) {
                        return cb(null, matches);
                    }
                })
            }
        }
        else {
            return cb(null, rows);
        }
    };
};

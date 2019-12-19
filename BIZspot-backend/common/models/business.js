'use strict';

module.exports = function (Business) {
    // make biz title unique
    Business.validatesUniquenessOf('title');
    var app = require("../../server/server");

    /**
     * @GET request to fetch all businesses by keywords
     **/
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

    /**
     * @POST request to fetch all businesses by multiple creterias
     **/
    Business.globalSearch = function (config, cb) {
        console.log(config)
        // var keys = keywords.split(' '); // every word is considered seprately
        // console.log(keys); // output keys
        Business.find(function (err, all) { // consider adding search limit
            if (err) return cb(err)
            var matches = [];

            Business.fetchByKeywords(config.patterns.term, function (err, rows) {
                if (rows.length == 0) rows = all // all biz returned
                else
                    Business.fetchByCategory(rows, config.patterns.category, function (err, rows) {
                        if (rows.length == 0)
                            return cb(null, rows); // return no data to match
                        else
                            Business.fetchByLevel(rows, config.patterns.level, function (err, rows) {
                                if (rows.length == 0)
                                    return cb(null, rows); // return no data to match
                                else
                                    Business.fetchByReviews(rows, config.patterns.reviews, function (err, rows) {
                                        if (rows.length == 0)
                                            return cb(null, rows); // return no data to match
                                        else
                                            Business.fetchByLocation(rows, config.patterns.location, function (err, rows) {
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
        console.log(rows); // output keys
        console.log(category); // output keys
        if (category != "") {
            var matches = rows.filter((row) => { return row.category == category });
            // console.log(matches);
            return cb(null, matches);
        }
        return cb(null, rows);
    };


    /**
     * @Model [PROTOTYPE] method to fetch all businesses by level
     **/
    Business.fetchByLevel = function (rows, level, cb) {
        console.log(rows); // output keys
        console.log(level); // output keys
        if (level != "") {
            var matches = rows.filter((row) => { return row.level == level });
            // console.log(matches);
            return cb(null, matches);
        }
        return cb(null, rows);
    };

    /**
     * @Model [PROTOTYPE] method to fetch all businesses by reviews pattern
     **/
    Business.fetchByReviews = function (rows, reviews, cb) {
        console.log(rows); // output keys
        console.log(reviews); // output keys
        var matches = [];
        if (reviews == "top") { // top rated
            for (let index = 0; index < rows.length; index++) {
                let biz = rows[index];
                biz.reviews.count({ where: { 'rating': { gt: 2 } } }, function (err, counter) { // greater than 2 stars
                    if (counter > 0) matches.push(biz)
                })

            }
            // console.log(matches);
        }
        else { // least rated
            for (let index = 0; index < rows.length; index++) {
                let biz = rows[index];
                biz.reviews.count({ where: { 'rating': { lt: 3 } } }, function (err, counter) { // lower than 3 stars
                    if (counter > 0) matches.push(biz)
                })

            }
        }
        console.log(matches);
        return cb(null, matches);
    };

    /**
     * @Model [PROTOTYPE] method to fetch all businesses by location coords
     **/
    Business.fetchByLocation = function (location, cb) {
        console.log(rows); // output keys
        console.log(location); // output keys
        var matches = [];
        if (location.lat != null & location.lng != null) { // match location if exists
            for (let index = 0; index < rows.length; index++) {
                let biz = rows[index];
                app.models.location.find({ where: { 'id': biz.locationId } }, function (err, bizLocaltion) { // greater than 2 stars
                    let roundedLat = Math.round(location.lat * 100) / 100
                    let roundedLng = Math.round(location.lng * 100) / 100

                    let roundedBizLat = Math.round(bizLocaltion.lat * 100) / 100
                    let roundedBizLng = Math.round(bizLocaltion.lng * 100) / 100

                    if (roundedBizLat == roundedLat && roundedBizLng == roundedLng)
                        matches.push(biz)
                })

            }
            // console.log(matches);
            return cb(null, matches);

        }
    };

};

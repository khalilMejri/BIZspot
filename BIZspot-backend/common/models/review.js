'use strict';

module.exports = function (Review) {

    var app = require("../../server/server")
    Review.afterRemote('create', function (ctx, review, next) {
        console.log('review has been saved', review);
        var Business = app.models.Business;


        next();
    });
};

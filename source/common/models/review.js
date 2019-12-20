'use strict';

module.exports = function (Review) {
    // loopback instance
    var app = require("../../server/server")
    // after creation trigger update level
    Review.afterRemote('create', function (ctx, review, next) {
        console.log('review has been saved', review);
        var Business = app.models.Business; // Business model
        // get all reviews
        Review.find({ where: { businessId: review.businessId } }, function (err, reviews) {
            var totalScore = 0;
            for (let index = 0; index < reviews.length; index++) {
                totalScore += reviews[index].rating
            }
            console.log(totalScore)
            // update biz level
            Business.findOne({ where: { id: review.businessId } }, function (err, mBusiness) {
                // calculate new level
                mBusiness.level = Math.round(totalScore / reviews.length)
                mBusiness.save(function (err, savedBiz) {
                    if (err) console.log(err)
                })
            })
            next();
        })
    });
};

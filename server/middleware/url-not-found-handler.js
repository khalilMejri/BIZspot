'use strict';
var path = require('path');

module.exports = function () {
    //4XX - URLs not found
    return function customRaiseUrlNotFoundError(req, res, next) {
        res.sendFile(path.resolve(__dirname, '../../client/dist/BIZspot-frontend/index.html'));
    };
};
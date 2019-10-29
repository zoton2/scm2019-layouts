"use strict";
/* eslint global-require: off */
const nodecg_1 = require("./util/nodecg");
module.exports = (nodecg) => {
    nodecg_1.set(nodecg);
    require('./util/obs'); // Make sure OBS connection is setup.
    require('./tracker');
    require('./layouts');
};

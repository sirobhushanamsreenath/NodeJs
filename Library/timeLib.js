const moment = require('moment');
const momenttz = require('moment-timezone');
let timezone = 'Asia/Calcutta';

let now = () =>{
    return moment.utc().format();
}

let getLocalTime = () =>{
    return moment().tz(timezone).format();
}

let convertToLocalTime = (time) => {
    return momenttz().tz(time, timezone).format('LLLL');
}

module.exports = {
    now : now,
    getLocalTime : getLocalTime,
    convertToLocalTime : convertToLocalTime
}
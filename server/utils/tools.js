
function base64Decode (str = '') {
    if (str == '') {
        console.log('base64Decode param str ' + str + 'is an empty string');
    }
    var ret = new Buffer(str, 'base64').toString();
    return ret;
}

function base64Encode (str = '') {
    if (str == '') {
        console.log('base64Encode param str ' + str + 'is an empty string');
    }
    var ret = new Buffer(str).toString('base64');
    return ret;
}

function getTotalPage (total,perpage) {
    var num = total - 1;
    if (num < 0) num = 0;
    return parseInt(num/perpage) + 1;
}


module.exports = {
    base64Decode,
    base64Encode,
    getTotalPage
}
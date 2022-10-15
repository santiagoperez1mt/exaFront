function isNumeric(numstr) {
    if (numstr.match(/^\d+$/)) {
        return true;
    } else {
        return false;
    }
}

const exportObj = {
    isNumeric,
};

export default exportObj;

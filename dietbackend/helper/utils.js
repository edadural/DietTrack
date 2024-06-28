// utils.js
const formatString = (val) => {
    isEmptyorNull(val)
    val = val.trim();
    val = val
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    return val;
};

function isValidEmail(val) {
    isEmptyorNull(val)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(val);
}

function isValidTCNumber(val) {
    isNullOrEmpty(val)
    if (!/^\d{11}$/.test(val)) {
        return false; // 11 haneli olmalı
    }

    const digits = val.split('').map(Number);
    const checksum = digits.reduce((sum, digit, index) => {
        if (index < 10) {
            sum += digit;
        }
        return sum;
    }, 0);

    const lastDigit = digits[10];
    const calculatedLastDigit = (checksum % 10 === 1) ? 0 : (10 - (checksum % 10));

    return lastDigit === calculatedLastDigit;
}

function isNullOrEmpty(val) {
    if (!val)
        return true
    if (val === "")
        return true
    if (val === undefined)
        return true
    return false
}

function isNumber(val) {
    return typeof val === 'number';
}

module.exports = {
    isValidEmail,
    isValidTCNumber,
    formatString,
    isNullOrEmpty,
    isNumber,
};

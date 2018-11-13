module.exports = (str) => {
    if (typeof str != "string") {
        return null
    } else {
        return str.charAt(0).toUpperCase() + str.substring(1)
    };
};

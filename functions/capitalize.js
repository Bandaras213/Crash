module.exports = (str) => {

    if (typeof str == "string") {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();

    } else if (typeof str == "object") {
        let arr2str = "";
        for (let i = 0; i < str.length; i++) {
            arr2str += str[i].charAt(0).toUpperCase() + str[i].substring(1).toLowerCase() + " ";
        };
        return arr2str
    } else {
        return undefined
    };
};
 
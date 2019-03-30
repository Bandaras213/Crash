module.exports = (str) => {

    if (typeof str == "string") {

        let str2arr = str.split(/(?: |_)+/);
        let arr2str = [];
        for (let i = 0; i < str2arr.length; i++) {
            arr2str.push(str2arr[i].charAt(0).toUpperCase() + str2arr[i].substring(1).toLowerCase());
        };
        return arr2str.join(" ");

    } else if (typeof str == "object") {
        let arr2str = [];
        for (let i = 0; i < str.length; i++) {
            arr2str.push(str[i].charAt(0).toUpperCase() + str[i].substring(1).toLowerCase());
        };
        return arr2str.join(" ");
    } else {
        return undefined;
    };
};
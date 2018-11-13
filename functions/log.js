module.exports = (msg, title) => {
    if (!title) title = "Log";
    if (title === "Error") {
        return console.error(`[${title}] ${JSON.stringify(msg, Object.getOwnPropertyNames(msg))}`);
    } else {
        console.log(`[${title}] ${msg}`);
    }
};

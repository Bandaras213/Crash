const fetch = require('node-fetch');

module.export = async (bot) => {
    
    let username
    let password
    let clientid
    let clientsecret

    if (process.env.KITSUUSERNAME) {
        username = process.env.KITSUUSERNAME
    } else {
        username = bot.config.KITSUUSERNAME
    };

    if (process.env.KITSUPASSWORD) {
        password = process.env.KITSUPASSWORD
    } else {
        password = bot.config.KITSUPASSWORD
    };

    if (process.env.KITSUCLIENTID) {
        password = process.env.KITSUCLIENTID
    } else {
        password = bot.config.KITSUCLIENTID
    };

    if (process.env.KITSUCLIENTSECRET) {
        password = process.env.KITSUCLIENTSECRET
    } else {
        password = bot.config.KITSUCLIENTSECRET
    };


    const body = {
        grant_type: 'password',
        username: username,
        password: password,
        client_id: clientid,
        client_secret: clientsecret
    };

    await fetch('https://kitsu.io/api/oauth/token', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => console.log(json));

};
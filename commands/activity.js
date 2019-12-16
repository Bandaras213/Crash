const fetch = require("node-fetch");
const moment = require("moment")
const activity = require("../data/activity.js");
const query = require("../data/userquery.js");

module.exports = async (bot, message, args, Discord) => {
    let variables1;
    let variables2;
    let username;
    let userid;
    let array = [];

    message.delete();

    if (args[0] == undefined) {
        return message.channel.send("Please use a Anilist Username.")
    } else {
        username = args[0]
        variables1 = {
            name: username,
        };
    }

    await query;

    let databody1 = {
        query: query,
        variables: variables1
    };

    await fetch("https://graphql.anilist.co", {
            method: "post",
            body: JSON.stringify(databody1),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        .then(fetch1 => fetch1.json())
        .then(async fetch1 => {

            if (fetch1.data.User == null) {
                return message.channel.send("Didn´t find Username: " + username + " please use a valide Username or check the spelling.")
            } else {
                userid = fetch1.data.User.id
            }
        })


    await activity;

    variables2 = {
        userId: userid,
    };

    let databody2 = {
        query: activity,
        variables: variables2
    };
    await fetch("https://graphql.anilist.co", {
            method: "post",
            body: JSON.stringify(databody2),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        .then(fetch2 => fetch2.json())
        .then(async fetch2 => {

            function datas() {
                for (let a = 0; a < fetch2.data.Page.activities.length; a++) {
                    let user = fetch2.data.Page.activities[0].user.name;
                    let avatar = fetch2.data.Page.activities[0].user.avatar.large;
                    let userurl = fetch2.data.Page.activities[0].user.siteUrl;
                    let title = fetch2.data.Page.activities[a].media.title.romaji;
                    let createdat = fetch2.data.Page.activities[a].createdAt;
                    let timeconv = moment.unix(createdat).utc().format("DD-MM-YYYY HH:mm");
                    let url = fetch2.data.Page.activities[a].media.siteUrl;
                    let titleurl = `[${title}](${url})`
                    let progress = fetch2.data.Page.activities[a].progress;
                    let episodes = fetch2.data.Page.activities[a].media.episodes;
                    let status = fetch2.data.Page.activities[a].status;

                    if (status == "dropped") {
                        progress = "0"
                    } else if (status == "completed") {
                        progress = episodes
                    } else if (status == "plans to watch") {
                        progress = "0"
                    }

                    if (a == 0) {
                        array.push({
                            author: {
                                name: user,
                                icon_url: avatar,
                                url: userurl,
                            },
                            thumbnail: {
                                url: avatar,
                            },
                            fields: []
                        })

                        array[0].fields.push({
                            name: '\u200b',
                            value: titleurl,
                        }, {
                            name: bot.caps(status) + ":",
                            value: progress + " / " + episodes,
                        }, {
                            name: "Created At:",
                            value: timeconv,
                        }, )
                    } else if (a == fetch2.data.Page.activities.length) {
                        array[0].fields.push({
                            name: '\u200b',
                            value: titleurl,
                        }, {
                            name: bot.caps(status) + ":",
                            value: progress + " / " + episodes,
                        })
                    } else {
                        array[0].fields.push({
                            name: '\u200b',
                            value: titleurl,
                        }, {
                            name: bot.caps(status) + ":",
                            value: progress + " / " + episodes,
                        }, {
                            name: "Created At:",
                            value: timeconv,
                        },)
                    }
                }
                sendmessage()
            }

            function sendmessage() {
                let embed1 = new Object(array[0])
                message.channel.send({
                    embed: embed1
                })
            }

            switch (fetch2.data.Page.activities.length) {
                case 0:
                    message.channel.send("The Requested user doesn´t have Activitys to share.")
                    break;
                case 1:
                    message.channel.send("Here is the last Activity from user " + username)
                    datas()
                    break;
                case 2:
                    message.channel.send("Here are the last 2 Activitys from user " + username)
                    datas()
                    break;
                case 3:
                    message.channel.send("Here are the last 3 Activitys from user " + username)
                    datas()
                    break;
                case 4:
                    message.channel.send("Here are the last 4 Activitys from user " + username)
                    datas()
                    break;
                case 5:
                    message.channel.send("Here are the last 5 Activitys from user " + username)
                    datas()
                    break;
                case 6:
                    message.channel.send("Here are the last 6 Activitys from user " + username)
                    datas()
                    break;
            }
        })
}
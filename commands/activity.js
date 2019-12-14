const fetch = require("node-fetch");
const fs = require("fs");
const activity = require("../data/activity.js");
const query = require("../data/userquery.js");

module.exports = async (bot, message, args, Discord) => {
    let variables1;
    let variables2;
    let username;
    let userid;
    let embed1;
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
            switch (fetch2.data.Page.activities.length) {
                case 0:
                    message.channel.send("The Requested user doesn´t have Activitys to share.")
                    break;
                case 1:
                    message.channel.send("Here are the last Activitys from user " + username)
                    for (let a = 0; a < 1; a++) {
                        let title = fetch2.data.Page.activities[a].media.title.romaji;
                        let url = fetch2.data.Page.activities[a].media.siteUrl;
                        let thumbnail = fetch2.data.Page.activities[a].media.coverImage.large;
                        let progress = fetch2.data.Page.activities[a].progress;
                        let episodes = fetch2.data.Page.activities[a].media.episodes;
                        let status = fetch2.data.Page.activities[a].status;
                        if (status == "dropped") {
                            progress = "0"
                        } else if (status == "completed") {
                            progress = episodes
                        }

                        array.push(embed1 = new Discord.RichEmbed()
                            .setTitle(title)
                            .setURL(url)
                            .setAuthor(username)
                            .setThumbnail(thumbnail)
                            .addField(bot.caps(status) + ":", progress + " / " + episodes, true)
                            .setTimestamp())
                        message.channel.send(embed1)
                    }
                    break;
                case 2:
                    message.channel.send("Here are the last 2 Activitys from user " + username)
                    for (let a = 0; a < 2; a++) {
                        let title = fetch2.data.Page.activities[a].media.title.romaji;
                        let url = fetch2.data.Page.activities[a].media.siteUrl;
                        let thumbnail = fetch2.data.Page.activities[a].media.coverImage.large;
                        let progress = fetch2.data.Page.activities[a].progress;
                        let episodes = fetch2.data.Page.activities[a].media.episodes;
                        let status = fetch2.data.Page.activities[a].status;
                        if (status == "dropped") {
                            progress = "0"
                        } else if (status == "completed") {
                            progress = episodes
                        }

                        array.push(embed1 = new Discord.RichEmbed()
                            .setTitle(title)
                            .setURL(url)
                            .setAuthor(username)
                            .setThumbnail(thumbnail)
                            .addField(bot.caps(status) + ":", progress + " / " + episodes, true)
                            .setTimestamp())
                        message.channel.send(embed1)
                    }
                    break;
                case 3:
                    message.channel.send("Here are the last 3 Activitys from user " + username)
                    for (let a = 0; a < 3; a++) {
                        let title = fetch2.data.Page.activities[a].media.title.romaji;
                        let url = fetch2.data.Page.activities[a].media.siteUrl;
                        let thumbnail = fetch2.data.Page.activities[a].media.coverImage.large;
                        let progress = fetch2.data.Page.activities[a].progress;
                        let episodes = fetch2.data.Page.activities[a].media.episodes;
                        let status = fetch2.data.Page.activities[a].status;
                        if (status == "dropped") {
                            progress = "0"
                        } else if (status == "completed") {
                            progress = episodes
                        }

                        array.push(embed1 = new Discord.RichEmbed()
                            .setTitle(title)
                            .setURL(url)
                            .setAuthor(username)
                            .setThumbnail(thumbnail)
                            .addField(bot.caps(status) + ":", progress + " / " + episodes, true)
                            .setTimestamp())
                        message.channel.send(embed1)
                    }
                    break;
                case 4:
                    message.channel.send("Here are the last 4 Activitys from user " + username)
                    for (let a = 0; a < 4; a++) {
                        let title = fetch2.data.Page.activities[a].media.title.romaji;
                        let url = fetch2.data.Page.activities[a].media.siteUrl;
                        let thumbnail = fetch2.data.Page.activities[a].media.coverImage.large;
                        let progress = fetch2.data.Page.activities[a].progress;
                        let episodes = fetch2.data.Page.activities[a].media.episodes;
                        let status = fetch2.data.Page.activities[a].status;
                        if (status == "dropped") {
                            progress = "0"
                        } else if (status == "completed") {
                            progress = episodes
                        }

                        array.push(embed1 = new Discord.RichEmbed()
                            .setTitle(title)
                            .setURL(url)
                            .setAuthor(username)
                            .setThumbnail(thumbnail)
                            .addField(bot.caps(status) + ":", progress + " / " + episodes, true)
                            .setTimestamp())
                        message.channel.send(embed1)
                    }
                    break;
            }
        })
}
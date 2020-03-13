const fetch = require("node-fetch");
const moment = require("moment")
const activity = require("../data/activity.js");
const query = require("../data/userquery.js");
const Canvas = require("canvas");

module.exports = async (bot, message, args, Discord) => {
    let variables1;
    let variables2;
    let username;
    let userid;
    let profilecolor;
    let progresscombi;

    //Set Font and font size check

    const applyText = (canvas, text, fontsize, style) => {
        const ctx = canvas.getContext("2d");
        do {
            ctx.font = `${style} ${(fontsize -= 2)}px Arial`;
        } while (ctx.measureText(text).width > 600);
        return ctx.font;
    };

    //-------------------------------

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
                profilecolor = fetch1.data.User.options.profileColor
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

            const canvas = Canvas.createCanvas(866, 1184);
            const ctx = canvas.getContext("2d");

            //Background

            ctx.fillStyle = "#272c38";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //-------------------------------

            //Highlights Function

            function highlight(hx, hy) {
                ctx.fillStyle = "#1f232d";
                ctx.strokeStyle = "#1f232d"
                ctx.lineJoin = "round";
                ctx.lineWidth = 8;
                ctx.strokeRect(hx + (8 / 2), hy + (8 / 2), 734 - 8, 136 - 8);
                ctx.fillRect(hx + (8 / 2), hy + (8 / 2), 734 - 8, 136 - 8);
            }

            //-------------------------------

            //Rounded Image Corner Function

            function roundpicture(px, py, pwidth, pheight) {
                let radius = 4;
                ctx.beginPath();
                ctx.moveTo(px + radius, py);
                ctx.lineTo(px + pwidth - radius, py);
                ctx.quadraticCurveTo(px + pwidth, py, px + pwidth, py + radius);
                ctx.lineTo(px + pwidth, py + pheight - radius);
                ctx.quadraticCurveTo(px + pwidth, py + pheight, px + pwidth - radius, py + pheight);
                ctx.lineTo(px + radius, py + pheight);
                ctx.quadraticCurveTo(px, py + pheight, px, py + pheight - radius);
                ctx.lineTo(px, py + radius);
                ctx.quadraticCurveTo(px, py, px + radius, py);
                ctx.closePath();
            }

            //-------------------------------

            //Avatar + Name + URL Highlight

            highlight(66, 66);

            //-------------------------------

            //Avatar

            const avatar = await Canvas.loadImage(fetch2.data.Page.activities[0].user.avatar.large);
            ctx.save();
            roundpicture(65, 69, 130, 130);
            ctx.clip();
            ctx.drawImage(avatar, 65, 69, 130, 130);
            ctx.restore();

            //-------------------------------

            //ALIcon

            const alicon = await Canvas.loadImage("https://anilist.co/img/icons/icon.svg");
            ctx.drawImage(alicon, 620, 83, 105, 105);

            //-------------------------------

            //Username

            ctx.font = applyText(canvas, fetch2.data.Page.activities[0].user.name, 50);
            ctx.fillStyle = "#bbbbbb";
            ctx.textAlign = "left";
            ctx.fillText(fetch2.data.Page.activities[0].user.name, 215, 134);

            //-------------------------------

            //UserURL

            ctx.font = applyText(canvas, fetch2.data.Page.activities[0].user.siteUrl, 25);
            ctx.fillStyle = "#bbbbbb";
            ctx.textAlign = "left";
            ctx.fillText(fetch2.data.Page.activities[0].user.siteUrl, 215, 170);

            //-------------------------------

            //Get Profile Color

            if (profilecolor.charAt(0) != "#") {
                switch (profilecolor) {
                    case "blue":
                        profilecolor = "#3db4f2"
                        break;
                    case "purple":
                        profilecolor = "#c063ff"
                        break;
                    case "pink":
                        profilecolor = "#fc9dd6"
                        break;
                    case "orange":
                        profilecolor = "#ef881a"
                        break;
                    case "red":
                        profilecolor = "#e13333"
                        break;
                    case "green":
                        profilecolor = "#4cca51"
                        break;
                    case "gray":
                        profilecolor = "#677b94"
                        break;
                }
            }

            //-------------------------------

            //Activitys

            let ahy = 222;
            let thx = 172;
            let thy = 256;
            for (let aa = 0; aa < fetch2.data.Page.activities.length; aa++) {
                let image = fetch2.data.Page.activities[aa].media.coverImage.large;
                let title = fetch2.data.Page.activities[aa].media.title.romaji;
                let createdat = fetch2.data.Page.activities[aa].createdAt;
                let timeconv = moment.unix(createdat).utc().format("DD.MM.YYYY HH:mm");
                let progress = fetch2.data.Page.activities[aa].progress;
                let episodes = fetch2.data.Page.activities[aa].media.episodes;
                let status = fetch2.data.Page.activities[aa].status;
                let mediastatus = fetch2.data.Page.activities[aa].media.status;

                if (mediastatus == "NOT_YET_RELEASED") {
                    progresscombi = "Not Yet Released"
                } else {
                    if (status == "dropped") {
                        progresscombi = "Dropped"
                    } else if (status == "completed") {
                        progresscombi = "Completed";
                    } else if (status == "watched episode") {
                        progresscombi = "Watched Episode " + progress + " / " + episodes;
                    } else if (status == "plans to watch") {
                        progresscombi = bot.caps(status)
                    }
                }

                highlight(66, ahy);

                const picture = await Canvas.loadImage(image);
                ctx.save();
                roundpicture(66, ahy, 87, 136);
                ctx.clip();
                ctx.drawImage(picture, 66, ahy, 87, 136);
                ctx.restore();

                ctx.font = applyText(canvas, progresscombi, 20);
                ctx.fillStyle = "#bbbbbb";
                ctx.fillText(progresscombi, thx, thy);

                ctx.font = applyText(canvas, title, 20);
                ctx.fillStyle = profilecolor;
                ctx.fillText(title, thx, thy + 30);

                ctx.font = applyText(canvas, timeconv, 20);
                ctx.fillStyle = "#bbbbbb";
                ctx.fillText(timeconv, thx, thy + 80);

                ahy = ahy + 156;
                thy = thy + 156;
            }

            //-------------------------------

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${fetch2.data.Page.activities[0].user.name}.png`);
            await message.channel.send(attachment);
        })
}
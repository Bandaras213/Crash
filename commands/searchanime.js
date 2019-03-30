const fetch = require('node-fetch');
const query = require("../data/animequery.js");
const { getColorFromURL } = require('color-thief-node');
const rgbHex = require('rgb-hex');

var emoji = [
    "❌", //X
    "\u0031\u20E3", //1
    "\u0032\u20E3", //2
    "\u0033\u20E3", //3
    "\u0034\u20E3", //4
    "\u0035\u20E3", //5
    "\u0036\u20E3", //6
    "\u0037\u20E3", //7
    "\u0038\u20E3", //8
    "\u0039\u20E3" //9
];

module.exports = async (bot, message, args, Discord, moment) => {

    let animename = args.join(' ');
    let user = message.member.user;
    let i;
    let color;
    let uid = message.author.id;
    const anilistLogo = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Flogo_al.png?1543900749555";
    message.delete();


    if (args.length == 0) {
        return message.channel.send(`${user}, I need a Title to search for! (Usage: €anime Title)`);
    };

    await query;

    let variables = {
        search: animename,
        page: 1,
        perPage: 7,
    };

    let databody = {
        query: query,
        variables: variables
    };

    await fetch('https://graphql.anilist.co', {
        method: 'post',
        body: JSON.stringify(databody),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
        .then(fetch1 => fetch1.json())
        .then(async fetch1 => {

            let field1 = [];
            let NSFW = [];
            for (let a = 0; a < fetch1.data.Page.media.length; a++) {
                if (fetch1.data.Page.media[a].isAdult == true) {
                    NSFW.push("🔞" + "NSFW" + "🔞");
                } else {
                    NSFW.push("");
                };

                field1.push({
                    "name": `${fetch1.data.Page.media[a].title.romaji} (${bot.caps(fetch1.data.Page.media[a].format.split("_"))}) ${NSFW[a]}`,
                    "value": `Reaction: ${emoji[a + 1]}`
                });
            };

            if (field1.length == 0) {
                return message.channel.send(`${user}, Couldn't find a matching Anime for '**${animename}**'`);
            };

            let embed;
            switch (fetch1.data.Page.media.length) {
                case 1:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${animename}"`,
                        },
                        "footer": {
                            "text": `Please choose by using the Reactions below!`,
                        },
                        "fields": [
                            field1[0],
                            {
                                "name": "None of the above (Abort Command)",
                                "value": `Reaction: ${emoji[0]}`
                            }
                        ]
                    };
                    break;
                case 2:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${animename}"`,
                        },
                        "footer": {
                            "text": `Please choose by using the Reactions below!`,
                        },
                        "fields": [
                            field1[0],
                            field1[1],
                            {
                                "name": "None of the above (Abort Command)",
                                "value": `Reaction: ${emoji[0]}`
                            }
                        ]
                    };
                    break;
                case 3:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${animename}"`,
                        },
                        "footer": {
                            "text": `Please choose by using the Reactions below!`,
                        },
                        "fields": [
                            field1[0],
                            field1[1],
                            field1[2],
                            {
                                "name": "None of the above (Abort Command)",
                                "value": `Reaction: ${emoji[0]}`
                            }
                        ]
                    };
                    break;
                case 4:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${animename}"`,
                        },
                        "footer": {
                            "text": `Please choose by using the Reactions below!`,
                        },
                        "fields": [
                            field1[0],
                            field1[1],
                            field1[2],
                            field1[3],
                            {
                                "name": "None of the above (Abort Command)",
                                "value": `Reaction: ${emoji[0]}`
                            }
                        ]
                    };
                    break;
                case 5:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${animename}"`,
                        },
                        "footer": {
                            "text": `Please choose by using the Reactions below!`,
                        },
                        "fields": [
                            field1[0],
                            field1[1],
                            field1[2],
                            field1[3],
                            field1[4],
                            {
                                "name": "None of the above (Abort Command)",
                                "value": `Reaction: ${emoji[0]}`
                            }
                        ]
                    };
                    break;
                case 6:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${animename}"`,
                        },
                        "footer": {
                            "text": `Please choose by using the Reactions below!`,
                        },
                        "fields": [
                            field1[0],
                            field1[1],
                            field1[2],
                            field1[3],
                            field1[4],
                            field1[5],
                            {
                                "name": "None of the above (Abort Command)",
                                "value": `Reaction: ${emoji[0]}`
                            }
                        ]
                    };
                    break;
                case 7:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${animename}"`,
                        },
                        "footer": {
                            "text": `Please choose by using the Reactions below!`,
                        },
                        "fields": [
                            field1[0],
                            field1[1],
                            field1[2],
                            field1[3],
                            field1[4],
                            field1[5],
                            field1[6],
                            {
                                "name": "None of the above (Abort Command)",
                                "value": `Reaction: ${emoji[0]}`
                            }
                        ]
                    };
                    break;
            };

            let em1;
            switch (fetch1.data.Page.media.length) {
                case 0:
                    em1 = await message.channel.send(`${user}, Couldn't find any Results for "${args.join(" ")}"!`);
                    return;
                case 1:
                    em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[0]);
                    break;
                case 2:
                    em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[0]);
                    break;
                case 3:
                    em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[0]);
                    break;
                case 4:
                    em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[0]);
                    break;
                case 5:
                    em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[5]);
                    await em1.react(emoji[0]);
                    break;
                case 6:
                    em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[5]);
                    await em1.react(emoji[6]);
                    await em1.react(emoji[0]);
                    break;
                case 7:
                    em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[5]);
                    await em1.react(emoji[6]);
                    await em1.react(emoji[7]);
                    await em1.react(emoji[0]);
                    break;
            };

            const filter = (reaction, user) => {
                return emoji.includes(reaction.emoji.name) === true && user.id === uid;
            };

            const collector = await em1.createReactionCollector(filter, { max: 1, time: 15000 });

            collector.on('collect', async (reaction, reactionCollector) => {
                let chosen = reaction.emoji.name;

                switch (chosen) {
                    case emoji[0]:
                        return em1.delete(), message.channel.send(`${user} aborted the command.`);
                    case emoji[1]:
                        em1.clearReactions();
                        i = 0;
                        break;
                    case emoji[2]:
                        em1.clearReactions();
                        i = 1;
                        break;
                    case emoji[3]:
                        em1.clearReactions();
                        i = 2;
                        break;
                    case emoji[4]:
                        em1.clearReactions();
                        i = 3;
                        break;
                    case emoji[5]:
                        em1.clearReactions();
                        i = 4;
                        break;
                    case emoji[6]:
                        em1.clearReactions();
                        i = 5;
                        break;
                    case emoji[7]:
                        em1.clearReactions();
                        i = 6;
                        break;
                };

                let nsfw = fetch1.data.Page.media[i].isAdult;
                let animetitle;
                if (fetch1.data.Page.media[i].title.romaji == null) {
                    animetitle = fetch1.data.Page.media[i].title.english;
                } else {
                    animetitle = fetch1.data.Page.media[i].title.romaji;
                };

                if (fetch1.data.Page.media[i].title.romaji == null && fetch1.data.Page.media[i].title.english == null) {
                    animetitle = "Unknown.";
                };

                let description;
                if (fetch1.data.Page.media[i].description == null) {
                    description = "No Description found.";
                } else {
                    description = fetch1.data.Page.media[i].description.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
                };

                let coverIMG;
                if (fetch1.data.Page.media[i].coverImage.large == null) {
                    coverIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Foie_canvas%20(1).png?1541619925848";
                } else {
                    coverIMG = fetch1.data.Page.media[i].coverImage.large;
                };

                let posterIMG;
                if (fetch1.data.Page.media[i].bannerImage == null) {
                    posterIMG = '';
                } else {
                    posterIMG = fetch1.data.Page.media[i].bannerImage;
                };

                let animeurl;
                if (fetch1.data.Page.media[i].siteUrl == null) {
                    animeurl = "https://anilist.co";
                } else {
                    animeurl = fetch1.data.Page.media[i].siteUrl;
                };

                let video;
                if (fetch1.data.Page.media[i].trailer == null) {
                    video = "No Video found.";
                } else {
                    video = `[Click Me](https://www.youtube.com/watch?v=` + `${fetch1.data.Page.media[i].trailer.id})`;
                };

                let format;
                if (fetch1.data.Page.media[i].format == null) {
                    format = "Unknown.";
                } else {
                    format = fetch1.data.Page.media[i].format;
                };

                let genres;
                let genre1 = [];
                if (fetch1.data.Page.media[i].genres.length == 0) {
                    genres = "No Genres found.";
                } else {
                    for (let b = 0; b < fetch1.data.Page.media[i].genres.length; ++b) {
                        genre1.push(fetch1.data.Page.media[i].genres[b]);
                    };
                };

                if (genre1.length == 0) {
                    genres = "No Genres found.";
                } else {
                    genres = genre1.join(", ");
                };

                let mainchar;
                let chardata = [];
                if (fetch1.data.Page.media[i].characters.nodes.length == 0) {
                    mainchar = "No Characters found.";
                } else {
                    for (let c = 0; c < fetch1.data.Page.media[i].characters.nodes.length; ++c) {
                        if (fetch1.data.Page.media[i].characters.nodes[c].name.last == null) {
                            chardata.push("[" + fetch1.data.Page.media[i].characters.nodes[c].name.first + "]" + "(" + fetch1.data.Page.media[i].characters.nodes[c].siteUrl + ")");
                        } else {
                            chardata.push("[" + fetch1.data.Page.media[i].characters.nodes[c].name.first + " " + fetch1.data.Page.media[i].characters.nodes[c].name.last + "]" + "(" + fetch1.data.Page.media[i].characters.nodes[c].siteUrl + ")");
                        };
                    };
                };

                if (chardata.length == 0) {
                    mainchar = "No Characters found.";
                } else {
                    mainchar = chardata.join(", ");
                };

                let status
                if (fetch1.data.Page.media[i].status == null) {
                    status = "No Status found.";
                } else {
                    status = bot.caps(fetch1.data.Page.media[i].status);
                };

                let season;
                let start;
                let end;
                let airings = [];
                if (fetch1.data.Page.media[i].season == null) {
                    season = "";
                } else {
                    season = bot.caps(fetch1.data.Page.media[i].season);
                };

                if (fetch1.data.Page.media[i].startDate.day == null || fetch1.data.Page.media[i].startDate.month == null || fetch1.data.Page.media[i].startDate.year == null) {
                    start = "No Start or End date in Database.";
                    airings.push(start);
                } else {
                    start = fetch1.data.Page.media[i].startDate.day + "." + fetch1.data.Page.media[i].startDate.month + "." + fetch1.data.Page.media[i].startDate.year;
                };

                if (fetch1.data.Page.media[i].endDate.day == null || fetch1.data.Page.media[i].endDate.month == null || fetch1.data.Page.media[i].endDate.year == null) {
                    end = "";
                } else {
                    end = "to " + fetch1.data.Page.media[i].endDate.day + "." + fetch1.data.Page.media[i].endDate.month + "." + fetch1.data.Page.media[i].endDate.year;
                };

                airings.push(season + " " + start + " " + end);

                let nextepi;
                if (fetch1.data.Page.media[i].nextAiringEpisode == null) {
                    nextepi = "No new Episodes to Air.";
                } else {
                    let dateairing;
                    dateairing = new Date(fetch1.data.Page.media[i].nextAiringEpisode.airingAt * 1000);
                    dateairing = dateairing.toUTCString();
                    dateairing = `${moment(dateairing).format('DD.MM.YYYY')}` + " at " + `${moment(dateairing).format('hh:mm a')}`;
                    nextepi = "Episode " + fetch1.data.Page.media[i].nextAiringEpisode.episode + ", Airing on: " + dateairing;
                };

                let episodes = fetch1.data.Page.media[i].episodes;
                if (fetch1.data.Page.media[i].episodes == null) {
                    episodes = "No Episodes in the Database.";
                } else {
                    episodes = fetch1.data.Page.media[i].episodes;
                };

                let episodemin;
                let episodemins;
                if (fetch1.data.Page.media[i].duration == null) {
                    episodemin = "No Duration in Database.";
                } else {
                    episodemin = fetch1.data.Page.media[i].duration + " minutes";
                    episodemins = fetch1.data.Page.media[i].duration;
                };

                let time;
                function timeConvert(n) {
                    if (isNaN(n) || n == null) {
                        return time = "Can't Calculate time without Episodes or Episode Length.";
                    };

                    let hours = Math.floor(n / 60);
                    let minutes = Math.floor((n / 60 - hours) * 60);

                    if (hours === 0) {
                        time = minutes + " minute(s)";
                    } else if (minutes === 0) {
                        time = hours + " hour(s)";
                    } else {
                        time = hours + " hour(s) and " + minutes + " minute(s)";
                    };
                };

                let runtime;
                if (episodes === null || episodemin === null) {
                    runtime = "Can't Calculate Runtime without Episodes or Episode length.";
                } else {
                    runtime = episodes * episodemins;
                    timeConvert(runtime);
                };

                let avgRating;
                if (fetch1.data.Page.media[i].averageScore === null) {
                    avgRating = "No Rating in Database.";
                } else {
                    avgRating = fetch1.data.Page.media[i].averageScore + "%";
                };

                let sourcefilter
                if (fetch1.data.Page.media[i].source == null || fetch1.data.Page.media[i].source == undefined) {
                    sourcefilter = "No Source in Database.";
                } else {
                    sourcefilter = bot.caps(fetch1.data.Page.media[i].source.split("_"));
                };

                let studios;
                let studiosdata = [];
                if (fetch1.data.Page.media[i].studios.nodes.length == 0) {
                    studios = "No Studios in the Database.";
                } else {
                    for (let s = 0; s < fetch1.data.Page.media[i].studios.nodes.length; ++s) {
                        studiosdata.push(fetch1.data.Page.media[i].studios.nodes[s].name);
                    }
                };

                if (studiosdata.length == 0) {
                    studios = "No Studios in the Database.";
                } else {
                    studios = studiosdata.join(", ");
                };

                let staff;
                let staffdata = [];
                if (fetch1.data.Page.media[i].staff.edges.length == 0) {
                    staff = "No Staff in Database.";
                } else {
                    let staffdatas = fetch1.data.Page.media[i].staff.edges;
                    for (let m = 0; m < staffdatas.length; ++m) {
                        if (staffdatas[m].role == "Original Creator") {
                            if (staffdatas[m].node.name.last == null) {
                                staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                            } else {
                                staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + " " + staffdatas[m].node.name.last + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                            };
                        };

                        if (staffdatas[m].role == "Director") {
                            if (staffdatas[m].node.name.last == null) {
                                staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                            } else {
                                staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + " " + staffdatas[m].node.name.last + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                            };
                        };

                        if (staffdatas[m].role == "Music") {
                            if (staffdatas[m].node.name.last == null) {
                                staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                            } else {
                                staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + " " + staffdatas[m].node.name.last + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                            };
                        };
                    };
                };

                if (staffdata.length == 0) {
                    staff = "No Staff in Database.";
                } else {
                    staff = staffdata.join("\n");
                };

                const dominantColor = await getColorFromURL(coverIMG);
                color = rgbHex(`${dominantColor}`);

                const embed = new Discord.RichEmbed()
                    .setTitle(animetitle)
                    .setColor(color)
                    .setDescription(description)
                    .setFooter(animetitle, anilistLogo)
                    .setImage(posterIMG)
                    .setThumbnail(coverIMG)
                    .setTimestamp()
                    .setURL(animeurl)
                    .addField('Preview Trailer:', `${video}`)
                    .addField('Type:', `${bot.caps(format.split("_"))}`)
                    .addField('Genres:', `${genres}`)
                    .addField('Main Characters:', `${mainchar}`)
                    .addField('Status:', `${status}`)
                    .addField('Aired:', `From ${season} ${start} ${end}`)
                    .addField('Next Episode:', `${nextepi}`)
                    .addField('Episodes:', episodes)
                    .addField('Episode Length:', `${episodemin}`)
                    .addField('Estimated Total Runtime:', `${time}`)
                    .addField('Community Rating:', avgRating)
                    .addField('Source:', `${sourcefilter}`)
                    .addField('Studios:', `${studios}`)
                    .addField('Staff:', `${staff}`);

                if (nsfw == false) {
                    await em1.edit(`${user}, here is the result for ${animetitle}`, { embed });
                } else {
                    await em1.delete();
                    await message.channel.send(`${user}, You've selected a NSFW Anime! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
                    await message.author.send(`${user}, Here is the result for ${animetitle}`, { embed });
                };
            });

            collector.on('end', collected => {
                if (collected.size == 0) {
                    em1.delete();
                    message.channel.send(`${user}, You didn't react fast enough, try again!`);
                };
            });
        });
};

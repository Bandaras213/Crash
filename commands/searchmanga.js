const fetch = require('node-fetch');
const query = require("../data/mangaquery.js");

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

    let manganame = args.join(' ');
    let user = message.member.user;
    let i;
    let color = Math.floor(Math.random() * 16777214) + 1;
    let uid = message.author.id;
    message.delete();


    if (args.length == 0) {
        return message.channel.send(`${user}, I need a Title to search for! (Usage: €betamanga Title)`);
    };

    await query

    let variables = {
        search: manganame,
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

                if (fetch1.data.Page.media[a].title.romaji != null) {
                    field1.push({
                        "name": `${fetch1.data.Page.media[a].title.romaji} (${bot.caps(fetch1.data.Page.media[a].format.split("_"))}) ${NSFW[a]}`,
                        "value": `Reaction: ${emoji[a + 1]}`
                    });
                } else {
                    field1.push({
                        "name": `${fetch1.data.Page.media[a].title.english} (${bot.caps(fetch1.data.Page.media[a].format.split(" "))}) ${NSFW[a]}`,
                        "value": `Reaction: ${emoji[a + 1]}`
                    });
                };
            };

            let embed
            switch (fetch1.data.Page.media.length) {
                case 1:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${manganame}"`,
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
                    break
                case 2:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${manganame}"`,
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
                    break
                case 3:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${manganame}"`,
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
                    break
                case 4:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${manganame}"`,
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
                    break
                case 5:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${manganame}"`,
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
                    break
                case 6:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${manganame}"`,
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
                    break
                case 7:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${manganame}"`,
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
                    break
            };

            let em1;
            switch (fetch1.data.Page.media.length) {
                case 0:
                    em1 = await message.channel.send(`${user}, Couldn't find any Results for "${args.join(" ")}"!`);
                    return;
                case 1:
                    em1 = await message.channel.send(`${user} is choosing a Manga.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[0]);
                    break;
                case 2:
                    em1 = await message.channel.send(`${user} is choosing a Manga.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[0]);
                    break;
                case 3:
                    em1 = await message.channel.send(`${user} is choosing a Manga.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[0]);
                    break;
                case 4:
                    em1 = await message.channel.send(`${user} is choosing a Manga.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[0]);
                    break;
                case 5:
                    em1 = await message.channel.send(`${user} is choosing a Manga.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[5]);
                    await em1.react(emoji[0]);
                    break;
                case 6:
                    em1 = await message.channel.send(`${user} is choosing a Manga.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[5]);
                    await em1.react(emoji[6]);
                    await em1.react(emoji[0]);
                    break;
                case 7:
                    em1 = await message.channel.send(`${user} is choosing a Manga.`, { embed });
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
                        i = 0
                        break
                    case emoji[2]:
                        em1.clearReactions();
                        i = 1
                        break
                    case emoji[3]:
                        em1.clearReactions();
                        i = 2
                        break
                    case emoji[4]:
                        em1.clearReactions();
                        i = 3
                        break
                    case emoji[5]:
                        em1.clearReactions();
                        i = 4
                        break
                    case emoji[6]:
                        em1.clearReactions();
                        i = 5
                        break
                    case emoji[7]:
                        em1.clearReactions();
                        i = 6
                        break
                };

                //data
                let id = fetch1.data.Page.media[i].id
                let url = fetch1.data.Page.media[i].siteUrl;

                //data.atributes
                let format = fetch1.data.Page.media[i].format;
                let synopsis = fetch1.data.Page.media[i].description;
                let canonTitle = fetch1.data.Page.media[i].title.romaji;
                let avgRating = fetch1.data.Page.media[i].averageScore;
                let startdate = fetch1.data.Page.media[i].startDate;
                let enddate = fetch1.data.Page.media[i].endDate;
                //let season = fetch1.data.Page.media[i].season;
                let source = fetch1.data.Page.media[i].source;
                let status = fetch1.data.Page.media[i].status;
                let posterIMG = fetch1.data.Page.media[i].coverImage.large;
                let coverIMG = fetch1.data.Page.media[i].bannerImage;
                let chapters = fetch1.data.Page.media[i].chapters;
                let volumes = fetch1.data.Page.media[i].volumes;
                let genre = fetch1.data.Page.media[i].genres;
                let nsfw = fetch1.data.Page.media[i].isAdult;
                let staffdatas = fetch1.data.Page.media[i].staff.edges;
                let charactersdatas = fetch1.data.Page.media[i].characters.nodes;

                if (startdate === null && enddate === null) {
                    start = "No Startdate in the Database.";
                    end = "No Enddate in the Database.";
                };

                let startfilter;
                let start;
                if (startdate === null) {
                    start = "Not Running or no Data in Database.";
                } else {
                    startfilter = startdate;
                    if (startfilter.day == null || startfilter.month == null) {
                        start = startfilter.year;
                    } else {
                        start = startfilter.day + "." + startfilter.month + "." + startfilter.year;
                    };
                };

                let endday = enddate.day;
                let endmonth = enddate.month;
                let endyear = enddate.year;
                let end;

                if (enddate == null) {
                    end = "(Ongoing)";
                } else {
                    end = "to " + enddate.day + "." + enddate.month + "." + enddate.year;
                };

                if (endday == null || endmonth == null) {
                    if (endyear == null) {
                        end = "(Ongoing)";
                    } else {
                        end = "to " + endyear;
                    };
                };

                if (avgRating === null) {
                    avgRating = "No Data in Database.";
                } else {
                    avgRating = avgRating + "%";
                };

                let sourcefilter;
                if (source == null || source == undefined) {
                    sourcefilter = "No Source in Database.";
                } else {
                    sourcefilter = bot.caps(source.split("_"));
                };

                if (status === null) {
                    status = "No Data in Database.";
                } else {
                    status = bot.caps(status);
                };

                if (posterIMG === null) {
                    posterIMG = 'https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Foie_canvas%20(1).png?1541619925848';
                };

                if (chapters === null) {
                    chapters = "No Chapter in the Database.";
                };

                if (volumes == null) {
                    volumes = "No Volumes in the Database.";
                };

                if (coverIMG === null) {
                    coverIMG = "";
                };

                let genre1 = [];

                for (let b = 0; b < fetch1.data.Page.media[i].genres.length; ++b) {
                    genre1.push(fetch1.data.Page.media[i].genres[b]);
                };

                let genres = genre1.join(", ");

                if (genre == null) {
                    genres = "No Data in Database.";
                };

                let chardata = []

                for (let c = 0; c < charactersdatas.length; ++c) {
                    if (charactersdatas[c].name.last == null) {
                        chardata.push("[" + charactersdatas[c].name.first + "]" + "(" + charactersdatas[c].siteUrl + ")");
                    } else {
                        chardata.push("[" + charactersdatas[c].name.first + " " + charactersdatas[c].name.last + "]" + "(" + charactersdatas[c].siteUrl + ")")
                    };
                };

                let mainchar
                if (chardata.length == 0) {
                    mainchar = "No Characters in the Database."
                } else {
                    mainchar = chardata.join(", ")
                };

                let staffdata = []

                for (let m = 0; m < staffdatas.length; ++m) {
                    staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + " " + staffdatas[m].node.name.last + "]" + "(" + staffdatas[m].node.siteUrl + ")")
                };

                let staff = staffdata.join("\n")

                let embed
                if (status == "Finished") {
                    embed = new Discord.RichEmbed()
                        .setTitle(canonTitle)
                        .setColor(color)
                        .setDescription(synopsis.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim())
                        .setFooter(canonTitle)
                        .setImage(coverIMG)
                        .setThumbnail(posterIMG)
                        .setTimestamp()
                        .setURL(url)
                        .addField('Type:', `${bot.caps(format.split("_"))}`)
                        .addField('Genres:', `${genres}`)
                        .addField('Main Characters:', `${mainchar}`)
                        .addField('Status:', `${status}`)
                        .addField('Released:', `${start} ${end}`)
                        .addField('Chapter:', chapters)
                        .addField('Volumes:', `${volumes}`)
                        .addField('Community Rating:', avgRating)
                        .addField('Source:', `${sourcefilter}`)
                        .addField('Staff:', `${staff}`)
                } else {
                    embed = new Discord.RichEmbed()
                        .setTitle(canonTitle)
                        .setColor(color)
                        .setDescription(synopsis.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim())
                        .setFooter(canonTitle)
                        .setImage(coverIMG)
                        .setThumbnail(posterIMG)
                        .setTimestamp()
                        .setURL(url)
                        .addField('Type:', `${bot.caps(format.split("_"))}`)
                        .addField('Genres:', `${genres}`)
                        .addField('Main Characters:', `${mainchar}`)
                        .addField('Status:', `${status}`)
                        .addField('Released:', `From ${start} ${end}`)
                        .addField('Community Rating:', avgRating)
                        .addField('Source:', `${sourcefilter}`)
                        .addField('Staff:', `${staff}`)
                };

                if (nsfw == false) {
                    await em1.edit(`${user}, here is the result for ${canonTitle}`, { embed });
                } else {
                    await em1.delete();
                    await message.channel.send(`${user}, You've selected a NSFW Manga! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
                    await message.author.send(`Here is the result for ${canonTitle}`, { embed });
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

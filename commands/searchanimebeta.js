const fetch = require('node-fetch');

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
    let color = Math.floor(Math.random() * 16777214) + 1;
    let uid = message.author.id;
    message.delete();


    if (args.length == 0) {
        return message.channel.send(`${user}, I need a Title to search for! (Usage: €betaanime Title)`);
    };

    var query = `
	query ($id: Int, $page: Int, $perPage: Int, $search: String) {
		Page (page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
                }
            media (id: $id, search: $search, type: ANIME) {
                id
                siteUrl
                format
                title {
                    romaji
                    english
                }
                coverImage {
                    large
                }
                bannerImage
                status
                description
                averageScore
                startDate {
                    day
                    month
                    year
                }
                endDate {
                    day
                    month
                    year
                }
                nextAiringEpisode {
                    id
                    airingAt
                    timeUntilAiring
                    episode
                }
                season
                episodes
                duration
                countryOfOrigin
                isLicensed
                source
                trailer {
                    id
                    site
                }
                genres
                meanScore
                popularity
                isAdult
                }
        }
    }`;

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

            let embed
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
                    break
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
                    break
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
                            field1[2],
                            field1[3],
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
                    break
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
                    break
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
                    break
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
                    break
            };

            let em1
            switch (fetch1.data.Page.media.length) {
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
                //let id = fetch1.data.Page.media[i].id
                let url = fetch1.data.Page.media[i].siteUrl;

                //data.atributes
                let format = fetch1.data.Page.media[i].format;
                let synopsis = fetch1.data.Page.media[i].description;
                let canonTitle = fetch1.data.Page.media[i].title.romaji;
                let avgRating = fetch1.data.Page.media[i].averageScore;
                let startdate = fetch1.data.Page.media[i].startDate;
                let enddate = fetch1.data.Page.media[i].endDate;
                let season = fetch1.data.Page.media[i].season;
                let source = fetch1.data.Page.media[i].source;
                let status = fetch1.data.Page.media[i].status;
                let posterIMG = fetch1.data.Page.media[i].coverImage.large;
                let coverIMG = fetch1.data.Page.media[i].bannerImage;
                let episodes = fetch1.data.Page.media[i].episodes;
                let episodemin = fetch1.data.Page.media[i].duration;
                let genre = fetch1.data.Page.media[i].genres;
                let video = fetch1.data.Page.media[i].trailer;
                let nsfw = fetch1.data.Page.media[i].isAdult;
                let nextepi = fetch1.data.Page.media[i].nextAiringEpisode;

                let dateairing
                if (nextepi == null) {
                    nextepi = "No new Episodes to Air.";
                } else {
                    //var timez = new Date().getTime();
                    dateairing = new Date(nextepi.airingAt * 1000);
                    dateairing = dateairing.toUTCString();
                    dateairing = `${moment(dateairing).format('DD.MM.YYYY')}` + " at " + `${moment(dateairing).format('hh:mm a')}`;
                    nextepi = "Episode " + nextepi.episode + ", Airing on: " + dateairing;
                };

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
                    start = startfilter.day + "." + startfilter.month + "." + startfilter.year;
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

                if (season === null) {
                    season = "No Data in Database.";
                } else {
                    season = bot.caps(season);
                };

                if (video == null || video == undefined || video == "") {
                    video = "DLzxrzFCyOs"
                } else {
                    video = video.id;
                };

                let sourcefilter;
                if (source == null || source == undefined) {
                    sourcefilter = "No Data in Database.";
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

                let time;
                function timeConvert(n) {

                    /* var num = n;
                    var hours = (num / 60);
                    var rhours = Math.floor(hours);
                    var minutes = (hours - rhours) * 60;
                    var rminutes = Math.floor(minutes); */

                    let hours = Math.floor(n / 60);
                    let minutes = Math.floor((n / 60 - hours) * 60);

                    if (hours === 0) {
                        time = minutes + " minute(s)"
                    } else if (minutes === 0) {
                        time = hours + " hour(s)"
                    } else {
                        time = hours + " hour(s) and " + minutes + " minute(s)";
                    };
                };

                if (time == undefined || time == null) {
                    time = "No Data in Database.";
                };

                let runtime;
                if (episodes === null || episodemin === null) {
                    runtime = "Can't Calculate Runtime without Episodes or Episode length.";
                } else {
                    runtime = episodes * episodemin;
                    timeConvert(runtime);
                };

                if (episodes === null) {
                    episodes = "No Episodes in the database.";
                };

                if (episodemin === null) {
                    episodemin = "No Data in Database.";
                } else {
                    episodemin = episodemin + " minutes";
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

                const embed = new Discord.RichEmbed()
                    .setTitle(canonTitle)
                    .setColor(color)
                    .setDescription(synopsis.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim())
                    .setFooter(canonTitle)
                    .setImage(coverIMG)
                    .setThumbnail(posterIMG)
                    .setTimestamp()
                    .setURL(url)
                    .addField('Preview Trailer:', `[Click Me](https://www.youtube.com/watch?v=` + `${video})`)
                    .addField('Type:', `${bot.caps(format.split("_"))}`)
                    .addField('Genres:', `${genres}`)
                    .addField('Status:', `${status}`)
                    .addField('Aired:', `From ${season} ${start} ${end}`)
                    .addField('Next Episode:', `${nextepi}`)
                    .addField('Episodes:', episodes)
                    .addField('Episode Length:', `${episodemin}`)
                    .addField('Estimated Total Runtime:', `${time}`)
                    .addField('Community Rating:', avgRating)
                    .addField('Source:', `${sourcefilter}`)

                if (nsfw == false) {
                    await em1.edit(`${user}, here is the result for ${canonTitle}`, { embed });
                } else {
                    await em1.delete();
                    await message.channel.send(`${user}, You've selected a NSFW Anime! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
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

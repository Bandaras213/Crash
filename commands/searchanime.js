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
    "\u0039\u20E3", //9
];

module.exports = async (bot, message, args, Discord, moment) => {

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
        clientid = process.env.KITSUCLIENTID
    } else {
        clientid = bot.config.KITSUCLIENTID
    };

    if (process.env.KITSUCLIENTSECRET) {
        clientsecret = process.env.KITSUCLIENTSECRET
    } else {
        clientsecret = bot.config.KITSUCLIENTSECRET
    };

    const authbody = {
        grant_type: 'password',
        username: username,
        password: password,
        client_id: clientid,
        client_secret: clientsecret
    };

    await fetch('https://kitsu.io/api/oauth/token', {
        method: 'post',
        body: JSON.stringify(authbody),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(tores => tores.json())
        .then(async tores => {

            let toktype = tores.token_type
            let acctok = tores.access_token
            let animename = args.join(' ');
            let user = message.member.user
            let i
            let color = Math.floor(Math.random() * 16777214) + 1;
            let uid = message.author.id
            message.delete();

            if (args.length == 0) return message.channel.send(`${user}, I need a Title to search for! (Usage: €anime Title)`)

            await fetch('https://kitsu.io/api/edge/anime/?filter[text]=' + animename, {
                method: 'GET',
                headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json', 'Authorization': `${toktype} ${acctok}` }
            })
                .then(filter0 => filter0.json())
                .then(async filter0 => {
                    let NSFW = [];
                    for (var a = 0; a < 7; a++) {
                        if (filter0.data[a].attributes.nsfw == true) {
                            NSFW.push("🔞" + "NSFW" + "🔞");
                        } else {
                            NSFW.push("");
                        };
                    };

                    let embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${animename}"`,
                        },
                        "footer": {
                            "text": `Please choose by using the Reactions below!`,
                        },
                        "fields": [
                            {
                                "name": `${filter0.data[0].attributes.canonicalTitle} (${bot.caps(filter0.data[0].attributes.subtype)}) ${NSFW[0]}`,
                                "value": `Reaction: ${emoji[1]}`
                            },
                            {
                                "name": `${filter0.data[1].attributes.canonicalTitle} (${bot.caps(filter0.data[1].attributes.subtype)}) ${NSFW[1]}`,
                                "value": `Reaction: ${emoji[2]}`
                            },
                            {
                                "name": `${filter0.data[2].attributes.canonicalTitle} (${bot.caps(filter0.data[2].attributes.subtype)}) ${NSFW[2]}`,
                                "value": `Reaction: ${emoji[3]}`
                            },
                            {
                                "name": `${filter0.data[3].attributes.canonicalTitle} (${bot.caps(filter0.data[3].attributes.subtype)}) ${NSFW[3]}`,
                                "value": `Reaction: ${emoji[4]}`
                            },
                            {
                                "name": `${filter0.data[4].attributes.canonicalTitle} (${bot.caps(filter0.data[4].attributes.subtype)}) ${NSFW[4]}`,
                                "value": `Reaction: ${emoji[5]}`
                            },
                            {
                                "name": `${filter0.data[5].attributes.canonicalTitle} (${bot.caps(filter0.data[5].attributes.subtype)}) ${NSFW[5]}`,
                                "value": `Reaction: ${emoji[6]}`
                            },
                            {
                                "name": `${filter0.data[6].attributes.canonicalTitle} (${bot.caps(filter0.data[6].attributes.subtype)}) ${NSFW[6]}`,
                                "value": `Reaction: ${emoji[7]}`
                            },
                            {
                                "name": "None of the above (Abort Command)",
                                "value": `Reaction: ${emoji[0]}`
                            }
                        ]
                    };

                    const em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed })
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[5]);
                    await em1.react(emoji[6]);
                    await em1.react(emoji[7]);
                    await em1.react(emoji[0]);

                    const filter = (reaction, user) => {
                        return emoji.includes(reaction.emoji.name) === true && user.id === uid;
                    };

                    const collector = em1.createReactionCollector(filter, { max: 1, time: 15000 });

                    collector.on('collect', async (reaction, reactionCollector) => {
                        let chosen = reaction.emoji.name

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

                        await fetch('https://kitsu.io/api/edge/anime/?filter[text]=' + animename, {
                            method: 'GET',
                            headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json', 'Authorization': `${toktype} ${acctok}` }
                        })
                            .then(res0 => res0.json())
                            .then(async res0 => {

                                //data
                                let id = res0.data[i].id
                                //let type = res0.data[i].type
                                let url = "https://kitsu.io/anime/" + id

                                //data.atributes
                                let synopsis = res0.data[i].attributes.synopsis
                                let canonTitle = res0.data[i].attributes.canonicalTitle
                                let avgRating = res0.data[i].attributes.averageRating
                                let favcount = res0.data[i].attributes.favoritesCount
                                let startdate = res0.data[i].attributes.startDate
                                let enddate = res0.data[i].attributes.endDate
                                let poprank = res0.data[i].attributes.popularityRank
                                let ratingrank = res0.data[i].attributes.ratingRank
                                let ager = res0.data[i].attributes.ageRating
                                let agerg = res0.data[i].attributes.ageRatingGuide
                                let subtype = res0.data[i].attributes.subtype
                                let status = res0.data[i].attributes.status
                                let posterIMG = res0.data[i].attributes.posterImage.medium
                                let coverIMG = res0.data[i].attributes.coverImage
                                let episodes = res0.data[i].attributes.episodeCount
                                let episodemin = res0.data[i].attributes.episodeLength
                                let genres = res0.data[i].relationships.genres.links.related
                                let categories = res0.data[i].relationships.categories.links.related
                                let videoid = res0.data[i].attributes.youtubeVideoId
                                let nsfw = res0.data[i].attributes.nsfw


                                if (startdate === null && enddate === null) {
                                    start = "No Startdate in the Database."
                                    end = "No Enddate in the Database."
                                };

                                let startfilter
                                let start
                                if (startdate === null) {
                                    start = "Not Running or no Data in Database."
                                } else {
                                    startfilter = startdate.split("-")
                                    start = startfilter[2] + "." + startfilter[1] + "." + startfilter[0]
                                };

                                let endfilter
                                let end
                                if (enddate === null) {
                                    end = "running"
                                } else {
                                    endfilter = enddate.split("-")
                                    end = endfilter[2] + "." + endfilter[1] + "." + endfilter[0]
                                };

                                if (avgRating === null) {
                                    avgRating = "No Data in Database."
                                } else {
                                    avgRating = avgRating + "%"
                                };

                                if (favcount === null) {
                                    favcount = "No Data in Database."
                                };

                                if (videoid == null || videoid == undefined) {
                                    videoid = "DLzxrzFCyOs"
                                };

                                if (poprank === null) {
                                    poprank = "No Data in Database."
                                };

                                if (ratingrank === null) {
                                    ratingrank = "No Data in Database."
                                };

                                if (ager === null) {
                                    ager = "No data in database."
                                };

                                if (agerg === null) {
                                    agerg = "No Data in Database."
                                };

                                if (subtype === null) {
                                    subtype = "No Data in Database."
                                } else {
                                    subtype = bot.caps(subtype);
                                };

                                if (status === null) {
                                    status = "No Data in Database."
                                } else {
                                    status = bot.caps(status);
                                };

                                if (posterIMG === null) {
                                    posterIMG = 'https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Foie_canvas%20(1).png?1541619925848'
                                };

                                let time
                                function timeConvert(n) {

                                    /* var num = n;
                                    var hours = (num / 60);
                                    var rhours = Math.floor(hours);
                                    var minutes = (hours - rhours) * 60;
                                    var rminutes = Math.floor(minutes); */

                                    let hours = Math.floor(n / 60);
                                    let minutes = Math.floor((n / 60 - hours) * 60);

                                    if (hours === 0) {
                                        time = minutes + " minute(s)."
                                    } else { time = "Approximately " + hours + " hour(s) and " + minutes + " minute(s)." };
                                };

                                if (time == undefined || time == null) {
                                    time = "No Data in Database."
                                };

                                let runtime
                                if (episodes === null || episodemin === null) {
                                    runtime = "Can't Calculate Runtime without Episodes or Episode length."
                                } else {
                                    runtime = episodes * episodemin
                                    timeConvert(runtime)
                                };

                                if (episodes === null) {
                                    episodes = "No Episodes in the Kitsu.io database."
                                };

                                if (episodemin === null) {
                                    episodemin = "No Data in Database."
                                } else { episodemin = episodemin + " Min" };

                                if (coverIMG === null) {
                                    coverIMG = ""
                                } else {
                                    coverIMG = coverIMG.original
                                };

                                await fetch(`${genres}`, {
                                    method: 'GET',
                                    headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json', 'Authorization': `${toktype} ${acctok}` }
                                })
                                    .then(res1 => res1.json())
                                    .then(async res1 => {
                                        var genreval = [];
                                        for (var o = 0; o < res1.data.length; o++) {
                                            genreval.push(res1.data[o].attributes.name);
                                        };

                                        await fetch(`${categories}`, {
                                            method: 'GET',
                                            headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json', 'Authorization': `${toktype} ${acctok}` }
                                        })
                                            .then(res9 => res9.json())
                                            .then(async res9 => {
                                                var categoryval = [];
                                                for (var owo = 0; owo < res9.data.length; owo++) {
                                                    categoryval.push(res9.data[owo].attributes.title);
                                                };

                                                if (categoryval == null || categoryval == "") {
                                                    categoryval = "No Categories in Database."
                                                } else {
                                                    categoryval = categoryval.join(", ");
                                                };

                                                if (genreval == null || genreval == "") {
                                                    genreval = "No Genres in Database."
                                                } else {
                                                    genreval = genreval.join(", ");
                                                };

                                                const embed = new Discord.RichEmbed()
                                                    .setTitle(canonTitle)
                                                    .setColor(color)
                                                    .setDescription(synopsis)
                                                    .setFooter(canonTitle)
                                                    .setImage(coverIMG)
                                                    .setThumbnail(posterIMG)
                                                    .setTimestamp()
                                                    .setURL(url)
                                                    .addField('Type:', `${subtype}`)
                                                    .addField('Status:', status)
                                                    .addField('Preview Trailer:', `[Click Me](https://www.youtube.com/watch?v=` + `${videoid})`)
                                                    .addField('Categories:', categoryval)
                                                    .addField('Aired:', `From ${start} to ${end}`)
                                                    .addField('Episodes:', episodes)
                                                    .addField('Episode Length:', `${episodemin}`)
                                                    .addField('Total Runtime:', `${time}`)
                                                    .addField('Community Rating:', avgRating)
                                                    .addField('Age Category:', `${ager} ${agerg}`)

                                                if (nsfw == false) {
                                                    await em1.edit(`${user}, here is the result for ${canonTitle}`, { embed });
                                                } else {
                                                    await em1.delete();
                                                    await message.channel.send(`${user}, You've selected a NSFW Anime! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
                                                    await message.author.send(`Here is the result for ${canonTitle}`, { embed });
                                                };
                                            });
                                    });
                            });
                    });

                    collector.on('end', collected => {
                        if (collected.size == 0) {
                            em1.delete();
                            message.channel.send(`${user}, You didn't react fast enough, try again!`);
                        } else { return };
                    });
                });
        });
};
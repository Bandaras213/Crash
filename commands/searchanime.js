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

    let animename = args.join(' ');
    let user = message.member.user
    let i
    let color = Math.floor(Math.random() * 16777214) + 1;
    let uid = message.author.id
    message.delete();

    if (args.length == 0) return message.channel.send(`${user}, I need a Title to search for! (Usage: €anime Title)`)

    await fetch('https://kitsu.io/api/edge/anime/?filter[text]=' + animename, {
        method: 'GET',
        headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' }
    })
        .then(filter0 => filter0.json())
        .then(async filter0 => {

            let embed = {
                "color": 65280,
                "author": {
                    "name": `Results for ${animename}`,
                },
                "footer": {
                    "text": `Please choose by using the reactions below!`,
                },
                "fields": [
                    {
                        "name": `${filter0.data[0].attributes.canonicalTitle} - ${filter0.data[0].type.charAt(0).toUpperCase() + filter0.data[0].type.substring(1)}`,
                        "value": `Reaction: ${emoji[1]}`
                    },
                    {
                        "name": `${filter0.data[1].attributes.canonicalTitle} - ${filter0.data[1].type.charAt(0).toUpperCase() + filter0.data[1].type.substring(1)}`,
                        "value": `Reaction: ${emoji[2]}`
                    },
                    {
                        "name": `${filter0.data[2].attributes.canonicalTitle} - ${filter0.data[2].type.charAt(0).toUpperCase() + filter0.data[2].type.substring(1)}`,
                        "value": `Reaction: ${emoji[3]}`
                    },
                    {
                        "name": `${filter0.data[3].attributes.canonicalTitle} - ${filter0.data[3].type.charAt(0).toUpperCase() + filter0.data[3].type.substring(1)}`,
                        "value": `Reaction: ${emoji[4]}`
                    },
                    {
                        "name": `${filter0.data[4].attributes.canonicalTitle} - ${filter0.data[4].type.charAt(0).toUpperCase() + filter0.data[4].type.substring(1)}`,
                        "value": `Reaction: ${emoji[5]}`
                    },
                    {
                        "name": `${filter0.data[5].attributes.canonicalTitle} - ${filter0.data[5].type.charAt(0).toUpperCase() + filter0.data[5].type.substring(1)}`,
                        "value": `Reaction: ${emoji[6]}`
                    },
                    {
                        "name": `${filter0.data[6].attributes.canonicalTitle} - ${filter0.data[6].type.charAt(0).toUpperCase() + filter0.data[6].type.substring(1)}`,
                        "value": `Reaction: ${emoji[7]}`
                    },
                    {
                        "name": "None of the above (Go back)",
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
                        return em1.delete(), message.channel.send(`${user} aborted the command`);
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
                    headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' }
                })
                    .then(res0 => res0.json())
                    .then(async res0 => {

                        //data
                        let id = res0.data[i].id
                        let type = res0.data[i].type
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
                        let genres = res0.data[i].relationships.categories.links.related

                        let startfilter = startdate.split("-")
                        let start = startfilter[2] + "." + startfilter[1] + "." + startfilter[0]
                        if (episodemin == null) {
                            episodemin = "20"
                        };

                        let endfilter
                        let end
                        if (enddate === null) {
                            end = "running"
                        } else {
                            endfilter = enddate.split("-")
                            end = endfilter[2] + "." + endfilter[1] + "." + endfilter[0]
                        };

                        let runtime
                        if (episodes === null) {
                            runtime = "Can't Calculate Runtime without Episodes."
                        } else {
                            runtime = Math.round(episodes * episodemin / 60) + " Hours"
                        };

                        if (episodes === null) {
                            episodes = "No Episodes in the Kitsu.io Database."
                        };

                        if (coverIMG === null) {
                            coverIMG = ""
                        }else{ coverIMG = coverIMG.original};

                        await fetch(`${genres}`, {
                            method: 'GET',
                            headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' }
                        })
                            .then(res1 => res1.json())
                            .then(async res1 => {
                                var genreval = [];
                                for (var o = 0; o < res1.data.length; o++) {
                                    genreval.push(res1.data[o].attributes.title);
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
                                    .addField('Genre:', genreval.join(", "))
                                    .addField('Episodes:', episodes)
                                    .addField('Status:', status.charAt(0).toUpperCase() + status.substring(1))
                                    .addField('Aired:', `${subtype.charAt(0).toUpperCase() + subtype.substring(1)} ${start} - ${end}`)
                                    .addField('Type:', type.charAt(0).toUpperCase() + type.substring(1))
                                    .addField('Length per Episode:', `${episodemin} Min`)
                                    .addField('Time spend to watch:', `${runtime}`)
                                    .addField('Community Rating:', avgRating + "%")
                                    .addField('Favorit Counter:', favcount)
                                    .addField('Popularity Rank:', poprank)
                                    .addField('Rating Rank:', ratingrank)
                                    .addField('Age Category:', `${ager} ${agerg}`)

                                await em1.edit(`${user}, here is the result for ${canonTitle}`, { embed });
                            });
                    });
            });

            collector.on('end', collected => {
                if (collected.size == 0) {
                    em1.delete();
                    message.channel.send(`${user}, you didn't react fast enough, try again!`);
                } else { return };
            });

        });
};

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

    let manganame = args.join(' ');
    let user = message.member.user;
    let i;
    let color = Math.floor(Math.random() * 16777214) + 1;
    let uid = message.author.id;
    message.delete();

    if (args.length == 0) {
        return message.channel.send(`${user}, I need a Title to search for! (Usage: €manga Title)`);
    };

    await fetch('https://kitsu.io/api/edge/manga/?filter[text]=' + manganame, {
        method: 'GET',
        headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' }
    })
        .then(filter0 => filter0.json())
        .then(async filter0 => {

            let embed = {
                "color": 65280,
                "author": {
                    "name": `Results for ${manganame}`,
                },
                "footer": {
                    "text": `Please choose by using the reactions below!`,
                },
                "fields": [
                    {
                        "name": `${filter0.data[0].attributes.canonicalTitle} - ${bot.caps(filter0.data[0].type)} - ${filter0.data[0].id}`,
                        "value": `Reaction: ${emoji[1]}`
                    },
                    {
                        "name": `${filter0.data[1].attributes.canonicalTitle} - ${bot.caps(filter0.data[1].type)} - ${filter0.data[1].id}`,
                        "value": `Reaction: ${emoji[2]}`
                    },
                    {
                        "name": `${filter0.data[2].attributes.canonicalTitle} - ${bot.caps(filter0.data[2].type)} - ${filter0.data[2].id}`,
                        "value": `Reaction: ${emoji[3]}`
                    },
                    {
                        "name": `${filter0.data[3].attributes.canonicalTitle} - ${bot.caps(filter0.data[3].type)} - ${filter0.data[3].id}`,
                        "value": `Reaction: ${emoji[4]}`
                    },
                    {
                        "name": `${filter0.data[4].attributes.canonicalTitle} - ${bot.caps(filter0.data[4].type)} - ${filter0.data[4].id}`,
                        "value": `Reaction: ${emoji[5]}`
                    },
                    {
                        "name": `${filter0.data[5].attributes.canonicalTitle} - ${bot.caps(filter0.data[5].type)} - ${filter0.data[5].id}`,
                        "value": `Reaction: ${emoji[6]}`
                    },
                    {
                        "name": `${filter0.data[6].attributes.canonicalTitle} - ${bot.caps(filter0.data[6].type)} - ${filter0.data[6].id}`,
                        "value": `Reaction: ${emoji[7]}`
                    },
                    {
                        "name": "None of the above (Abort Command)",
                        "value": `Reaction: ${emoji[0]}`
                    }
                ]
            };

            const em1 = await message.channel.send(`${user} is choosing a Manga.`, { embed });
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
                let chosen = reaction.emoji.name;

                switch (chosen) {
                    case emoji[0]:
                        return em1.delete(), message.channel.send(`${user} aborted the command`);
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

                await fetch('https://kitsu.io/api/edge/manga/?filter[text]=' + manganame, {
                    method: 'GET',
                    headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' }
                })
                    .then(res0 => res0.json())
                    .then(async res0 => {
                        //data
                        let id = res0.data[i].id;
                        let type = res0.data[i].type;
                        let url = "https://kitsu.io/manga/" + id;

                        //data.atributes
                        let synopsis = res0.data[i].attributes.synopsis;
                        let canonTitle = res0.data[i].attributes.canonicalTitle;
                        let avgRating = res0.data[i].attributes.averageRating;
                        let favcount = res0.data[i].attributes.favoritesCount;
                        let startdate = res0.data[i].attributes.startDate;
                        let enddate = res0.data[i].attributes.endDate;
                        let poprank = res0.data[i].attributes.popularityRank;
                        let ratingrank = res0.data[i].attributes.ratingRank;
                        let subtype = res0.data[i].attributes.subtype;
                        let status = res0.data[i].attributes.status;
                        let posterIMG = res0.data[i].attributes.posterImage.medium;
                        let coverIMG = res0.data[i].attributes.coverImage;
                        let chapters = res0.data[i].attributes.chapterCount;
                        let genres = res0.data[i].relationships.categories.links.related;

                        if (startdate === null && enddate === null) {
                            start = "No Startdate in the Database.";
                            end = "No Enddate in the Database.";
                        };

                        let startfilter;
                        let start;
                        if (startdate === null) {
                            start = "Not Running or no Data in Database.";
                        } else {
                            startfilter = startdate.split("-");
                            start = startfilter[2] + "." + startfilter[1] + "." + startfilter[0];
                        };

                        let endfilter;
                        let end;
                        if (enddate === null) {
                            end = "Running";
                        } else {
                            endfilter = enddate.split("-");
                            end = endfilter[2] + "." + endfilter[1] + "." + endfilter[0];
                        };

                        if (avgRating === null) {
                            avgRating = "No Data in Database.";
                        } else {
                            avgRating = avgRating + "%";
                        };

                        if (favcount === null) {
                            favcount = "No Data in Database.";
                        };

                        if (poprank === null) {
                            poprank = "No Data in Database.";
                        };

                        if (ratingrank === null) {
                            ratingrank = "No Data in Database.";
                        };

                        if (subtype === null) {
                            subtype = "No Data in Database.";
                        } else {
                            subtype = bot.caps(subtype);
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
                            chapters = "No Chapters in the Kitsu.io Database.";
                        };

                        if (coverIMG === null) {
                            coverIMG = "";
                        } else {
                            coverIMG = coverIMG.original;
                        };

                        await fetch(`${genres}`, {
                            method: 'GET',
                            headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' }
                        })
                            .then(res1 => res1.json())
                            .then(async res1 => {

                                var genreval = [];
                                if (res1.data[0].attributes.title === null) {
                                    genreval.push(null);
                                } else {
                                    for (var o = 0; o < res1.data.length; o++) {
                                        genreval.push(res1.data[o].attributes.title);
                                    };
                                };

                                if (genreval == null || genreval == "") {
                                    genreval = "No Genres in Database.";
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
                                    .addField('Genre:', genreval)
                                    .addField('Chapters:', chapters)
                                    .addField('Status:', status)
                                    .addField('Published:', `${subtype} ${start} - ${end}`)
                                    .addField('Type:', bot.caps(type))
                                    .addField('Community Rating:', avgRating);

                                await em1.edit(`${user}, here is your result for ${canonTitle}`, { embed });
                            });
                    });
            });

            collector.on('end', collected => {
                if (collected.size == 0) {
                    em1.delete();
                    message.channel.send(`${user}, you didn't react fast enough, try again!`);
                } else { return }
            });
        });
};

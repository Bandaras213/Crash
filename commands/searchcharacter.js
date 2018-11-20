const fetch = require('node-fetch')
const query = require("../data/characterquery.js")

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

    let charactername = args.join(' ');
    let user = message.member.user;
    let i;
    let color = Math.floor(Math.random() * 16777214) + 1;
    let uid = message.author.id;
    message.delete();

    if (args.length == 0) {
        return message.channel.send(`${user}, I need a Name to search for! (Usage: €betacharacter Name)`);
    };

    await query;

    let variables = {
        search: charactername,
        page: 1,
        perPage: 7
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

            for (let a = 0; a < fetch1.data.Page.characters.length; a++) {
                let name = fetch1.data.Page.characters[a].name.first;
                if (fetch1.data.Page.characters[a].name.last != null) {
                    name += ` ${fetch1.data.Page.characters[a].name.last}`;
                };

                let titlecheck;
                if (fetch1.data.Page.characters[a].media.nodes[0].title.romaji == null) {
                    titlecheck = fetch1.data.Page.characters[a].media.nodes[0].title.english;
                } else {
                    titlecheck = fetch1.data.Page.characters[a].media.nodes[0].title.romaji;
                };

                field1.push({
                    "name": `${name} (${titlecheck})`,
                    "value": `Reaction: ${emoji[a + 1]}`
                });
            };

            if (field1.length == 0) {
                return message.channel.send(`${user}, Couldn't find a matching character`);
            };

            let embed

            switch (fetch1.data.Page.characters.length) {
                case 1:
                    embed = {
                        "color": 65280,
                        "author": {
                            "name": `Results for "${charactername}"`,
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
                            "name": `Results for "${charactername}"`,
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
                            "name": `Results for "${charactername}"`,
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
                            "name": `Results for "${charactername}"`,
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
                            "name": `Results for "${charactername}"`,
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
                            "name": `Results for "${charactername}"`,
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
                            "name": `Results for "${charactername}"`,
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
            switch (fetch1.data.Page.characters.length) {
                case 0:
                    em1 = await message.channel.send(`${user}, Couldn't find any Results for "${args.join(" ")}"!`);
                    return;
                case 1:
                    em1 = await message.channel.send(`${user} is choosing a Character.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[0]);
                    break;
                case 2:
                    em1 = await message.channel.send(`${user} is choosing a Character.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[0]);
                    break;
                case 3:
                    em1 = await message.channel.send(`${user} is choosing a Character.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[0]);
                    break;
                case 4:
                    em1 = await message.channel.send(`${user} is choosing a Character.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[0]);
                    break;
                case 5:
                    em1 = await message.channel.send(`${user} is choosing a Character.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[5]);
                    await em1.react(emoji[0]);
                    break;
                case 6:
                    em1 = await message.channel.send(`${user} is choosing a Character.`, { embed });
                    await em1.react(emoji[1]);
                    await em1.react(emoji[2]);
                    await em1.react(emoji[3]);
                    await em1.react(emoji[4]);
                    await em1.react(emoji[5]);
                    await em1.react(emoji[6]);
                    await em1.react(emoji[0]);
                    break;
                case 7:
                    em1 = await message.channel.send(`${user} is choosing a Character.`, { embed });
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
                        break;
                    case emoji[2]:
                        em1.clearReactions();
                        i = 1
                        break;
                    case emoji[3]:
                        em1.clearReactions();
                        i = 2
                        break;
                    case emoji[4]:
                        em1.clearReactions();
                        i = 3
                        break;
                    case emoji[5]:
                        em1.clearReactions();
                        i = 4
                        break;
                    case emoji[6]:
                        em1.clearReactions();
                        i = 5
                        break;
                    case emoji[7]:
                        em1.clearReactions();
                        i = 6
                        break;
                };

                let alternative = fetch1.data.Page.characters[i].name.alternative;
                let url = fetch1.data.Page.characters[i].siteUrl;
                let imageUrl = fetch1.data.Page.characters[i].image.large;
                let description = fetch1.data.Page.characters[i].description;
                let isindatas = fetch1.data.Page.characters[i].media.nodes;
                let siteUrl = fetch1.data.Page.characters[i].media.nodes;
                let format = fetch1.data.Page.characters[i].media.nodes;

                const anilistLogo = "https://anilist.co/img/logo_al.png";

                description = description.replace(/<[^>]*>/g, ' ').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/\s{2,}/g, ' ').replace(/__/g, "").trim().split("~!");
                description = description[0].toString();

                let name = fetch1.data.Page.characters[i].name.first;
                if (fetch1.data.Page.characters[i].name.last != null) {
                    name += ` ${fetch1.data.Page.characters[i].name.last}`;
                };

                let subname;
                if (alternative == null || alternative == "") {
                    subname = name;
                } else {
                    subname = name + ", " + alternative.toString().split(",").join(", ");
                };

                let isindata = [];
                for (let b = 0; b < isindatas.length; ++b) {
                    isindata.push("[" + isindatas[b].title.romaji + "]" + "(" + siteUrl[b].siteUrl + ")" + " (" + bot.caps(format[b].format) + ")");
                };

                let isin = isindata.join("\n");
                let embed = new Discord.RichEmbed()
                    .setTitle(subname)
                    .setAuthor(name, anilistLogo)
                    .setColor(0x00AE86)
                    .setThumbnail(imageUrl)
                    .setURL(url)
                    .setFooter(name, anilistLogo)
                    .setDescription(description.substring(0, 2043) + " ...")
                    .addField("Character In:", isin);

                await em1.edit(`${user}, here is the result for ${name}`, { embed });
            });

            collector.on('end', collected => {
                if (collected.size == 0) {
                    em1.delete();
                    message.channel.send(`${user}, You didn't react fast enough, try again!`);
                };
            });
        });
};
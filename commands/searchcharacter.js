const fetch = require('node-fetch')
const query = require("../data/characterquery.js");

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

var value1 = [
    `Reaction: ${emoji[1]}`,
    `Reaction: ${emoji[2]}`,
    `Reaction: ${emoji[3]}`,
    `Reaction: ${emoji[4]}`,
    `Reaction: ${emoji[5]}`,
    `Reaction: ${emoji[6]}`,
    `Reaction: ${emoji[7]}`
];

module.exports = async (bot, message, args, Discord, moment) => {

    let charactername = args.join(' ');
    let user = message.member.user;
    let i;
    //let color = Math.floor(Math.random() * 16777214) + 1;
    let uid = message.author.id;
    await message.delete();

    if (args.length == 0) {
        return message.channel.send(`${user}, I need a Name to search for! (Usage: €character Name)`);
    };

    await query;

    let variables = {
        search: charactername,
        page: 1,
        perPage: 20,
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

            let fieldfilter = [];
            let field2 = [];
            let field3 = [];

            for (let a = 0; a < fetch1.data.Page.characters.length; a++) {
                let name = fetch1.data.Page.characters[a].name.first;
                if (fetch1.data.Page.characters[a].name.last != null) {
                    name += ` ${fetch1.data.Page.characters[a].name.last}`;
                };

                var titlecheck;
                var characterRole;
                var namerip = fetch1.data.Page.characters[a].media.edges;
                if (namerip.length < 1) {
                    titlecheck = "No Media in Database";
                    characterRole = "Unknown.";
                } else {
                    characterRole = fetch1.data.Page.characters[a].media.edges[0].characterRole;
                    titlecheck = fetch1.data.Page.characters[a].media.edges[0].node.title.romaji;
                };
                if (titlecheck == null) {
                    titlecheck = fetch1.data.Page.characters[a].media.edges[0].node.title.english;
                };

                if (characterRole === "MAIN") {
                    field2.push(`${name.replace("&#039;", "'")} (${titlecheck})`);
                    field2.push(`${a}`);
                } else {
                    field3.push(`${name.replace("&#039;", "'")} (${titlecheck})`);
                    field3.push(`${a}`);
                };
            };

            fieldfilter = field2.concat(field3);

            var index1 = fieldfilter.filter((_, i) => i % 2 == 1);
            var field1 = fieldfilter.filter((_, i) => i % 2 == 0);
            if (field1.length > 7) {
                field1.length = 7;
            } else {
                field1.length;
            };

            if (field1.length == 0) {
                return message.channel.send(`${user}, Couldn't find a matching character for '**${charactername}**'`);
            };

            let embed;

            switch (field1.length) {
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
                            {
                                "name": field1[0],
                                "value": value1[0]
                            },
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
                            {
                                "name": field1[0],
                                "value": value1[0]
                            },
                            {
                                "name": field1[1],
                                "value": value1[1]
                            },
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
                            {
                                "name": field1[0],
                                "value": value1[0]
                            },
                            {
                                "name": field1[1],
                                "value": value1[1]
                            },
                            {
                                "name": field1[2],
                                "value": value1[2]
                            },
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
                            {
                                "name": field1[0],
                                "value": value1[0]
                            },
                            {
                                "name": field1[1],
                                "value": value1[1]
                            },
                            {
                                "name": field1[2],
                                "value": value1[2]
                            },
                            {
                                "name": field1[3],
                                "value": value1[3]
                            },
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
                            {
                                "name": field1[0],
                                "value": value1[0]
                            },
                            {
                                "name": field1[1],
                                "value": value1[1]
                            },
                            {
                                "name": field1[2],
                                "value": value1[2]
                            },
                            {
                                "name": field1[3],
                                "value": value1[3]
                            },
                            {
                                "name": field1[4],
                                "value": value1[4]
                            },
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
                            {
                                "name": field1[0],
                                "value": value1[0]
                            },
                            {
                                "name": field1[1],
                                "value": value1[1]
                            },
                            {
                                "name": field1[2],
                                "value": value1[2]
                            },
                            {
                                "name": field1[3],
                                "value": value1[3]
                            },
                            {
                                "name": field1[4],
                                "value": value1[4]
                            },
                            {
                                "name": field1[5],
                                "value": value1[5]
                            },
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
                            {
                                "name": field1[0],
                                "value": value1[0]
                            },
                            {
                                "name": field1[1],
                                "value": value1[1]
                            },
                            {
                                "name": field1[2],
                                "value": value1[2]
                            },
                            {
                                "name": field1[3],
                                "value": value1[3]
                            },
                            {
                                "name": field1[4],
                                "value": value1[4]
                            },
                            {
                                "name": field1[5],
                                "value": value1[5]
                            },
                            {
                                "name": field1[6],
                                "value": value1[6]
                            },
                            {
                                "name": "None of the above (Abort Command)",
                                "value": `Reaction: ${emoji[0]}`
                            }
                        ]
                    };
                    break;
            };

            let em1;
            switch (field1.length) {
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
                        i = index1[0];
                        break;
                    case emoji[2]:
                        em1.clearReactions();
                        i = index1[1];
                        break;
                    case emoji[3]:
                        em1.clearReactions();
                        i = index1[2];
                        break;
                    case emoji[4]:
                        em1.clearReactions();
                        i = index1[3];
                        break;
                    case emoji[5]:
                        em1.clearReactions();
                        i = index1[4];
                        break;
                    case emoji[6]:
                        em1.clearReactions();
                        i = index1[5];
                        break;
                    case emoji[7]:
                        em1.clearReactions();
                        i = index1[6];
                        break;
                };

                let alternative = fetch1.data.Page.characters[i].name.alternative;
                let url = fetch1.data.Page.characters[i].siteUrl;
                let imageUrl = fetch1.data.Page.characters[i].image.large;
                let description = fetch1.data.Page.characters[i].description;
                let isindatas = fetch1.data.Page.characters[i].media.edges;
                let siteUrl = fetch1.data.Page.characters[i].media.edges;
                let format = fetch1.data.Page.characters[i].media.edges;

                const anilistLogo = "https://anilist.co/img/logo_al.png";
                if (description == null) {
                    description = "No Description in Database";
                } else {
                    description = description.replace(/<[^>]*>/g, ' ').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/\s{2,}/g, ' ').replace(/__/g, "").trim().split("~!");
                    description = description[0].toString();
                };
                if (description < 2043) {
                    description = description;
                } else {
                    description = description.substring(0, 2043) + "...";
                };

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

                var isin;
                var isindata = [];
                for (let d = 0; d < fetch1.data.Page.characters.length; d++) {
                    var isinrip = fetch1.data.Page.characters[d].media.edges;
                };
                if (isinrip.length < 1) {
                    isin = "No Media in Database.";
                } else {
                    for (let b = 0; b < isindatas.length; ++b) {
                        isindata.push("[" + isindatas[b].node.title.romaji + "]" + "(" + siteUrl[b].node.siteUrl + ")" + " (" + bot.caps(format[b].node.format) + ")");
                    }
                };
                if (isindata.length == 0) {
                    isin = "No Media in Database.";
                } else {
                    isin = isindata.join("\n");
                };

                let embed = new Discord.RichEmbed()
                    .setTitle(subname.replace("&#039;", "'"))
                    .setAuthor(name.replace("&#039;", "'"), anilistLogo)
                    .setColor(0x00AE86)
                    .setThumbnail(imageUrl)
                    .setURL(url)
                    .setFooter(name.replace("&#039;", "'"), anilistLogo)
                    .setDescription(description)
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

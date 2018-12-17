const fetch = require('node-fetch');
const query = require("../data/mangaquery.js");
const queryg = require("../data/genres.js");
const querypage = require("../data/mpages.js");
const { getColorFromURL } = require('color-thief-node');
const rgbHex = require('rgb-hex');

module.exports = async (bot, message, args, Discord, moment) => {

    let user = message.member.user;
    let color;
    message.delete();

    await queryg;

    let databody = {
        query: queryg,
    };

    await fetch('https://graphql.anilist.co', {
        method: 'post',
        body: JSON.stringify(databody),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
        .then(fetch2 => fetch2.json())
        .then(async fetch2 => {

            var rannumb1 = [];
            var rdmgenre = [];
            while (rannumb1.length < fetch2.data.GenreCollection.length) {
                var r = Math.floor(Math.random() * fetch2.data.GenreCollection.length) + 0;
                if (rannumb1.indexOf(r) === -1) rannumb1.push(r);
            };

            for (let rdm = 0; rdm < rannumb1.length; rdm++) {
                rdmgenre.push(fetch2.data.GenreCollection[rannumb1[rdm]])
            };

            let rdmgenrenmb = Math.floor(Math.random() * rdmgenre.length) + 0;
            let rdmnumbers = [];
            rdmnumbers.push(rdmgenre[rdmgenrenmb]);

            await querypage;

            let variables = {
                genre: rdmnumbers[0],
                page: 1,
                perPage: 50
            };

            let databody = {
                query: querypage,
                variables: variables
            };

            await fetch('https://graphql.anilist.co', {
                method: 'post',
                body: JSON.stringify(databody),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
                .then(fetch3 => fetch3.json())
                .then(async fetch3 => {

                    let rdmpage = Math.floor(Math.random() * fetch3.data.Page.pageInfo.lastPage);
                    rdmnumbers.push(rdmpage)

                    await query;

                    let variables = {
                        genre: rdmnumbers[0],
                        page: rdmnumbers[1],
                        perPage: 50,
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

                            let i = Math.floor(Math.random() * 49) + 1;
                            let nsfw = fetch1.data.Page.media[i].isAdult;

                            let mangatitle;
                            if (fetch1.data.Page.media[i].title.romaji == null) {
                                mangatitle = fetch1.data.Page.media[i].title.english;
                            } else {
                                mangatitle = fetch1.data.Page.media[i].title.romaji;
                            };

                            if (fetch1.data.Page.media[i].title.romaji == null && fetch1.data.Page.media[i].title.english == null) {
                                mangatitle = "Unknown.";
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

                            let mangaurl;
                            if (fetch1.data.Page.media[i].siteUrl == null) {
                                mangaurl = "https://anilist.co";
                            } else {
                                mangaurl = fetch1.data.Page.media[i].siteUrl;
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

                            let status;
                            if (fetch1.data.Page.media[i].status == null) {
                                status = "No Status found.";
                            } else {
                                status = bot.caps(fetch1.data.Page.media[i].status);
                            };

                            let start;
                            let end;
                            let airings = [];
                            if (fetch1.data.Page.media[i].startDate.day == null || fetch1.data.Page.media[i].startDate.month == null || fetch1.data.Page.media[i].startDate.year == null) {
                                start = "No Start or End Date in Database.";
                                airings.push(start);
                            } else {
                                start = fetch1.data.Page.media[i].startDate.day + "." + fetch1.data.Page.media[i].startDate.month + "." + fetch1.data.Page.media[i].startDate.year;
                            };

                            if (fetch1.data.Page.media[i].endDate.day == null || fetch1.data.Page.media[i].endDate.month == null || fetch1.data.Page.media[i].endDate.year == null) {
                                end = "";
                            } else {
                                end = "to " + fetch1.data.Page.media[i].endDate.day + "." + fetch1.data.Page.media[i].endDate.month + "." + fetch1.data.Page.media[i].endDate.year;
                            };

                            airings.push(start + " " + end)

                            let chapters = fetch1.data.Page.media[i].chapterd;
                            if (fetch1.data.Page.media[i].chapters == null) {
                                chapters = "No Chapters in Database.";
                            } else {
                                chapters = fetch1.data.Page.media[i].chapters;
                            };

                            let volumes;
                            if (fetch1.data.Page.media[i].volumes == null) {
                                volumes = "No Volumes in Database.";
                            } else {
                                volumes = fetch1.data.Page.media[i].volumes;
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

                            let staff;
                            let staffdata = [];
                            if (fetch1.data.Page.media[i].staff.edges.length == 0) {
                                staff = "No Staff in Database.";
                            } else {
                                let staffdatas = fetch1.data.Page.media[i].staff.edges;
                                for (let m = 0; m < staffdatas.length; ++m) {
                                    if (staffdatas[m].role == "Story & Art") {
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

                            let embed;
                            if (status == "Finished") {
                                embed = new Discord.RichEmbed()
                                    .setTitle(mangatitle)
                                    .setColor(color)
                                    .setDescription(description)
                                    .setFooter(mangatitle)
                                    .setImage(posterIMG)
                                    .setThumbnail(coverIMG)
                                    .setTimestamp()
                                    .setURL(mangaurl)
                                    .addField('Type:', `${bot.caps(format.split("_"))}`)
                                    .addField('Genres:', `${genres}`)
                                    .addField('Main Characters:', `${mainchar}`)
                                    .addField('Status:', `${status}`)
                                    .addField('Released:', `${start} ${end}`)
                                    .addField('Chapter:', chapters)
                                    .addField('Volumes:', `${volumes}`)
                                    .addField('Community Rating:', avgRating)
                                    .addField('Source:', `${sourcefilter}`)
                                    .addField('Staff:', `${staff}`);
                            } else {
                                embed = new Discord.RichEmbed()
                                    .setTitle(mangatitle)
                                    .setColor(color)
                                    .setDescription(description)
                                    .setFooter(mangatitle)
                                    .setImage(posterIMG)
                                    .setThumbnail(coverIMG)
                                    .setTimestamp()
                                    .setURL(mangaurl)
                                    .addField('Type:', `${bot.caps(format.split("_"))}`)
                                    .addField('Genres:', `${genres}`)
                                    .addField('Main Characters:', `${mainchar}`)
                                    .addField('Status:', `${status}`)
                                    .addField('Released:', `From ${start} ${end}`)
                                    .addField('Community Rating:', avgRating)
                                    .addField('Source:', `${sourcefilter}`)
                                    .addField('Staff:', `${staff}`);
                            };

                            if (nsfw == false) {
                                await message.channel.send(`${user}, Your Random Anime is: ${mangatitle}`, { embed });
                            } else {
                                await message.channel.send(`${user}, Your randomly selected Anime is NSFW! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
                                await message.author.send(`${user}, Your Random Anime is: ${mangatitle}`, { embed });
                            };
                        });
                });
        });
};

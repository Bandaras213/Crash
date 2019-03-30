const fetch = require("node-fetch");
const moment = require("moment");
const fs = require("fs");
const p2w = require("../data/userp2w.js");
const { getColorFromURL } = require('color-thief-node');
const rgbHex = require('rgb-hex');

module.exports = async (bot, message, args, Discord) => {

    let user = message.author;
    let color;
    let UserlistDB = "data/userlists.json";
    let UserlistDBobj = JSON.parse(fs.readFileSync(UserlistDB, 'utf8'));
    let anilistid;
    let anilistname = UserlistDBobj.userlist.find(did => did.anilistusername == args[0]);
    let anilistuserindex;
    let listindex;
    let mediatype;
    let variables;
    message.delete();

    if (args[0] == undefined) {
        return message.channel.send(`${user}, Looks like you didn't provide a Anilist Username!`);
    };
  
  if (args[1] != undefined) {
    mediatype = bot.allcaps(args[1])};
  if (mediatype != "MANGA") {
    mediatype = "ANIME"};

    if (anilistname == undefined) {
        let userName = args[0]
        listindex = 3
      if (mediatype == undefined || mediatype == "ANIME") {
        variables = {
          userName: userName,
          type: "ANIME"
        };
      } else {
        variables = {
            userName: userName,
            type: mediatype
        }};
    } else {
        anilistuserindex = UserlistDBobj.userlist.findIndex(did => did.anilistusername == args[0]);
        anilistid = await UserlistDBobj.userlist[anilistuserindex].anilistid;
        listindex = 1
      if (mediatype == undefined || mediatype == "ANIME") {
        variables = {
            userId: anilistid,
            type: "ANIME"
        }
    } else {
      variables = {
        userId: anilistid,
        type: mediatype
      }}};

    await p2w

    let databody = {
        query: p2w,
        variables: variables
    };

    await fetch('https://graphql.anilist.co', {
        method: 'post',
        body: JSON.stringify(databody),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
        .then(fetch1 => fetch1.json())
        .then(async fetch1 => {
      
            let i = Math.floor(Math.random() * fetch1.data.MediaListCollection.lists[listindex].entries.length) + 0;

            let nsfw = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.isAdult;
            let animetitle;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.romaji == null) {
                animetitle = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.english;
            } else {
                animetitle = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.romaji;
            };

            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.romaji == null && fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.english == null) {
                animetitle = "Unknown.";
            };
      
            let mangatitle;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.romaji == null) {
                mangatitle = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.english;
            } else {
                mangatitle = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.romaji;
            };

            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.romaji == null && fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.english == null) {
                mangatitle = "Unknown.";
            };

            let description;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.description == null) {
                description = "No Description found.";
            } else {
                description = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.description.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
            };

            let coverIMG;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.coverImage.large == null) {
                coverIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Foie_canvas%20(1).png?1541619925848";
            } else {
                coverIMG = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.coverImage.large;
            };

            let posterIMG;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.bannerImage == null) {
                posterIMG = '';
            } else {
                posterIMG = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.bannerImage;
            };

            let animeurl;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.siteUrl == null) {
                animeurl = "https://anilist.co";
            } else {
                animeurl = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.siteUrl;
            };
      
            let mangaurl;
if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.siteUrl == null) {
mangaurl = "https://anilist.co";
} else {
mangaurl = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.siteUrl;
};

let chapters = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.chapterd;
if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.chapters == null) {
chapters = "No Chapters in Database.";
} else {
chapters = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.chapters;
};

let volumes;
if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.volumes == null) {
volumes = "No Volumes in Database.";
} else {
volumes = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.volumes;
};

            let video;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.trailer == null) {
                video = "No Video found.";
            } else {
                video = `[Click Me](https://www.youtube.com/watch?v=` + `${fetch1.data.MediaListCollection.lists[listindex].entries[i].media.trailer.id})`;
            };

            let format;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.format == null) {
                format = "Unknown.";
            } else {
                format = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.format;
            };

            let genres;
            let genre1 = [];
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.genres.length == 0) {
                genres = "No Genres found.";
            } else {
                for (let b = 0; b < fetch1.data.MediaListCollection.lists[listindex].entries[i].media.genres.length; ++b) {
                    genre1.push(fetch1.data.MediaListCollection.lists[listindex].entries[i].media.genres[b]);
                };
            };

            if (genre1.length == 0) {
                genres = "No Genres found.";
            } else {
                genres = genre1.join(", ");
            };

            let status
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.status == null) {
                status = "No Status found.";
            } else {
                status = bot.caps(fetch1.data.MediaListCollection.lists[listindex].entries[i].media.status);
            };

            let season;
            let start;
            let end;
            let airings = [];
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.season == null) {
                season = "";
            } else {
                season = bot.caps(fetch1.data.MediaListCollection.lists[listindex].entries[i].media.season);
            };

            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.day == null || fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.month == null || fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.year == null) {
                start = "No Start or End date in Database.";
                airings.push(start);
            } else {
                start = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.day + "." + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.month + "." + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.year;
            };

            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.day == null || fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.month == null || fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.year == null) {
                end = "";
            } else {
                end = "to " + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.day + "." + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.month + "." + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.year;
            };

            airings.push(season + " " + start + " " + end);

            let nextepi;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.nextAiringEpisode == null) {
                nextepi = "No new Episodes to Air.";
            } else {
                let dateairing;
                dateairing = new Date(fetch1.data.MediaListCollection.lists[listindex].entries[i].media.nextAiringEpisode.airingAt * 1000);
                dateairing = dateairing.toUTCString();
                dateairing = `${moment(dateairing).format('DD.MM.YYYY')}` + " at " + `${moment(dateairing).format('hh:mm a')}`;
                nextepi = "Episode " + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.nextAiringEpisode.episode + ", Airing on: " + dateairing;
            };

            let episodes = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.episodes;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.episodes == null) {
                episodes = "No Episodes in the Database.";
            } else {
                episodes = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.episodes;
            };

            let episodemin;
            let episodemins;
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.duration == null) {
                episodemin = "No Duration in Database.";
            } else {
                episodemin = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.duration + " minutes";
                episodemins = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.duration;
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
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.averageScore === null) {
                avgRating = "No Rating in Database.";
            } else {
                avgRating = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.averageScore + "%";
            };

            let sourcefilter
            if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.source == null || fetch1.data.MediaListCollection.lists[listindex].entries[i].media.source == undefined) {
                sourcefilter = "No Source in Database.";
            } else {
                sourcefilter = bot.caps(fetch1.data.MediaListCollection.lists[listindex].entries[i].media.source.split("_"));
            };

            const dominantColor = await getColorFromURL(coverIMG);
            color = rgbHex(`${dominantColor}`);
      
            let embed;
      
            if (mediatype == "ANIME") {

            embed = new Discord.RichEmbed()
                .setTitle(animetitle)
                .setColor(color)
                .setDescription(description)
                .setFooter(animetitle)
                .setImage(posterIMG)
                .setThumbnail(coverIMG)
                .setTimestamp()
                .setURL(animeurl)
                .addField('Preview Trailer:', `${video}`)
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
                await message.channel.send(`${user}, Your Random Plan 2 Watch Anime is: ${animetitle}`, { embed });
            } else {
                await message.channel.send(`${user}, Your randomly selected Plan 2 Watch Anime is NSFW! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
                await message.author.send(`${user}, Your Random Plan 2 Watch Anime is: ${animetitle}`, { embed });
            };
          };
      if (mediatype == "MANGA" && status == "Finished") {
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
                                    .addField('Status:', `${status}`)
                                    .addField('Released:', `${start} ${end}`)
                                    .addField('Chapter:', chapters)
                                    .addField('Volumes:', `${volumes}`)
                                    .addField('Community Rating:', avgRating)
                                    .addField('Source:', `${sourcefilter}`)
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
                                    .addField('Status:', `${status}`)
                                    .addField('Released:', `From ${start} ${end}`)
                                    .addField('Community Rating:', avgRating)
                                    .addField('Source:', `${sourcefilter}`)
                            };

                            if (nsfw == false) {
                                await message.channel.send(`${user}, Your Random Anime is: ${mangatitle}`, { embed });
                            } else {
                                await message.channel.send(`${user}, Your randomly selected Anime is NSFW! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
                                await message.author.send(`${user}, Your Random Anime is: ${mangatitle}`, { embed });
                            };
        })
};
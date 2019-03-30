import fetch from "node-fetch";
import moment from "moment";
import {
    readFileSync,
    writeFile
} from "fs";
import query from "../data/userquery.js";
import toHex from 'colornames';

export default async (bot, message, args, Discord) => {

    let user = message.author;
    let mention = message.mentions.users.first();
    let UserlistDB = "data/userlists.json";
    let UserlistDBobj = JSON.parse(readFileSync(UserlistDB, 'utf8'));
    let finduserdiscid = UserlistDBobj.userlist.find(did => did.discid == user.id);
    let findmentiondiscid
    if (mention) {
        findmentiondiscid = UserlistDBobj.userlist.find(did => did.discid == mention.id);
    }
    let indexuserdiscid;
    let indexmentiondiscid;
    let anilistid;
    const anilistLogo = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Flogo_al.png?1543900749555";
    let OVERWRITE = false

    if (finduserdiscid == undefined && args[0] != "save") {
        return message.channel.send(`${user}, Looks like you don't have a Anilist! Save a Anilist by using €anilist save [name]!`);
    };

    if (mention && findmentiondiscid == undefined && args[0] != "save") {
        return message.channel.send(`${user}, Looks like ${mention} doesn't have a Anilist!`);
    };

    let time;
    let timeconvert = (n) => {
        if (isNaN(n) || n == null) {
            return time = "Can't Calculate Time with no Episodes watched.";
        };
        return time = Math.floor(n / 24 / 60) + " " + "Days" + " " + Math.floor(n / 60 % 24) + " " + 'Hours' + " " + Math.floor(n % 60) + " " + 'Minutes';
    };

    if (finduserdiscid && mention == undefined && args[0] != "save") {
        indexuserdiscid = UserlistDBobj.userlist.findIndex(did => did.discid == user.id);
        anilistid = await UserlistDBobj.userlist[indexuserdiscid].anilistid;
        let variables = {
            id: anilistid,
            page: 1,
            perPage: 1,
        };

        let databody = {
            query: query,
            variables: variables
        };

        await fetch('https://graphql.anilist.co', {
            method: 'post',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(fetch1 => fetch1.json())
            .then(async fetch1 => {

                let username = fetch1.data.User.name;
                let userID = fetch1.data.User.id;

                let about = fetch1.data.User.about;
                if (about == null) {
                    about = `No Bio Information on ${username}'s Profile.`;
                } else {
                    about = about;
                };

                let avatar = fetch1.data.User.avatar.large;

                let bannerIMG = fetch1.data.User.bannerImage;
                if (bannerIMG == null) {
                    bannerIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Fnull.png";
                } else {
                    bannerIMG = bannerIMG;
                };

                let color = fetch1.data.User.options.profileColor;
                let colorfilter = toHex(`${color}`);
                color = colorfilter.replace('#', '');
                let siteUrl = fetch1.data.User.siteUrl;
                let updatedAt = fetch1.data.User.updatedAt;

                let favoritanimes = [];
                let favoritanime;
                let favourites = fetch1.data.User.favourites;
                if (favourites.anime.edges.length < 1) {
                    favoritanime = "No Favorite Animes on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    for (let ab = 0; ab < favourites.anime.edges.length; ++ab) {
                        let favname = favourites.anime.edges[ab].node.title.romaji;
                        let favstatus = bot.caps(favourites.anime.edges[ab].node.status);
                        let favlink = favourites.anime.edges[ab].node.siteUrl;
                        favoritanimes.push("[" + `${favname}` + "]" + "(" + `${favlink}` + ")" + " " + "[" + `${favstatus}` + "]" + "\n");
                    };
                };

                if (favoritanimes.length == 0) {
                    favoritanime = "No Favorit Animes on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    if (favoritanimes.length > 3) {
                        favoritanimes.length = 3;
                        favoritanime = favoritanimes.join(' ');
                    } else {
                        favoritanimes.join(' ');
                    };
                };

                let favoritmangas = [];
                let favoritmanga;
                if (favourites.manga.edges.length < 1) {
                    favoritmanga = "No Favorite Mangas on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    for (let aa = 0; aa < favourites.manga.edges.length; ++aa) {
                        let favname = favourites.manga.edges[aa].node.title.romaji;
                        let favstatus = bot.caps(favourites.manga.edges[aa].node.status);
                        let favlink = favourites.manga.edges[aa].node.siteUrl;
                        favoritmangas.push("[" + `${favname}` + "]" + "(" + `${favlink}` + ")" + " " + "[" + `${favstatus}` + "]" + "\n");
                    };
                };

                if (favoritmangas.length == 0) {
                    favoritmanga = "No Favorit Mangas on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    if (favoritmangas.length > 3) {
                        favoritmangas.length = 3;
                        favoritmanga = favoritmangas.join(' ');
                    } else {
                        favoritmanga = favoritmangas.join(' ');
                    };
                };

                let favoritcharacters = [];
                let favoritcharacter;
                if (favourites.characters.nodes.length < 1) {
                    favoritcharacter = "No Favorite Character on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    for (let ac = 0; ac < favourites.characters.nodes.length; ++ac) {
                        let favname = favourites.characters.nodes[ac].name.first;
                        if (favourites.characters.nodes[ac].name.last != null) {
                            favname += ` ${favourites.characters.nodes[ac].name.last}`;
                        };

                        let favaltname = favourites.characters.nodes[ac].name.alternative;
                        let favlink = favourites.characters.nodes[ac].siteUrl;
                        favoritcharacters.push("[" + `${favname}` + " " + "(" + `${favaltname}` + ")" + "]" + "(" + `${favlink}` + ")" + "\n");
                    };
                };
                if (favoritcharacters.length == 0) {
                    favoritcharacter = "No Favorit Characters on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    if (favoritcharacters.length > 3) {
                        favoritcharacters.length = 3;
                        favoritcharacter = favoritcharacters.join(' ');
                    } else {
                        favoritcharacter = favoritcharacters.join(' ');
                    };
                };

                let stats = fetch1.data.User.stats;
                let animewatchtime = stats.watchedTime;
                if (animewatchtime == null) {
                    time = "Can't Calculate Time with no Episodes watched.";
                } else {
                    timeconvert(animewatchtime);
                };

                let anistats = stats.animeStatusDistribution;
                let animescore = [];
                let animescores = stats.animeScoreDistribution;
                for (let a = 0; a < stats.animeScoreDistribution.length; ++a) {
                    switch (animescores[a].score) {
                        case 10:
                            animescore.push("**[1]:** " + `${animescores[a].amount}`);
                            break;
                        case 20:
                            animescore.push("**[2]:** " + `${animescores[a].amount}`);
                            break;
                        case 30:
                            animescore.push("**[3]:** " + `${animescores[a].amount}`);
                            break;
                        case 40:
                            animescore.push("**[4]:** " + `${animescores[a].amount}`);
                            break;
                        case 50:
                            animescore.push("**[5]:** " + `${animescores[a].amount}`);
                            break;
                        case 60:
                            animescore.push("**[6]:** " + `${animescores[a].amount}`);
                            break;
                        case 70:
                            animescore.push("**[7]:** " + `${animescores[a].amount}`);
                            break;
                        case 80:
                            animescore.push("**[8]:** " + `${animescores[a].amount}`);
                            break;
                        case 90:
                            animescore.push("**[9]:** " + `${animescores[a].amount}`);
                            break;
                        case 100:
                            animescore.push("**[10]:** " + `${animescores[a].amount}`);
                            break;
                    };
                };

                let chapterread = stats.chaptersRead;
                let mangastats = stats.mangaStatusDistribution;
                let mangascore = [];
                let mangascores = stats.mangaScoreDistribution;
                for (let b = 0; b < mangascores.length; ++b) {
                    switch (mangascores[b].score) {
                        case 10:
                            mangascore.push("**[1]:** " + `${mangascores[b].amount}`);
                            break;
                        case 20:
                            mangascore.push("**[2]:** " + `${mangascores[b].amount}`);
                            break;
                        case 30:
                            mangascore.push("**[3]:** " + `${mangascores[b].amount}`);
                            break;
                        case 40:
                            mangascore.push("**[4]:** " + `${mangascores[b].amount}`);
                            break;
                        case 50:
                            mangascore.push("**[5]:** " + `${mangascores[b].amount}`);
                            break;
                        case 60:
                            mangascore.push("**[6]:** " + `${mangascores[b].amount}`);
                            break;
                        case 70:
                            mangascore.push("**[7]:** " + `${mangascores[b].amount}`);
                            break;
                        case 80:
                            mangascore.push("**[8]:** " + `${mangascores[b].amount}`);
                            break;
                        case 90:
                            mangascore.push("**[9]:** " + `${mangascores[b].amount}`);
                            break;
                        case 100:
                            mangascore.push("**[10]:** " + `${mangascores[b].amount}`);
                            break;
                    };
                };

                let genrefav = [];
                let favgenre = stats.favouredGenresOverview;
                for (let c = 0; c < favgenre.length; ++c) {
                    genrefav.push(`${favgenre[c].genre}: ${favgenre[c].amount}` + "\n");
                };

                if (genrefav.length > 3) {
                    genrefav.length = 3;
                };

                let yearfav = [];
                let favyear = stats.favouredYears;
                for (let d = 0; d < favyear.length; ++d) {
                    yearfav.push(`Year: ${favyear[d].year}` + "\n" + `Amount Read/Watched: ${favyear[d].amount}` + " " + `Average Score: ${favyear[d].meanScore}` + "\n");
                };

                if (yearfav.length > 3) {
                    yearfav.length = 3;
                };

                let lastupdated;
                lastupdated = new Date(updatedAt * 1000);
                lastupdated = lastupdated.toUTCString();
                lastupdated = `${moment(lastupdated).format('DD.MM.YYYY')}` + " at " + `${moment(lastupdated).format('hh:mm a')}`;

                const embed = new Discord.RichEmbed()
                    .setAuthor(username + "'s List Infos", anilistLogo)
                    .setTitle(username)
                    .setColor(color)
                    .setDescription(about)
                    .setFooter(`Information about ${username}`, anilistLogo)
                    .setImage(bannerIMG)
                    .setThumbnail(avatar)
                    .setTimestamp()
                    .setURL(siteUrl)
                    .addField('Favorite Characters:', `${favoritcharacter}`)
                    .addField('Favorite Animes:', `${favoritanime}`)
                    .addField('Time Spend Watching Anime:', `${time}`)
                    .addField('Anime List:', "**Watching:** " + `${anistats[0].amount}` + "\n" + "**Plan to Watch:** " + `${anistats[1].amount}` + "\n" + "**Completed:** " + `${anistats[2].amount}` + "\n" + "**Dropped:** " + `${anistats[3].amount}` + "\n" + "**Paused:** " + `${anistats[4].amount}`)
                    .addField('Anime Scores (Score: Amount):', `${animescore.join(' ')}`)
                    .addField('Favorite Mangas:', `${favoritmanga}`)
                    .addField('Manga Chapters Read:', `${chapterread}`)
                    .addField('Manga List:', "**Reading:** " + `${mangastats[0].amount}` + "\n" + "**Plan to Read:** " + `${mangastats[1].amount}` + "\n" + "**Completed:** " + `${mangastats[2].amount}` + "\n" + "**Dropped:** " + `${mangastats[3].amount}` + "\n" + "**Paused:** " + `${mangastats[4].amount}`)
                    .addField('Manga Scores (Score: Amount):', `${mangascore.join(' ')}`)
                    .addField('Favorite Genres:', `${genrefav.join(' ')}`)
                    .addField('Favorite Years:', `${yearfav.join(' ')}`)
                    .addField('Last List Update:', `${lastupdated}`);

                await message.channel.send(`${user}, ${username} (${userID}) is your Anilist!`, {
                    embed
                });
            });

    };

    if (findmentiondiscid && args[0] != "save") {
        indexmentiondiscid = UserlistDBobj.userlist.findIndex(did => did.discid == mention.id);
        anilistid = await UserlistDBobj.userlist[indexmentiondiscid].anilistid;

        let variables = {
            id: anilistid,
            page: 1,
            perPage: 5,
        };

        let databody = {
            query: query,
            variables: variables
        };

        await fetch('https://graphql.anilist.co', {
            method: 'post',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(fetch1 => fetch1.json())
            .then(async fetch1 => {

                let username = fetch1.data.User.name;
                let userID = fetch1.data.User.id;

                let about = fetch1.data.User.about;
                if (about == null) {
                    about = `No Bio Information on ${username}'s Profile.`;
                } else {
                    about = about;
                };

                let avatar = fetch1.data.User.avatar.large;

                let bannerIMG = fetch1.data.User.bannerImage;
                if (bannerIMG == null) {
                    bannerIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Fnull.png";
                } else {
                    bannerIMG = bannerIMG;
                };

                let color = fetch1.data.User.options.profileColor;
                let colorfilter = toHex(`${color}`);
                color = colorfilter.replace('#', '');
                let siteUrl = fetch1.data.User.siteUrl;
                let updatedAt = fetch1.data.User.updatedAt;

                let favoritanimes = [];
                let favoritanime;
                let favourites = fetch1.data.User.favourites;
                if (favourites.anime.edges.length < 1) {
                    favoritanime = "No Favorite Animes on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    for (let ab = 0; ab < favourites.anime.edges.length; ++ab) {
                        let favname = favourites.anime.edges[ab].node.title.romaji;
                        let favstatus = bot.caps(favourites.anime.edges[ab].node.status);
                        let favlink = favourites.anime.edges[ab].node.siteUrl;
                        favoritanimes.push("[" + `${favname}` + "]" + "(" + `${favlink}` + ")" + " " + "[" + `${favstatus}` + "]" + "\n");
                    };
                };

                if (favoritanimes.length == 0) {
                    favoritanime = "No Favorit Animes on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    if (favoritanimes.length > 3) {
                        favoritanimes.length = 3;
                        favoritanime = favoritanimes.join(' ');
                    } else {
                        favoritanimes.join(' ');
                    };
                };

                let favoritmangas = [];
                let favoritmanga;
                if (favourites.manga.edges.length < 1) {
                    favoritmanga = "No Favorite Mangas on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    for (let aa = 0; aa < favourites.manga.edges.length; ++aa) {
                        let favname = favourites.manga.edges[aa].node.title.romaji;
                        let favstatus = bot.caps(favourites.manga.edges[aa].node.status);
                        let favlink = favourites.manga.edges[aa].node.siteUrl;
                        favoritmangas.push("[" + `${favname}` + "]" + "(" + `${favlink}` + ")" + " " + "[" + `${favstatus}` + "]" + "\n");
                    };
                };

                if (favoritmangas.length == 0) {
                    favoritmanga = "No Favorit Mangas on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    if (favoritmangas.length > 3) {
                        favoritmangas.length = 3;
                        favoritmanga = favoritmangas.join(' ');
                    } else {
                        favoritmanga = favoritmangas.join(' ');
                    };
                };

                let favoritcharacters = [];
                let favoritcharacter;
                if (favourites.characters.nodes.length < 1) {
                    favoritcharacter = "No Favorite Character on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    for (let ac = 0; ac < favourites.characters.nodes.length; ++ac) {
                        let favname = favourites.characters.nodes[ac].name.first;
                        if (favourites.characters.nodes[ac].name.last != null) {
                            favname += ` ${favourites.characters.nodes[ac].name.last}`;
                        };

                        let favaltname = favourites.characters.nodes[ac].name.alternative;
                        let favlink = favourites.characters.nodes[ac].siteUrl;
                        favoritcharacters.push("[" + `${favname}` + " " + "(" + `${favaltname}` + ")" + "]" + "(" + `${favlink}` + ")" + "\n");
                    };
                };

                if (favoritcharacters.length == 0) {
                    favoritcharacter = "No Favorit Characters on" + " " + `${username}` + "'s " + "Profile.";
                } else {
                    if (favoritcharacters.length > 3) {
                        favoritcharacters.length = 3;
                        favoritcharacter = favoritcharacters.join(' ');
                    } else {
                        favoritcharacter = favoritcharacters.join(' ');
                    };
                };

                let stats = fetch1.data.User.stats;
                let animewatchtime = stats.watchedTime;
                if (animewatchtime == null) {
                    time = "Can't Calculate Time with no Episodes watched.";
                } else {
                    timeconvert(animewatchtime);
                };

                let anistats = stats.animeStatusDistribution;
                let animescore = [];
                let animescores = stats.animeScoreDistribution;
                for (let a = 0; a < stats.animeScoreDistribution.length; ++a) {
                    switch (animescores[a].score) {
                        case 10:
                            animescore.push("**[1]:** " + `${animescores[a].amount}`);
                            break;
                        case 20:
                            animescore.push("**[2]:** " + `${animescores[a].amount}`);
                            break;
                        case 30:
                            animescore.push("**[3]:** " + `${animescores[a].amount}`);
                            break;
                        case 40:
                            animescore.push("**[4]:** " + `${animescores[a].amount}`);
                            break;
                        case 50:
                            animescore.push("**[5]:** " + `${animescores[a].amount}`);
                            break;
                        case 60:
                            animescore.push("**[6]:** " + `${animescores[a].amount}`);
                            break;
                        case 70:
                            animescore.push("**[7]:** " + `${animescores[a].amount}`);
                            break;
                        case 80:
                            animescore.push("**[8]:** " + `${animescores[a].amount}`);
                            break;
                        case 90:
                            animescore.push("**[9]:** " + `${animescores[a].amount}`);
                            break;
                        case 100:
                            animescore.push("**[10]:** " + `${animescores[a].amount}`);
                            break;
                    };
                };

                let chapterread = stats.chaptersRead;
                let mangastats = stats.mangaStatusDistribution;
                let mangascore = [];
                let mangascores = stats.mangaScoreDistribution;
                for (let b = 0; b < mangascores.length; ++b) {
                    switch (mangascores[b].score) {
                        case 10:
                            mangascore.push("**[1]:** " + `${mangascores[b].amount}`);
                            break;
                        case 20:
                            mangascore.push("**[2]:** " + `${mangascores[b].amount}`);
                            break;
                        case 30:
                            mangascore.push("**[3]:** " + `${mangascores[b].amount}`);
                            break;
                        case 40:
                            mangascore.push("**[4]:** " + `${mangascores[b].amount}`);
                            break;
                        case 50:
                            mangascore.push("**[5]:** " + `${mangascores[b].amount}`);
                            break;
                        case 60:
                            mangascore.push("**[6]:** " + `${mangascores[b].amount}`);
                            break;
                        case 70:
                            mangascore.push("**[7]:** " + `${mangascores[b].amount}`);
                            break;
                        case 80:
                            mangascore.push("**[8]:** " + `${mangascores[b].amount}`);
                            break;
                        case 90:
                            mangascore.push("**[9]:** " + `${mangascores[b].amount}`);
                            break;
                        case 100:
                            mangascore.push("**[10]:** " + `${mangascores[b].amount}`);
                            break;
                    };
                };

                let genrefav = [];
                let favgenre = stats.favouredGenresOverview;
                for (let c = 0; c < favgenre.length; ++c) {
                    genrefav.push(`${favgenre[c].genre}: ${favgenre[c].amount}` + "\n");
                };
                if (genrefav.length > 3) {
                    genrefav.length = 3
                };

                let yearfav = [];
                let favyear = stats.favouredYears;
                for (let d = 0; d < favyear.length; ++d) {
                    yearfav.push(`Year: ${favyear[d].year}` + "\n" + `Amount Read/Watched: ${favyear[d].amount}` + " " + `Average Score: ${favyear[d].meanScore}` + "\n");
                };
                if (yearfav.length > 3) {
                    yearfav.length = 3
                };

                let lastupdated;
                lastupdated = new Date(updatedAt * 1000);
                lastupdated = lastupdated.toUTCString();
                lastupdated = `${moment(lastupdated).format('DD.MM.YYYY')}` + " at " + `${moment(lastupdated).format('hh:mm a')}`;

                const embed = new Discord.RichEmbed()
                    .setAuthor(username + "'s List Info", anilistLogo)
                    .setTitle(username)
                    .setColor(color)
                    .setDescription(about)
                    .setFooter(`Information about ${username}`, anilistLogo)
                    .setImage(bannerIMG)
                    .setThumbnail(avatar)
                    .setTimestamp()
                    .setURL(siteUrl)
                    .addField('Favorite Characters:', `${favoritcharacter}`)
                    .addField('Favorite Animes:', `${favoritanime}`)
                    .addField('Time Spend Watching Anime:', `${time}`)
                    .addField('Anime List:', "**Watching:** " + `${anistats[0].amount}` + "\n" + "**Plan to Watch:** " + `${anistats[1].amount}` + "\n" + "**Completed:** " + `${anistats[2].amount}` + "\n" + "**Dropped:** " + `${anistats[3].amount}` + "\n" + "**Paused:** " + `${anistats[4].amount}`)
                    .addField('Anime Scores (Score: Amount):', `${animescore.join(' ')}`)
                    .addField('Favorite Mangas:', `${favoritmanga}`)
                    .addField('Manga Chapters Read:', `${chapterread}`)
                    .addField('Manga List:', "**Reading:** " + `${mangastats[0].amount}` + "\n" + "**Plan to Read:** " + `${mangastats[1].amount}` + "\n" + "**Completed:** " + `${mangastats[2].amount}` + "\n" + "**Dropped:** " + `${mangastats[3].amount}` + "\n" + "**Paused:** " + `${mangastats[4].amount}`)
                    .addField('Manga Scores (Score: Amount):', `${mangascore.join(' ')}`)
                    .addField('Favorite Genres:', `${genrefav.join(' ')}`)
                    .addField('Favorite Years:', `${yearfav.join(' ')}`)
                    .addField('Last List Update:', `${lastupdated}`)

                await message.channel.send(`${user}, ${username} (${userID}) is ${mention}'s Anilist Profile!`, {
                    embed
                });
            });

    };

    if (args[0] == "save") {

        if (finduserdiscid != undefined) {
            OVERWRITE = true;
        };

        if (args.length < 2) {
            return message.channel.send(`${user}, I need a Name to search for!`);
        };

        args.splice(0, 1);
        let usersearchname = args.join(' ');

        await query;

        let variables = {
            name: usersearchname,
            page: 1,
            perPage: 1,
        };

        let databody = {
            query: query,
            variables: variables
        };

        await fetch('https://graphql.anilist.co', {
            method: 'post',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(fetch1 => fetch1.json())
            .then(async fetch1 => {

                if (fetch1.data.User == null) {
                    return message.channel.send(`${user}, Couldn't find a matching Anilist for '**${usersearchname}**'`);
                };

                let username = fetch1.data.User.name;
                let userIDS = fetch1.data.User.id


                let about = fetch1.data.User.about;
                if (about == null) {
                    about = `No Bio Information on ${usersearchname}'s Profile.`;
                } else {
                    about = about
                };

                let avatar = fetch1.data.User.avatar.large;

                let bannerIMG = fetch1.data.User.bannerImage;
                if (bannerIMG == null) {
                    bannerIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Fnull.png";
                } else {
                    bannerIMG = bannerIMG
                };

                let color = fetch1.data.User.options.profileColor;
                let colorfilter = toHex(`${color}`);
                color = colorfilter.replace('#', '');
                let siteUrl = fetch1.data.User.siteUrl;
                let updatedAt = fetch1.data.User.updatedAt;

                let favoritanimes = [];
                let favoritanime;
                let favourites = fetch1.data.User.favourites;
                if (favourites.anime.edges.length < 1) {
                    favoritanime = "No Favorite Animes on" + " " + `${usersearchname}` + "'s " + "Profile.";
                } else {
                    for (let ab = 0; ab < favourites.anime.edges.length; ++ab) {
                        let favname = favourites.anime.edges[ab].node.title.romaji;
                        let favstatus = bot.caps(favourites.anime.edges[ab].node.status);
                        let favlink = favourites.anime.edges[ab].node.siteUrl;
                        favoritanimes.push("[" + `${favname}` + "]" + "(" + `${favlink}` + ")" + " " + "[" + `${favstatus}` + "]" + "\n");
                    };
                };

                if (favoritanimes.length == 0) {
                    favoritanime = "No Favorit Animes on" + " " + `${usersearchname}` + "'s " + "Profile.";
                } else {
                    if (favoritanimes.length > 3) {
                        favoritanimes.length = 3;
                        favoritanime = favoritanimes.join(' ');
                    } else {
                        favoritanimes.join(' ');
                    };
                };

                let favoritmangas = [];
                let favoritmanga;
                if (favourites.manga.edges.length < 1) {
                    favoritmanga = "No Favorite Mangas on" + " " + `${usersearchname}` + "'s " + "Profile.";
                } else {
                    for (let aa = 0; aa < favourites.manga.edges.length; ++aa) {
                        let favname = favourites.manga.edges[aa].node.title.romaji;
                        let favstatus = bot.caps(favourites.manga.edges[aa].node.status);
                        let favlink = favourites.manga.edges[aa].node.siteUrl;
                        favoritmangas.push("[" + `${favname}` + "]" + "(" + `${favlink}` + ")" + " " + "[" + `${favstatus}` + "]" + "\n");
                    };
                };

                if (favoritmangas.length == 0) {
                    favoritmanga = "No Favorit Mangas on" + " " + `${usersearchname}` + "'s " + "Profile.";
                } else {
                    if (favoritmangas.length > 3) {
                        favoritmangas.length = 3;
                        favoritmanga = favoritmangas.join(' ');
                    } else {
                        favoritmanga = favoritmangas.join(' ');
                    };
                };

                let favoritcharacters = [];
                let favoritcharacter;
                if (favourites.characters.nodes.length < 1) {
                    favoritcharacter = "No Favorite Character on" + " " + `${usersearchname}` + "'s " + "Profile.";
                } else {
                    for (let ac = 0; ac < favourites.characters.nodes.length; ++ac) {
                        let favname = favourites.characters.nodes[ac].name.first;
                        if (favourites.characters.nodes[ac].name.last != null) {
                            favname += ` ${favourites.characters.nodes[ac].name.last}`;
                        };

                        let favaltname = favourites.characters.nodes[ac].name.alternative;
                        let favlink = favourites.characters.nodes[ac].siteUrl;
                        favoritcharacters.push("[" + `${favname}` + " " + "(" + `${favaltname}` + ")" + "]" + "(" + `${favlink}` + ")" + "\n");
                    };
                };

                if (favoritcharacters.length == 0) {
                    favoritcharacter = "No Favorit Characters on" + " " + `${usersearchname}` + "'s " + "Profile.";
                } else {
                    if (favoritcharacters.length > 3) {
                        favoritcharacters.length = 3;
                        favoritcharacter = favoritcharacters.join(' ');
                    } else {
                        favoritcharacter = favoritcharacters.join(' ');
                    };
                };

                let stats = fetch1.data.User.stats;
                let animewatchtime = stats.watchedTime;
                if (animewatchtime == null) {
                    time = "Can't Calculate Time with no Episodes watched.";
                } else {
                    timeconvert(animewatchtime);
                };

                let anistats = stats.animeStatusDistribution;
                let animescore = [];
                let animescores = stats.animeScoreDistribution;
                for (let a = 0; a < stats.animeScoreDistribution.length; ++a) {
                    switch (animescores[a].score) {
                        case 10:
                            animescore.push("**[1]:** " + `${animescores[a].amount}`);
                            break;
                        case 20:
                            animescore.push("**[2]:** " + `${animescores[a].amount}`);
                            break;
                        case 30:
                            animescore.push("**[3]:** " + `${animescores[a].amount}`);
                            break;
                        case 40:
                            animescore.push("**[4]:** " + `${animescores[a].amount}`);
                            break;
                        case 50:
                            animescore.push("**[5]:** " + `${animescores[a].amount}`);
                            break;
                        case 60:
                            animescore.push("**[6]:** " + `${animescores[a].amount}`);
                            break;
                        case 70:
                            animescore.push("**[7]:** " + `${animescores[a].amount}`);
                            break;
                        case 80:
                            animescore.push("**[8]:** " + `${animescores[a].amount}`);
                            break;
                        case 90:
                            animescore.push("**[9]:** " + `${animescores[a].amount}`);
                            break;
                        case 100:
                            animescore.push("**[10]:** " + `${animescores[a].amount}`);
                            break;
                    };
                };

                let chapterread = stats.chaptersRead;
                let mangastats = stats.mangaStatusDistribution;
                let mangascore = [];
                let mangascores = stats.mangaScoreDistribution;
                for (let b = 0; b < mangascores.length; ++b) {
                    switch (mangascores[b].score) {
                        case 10:
                            mangascore.push("**[1]:** " + `${mangascores[b].amount}`);
                            break;
                        case 20:
                            mangascore.push("**[2]:** " + `${mangascores[b].amount}`);
                            break;
                        case 30:
                            mangascore.push("**[3]:** " + `${mangascores[b].amount}`);
                            break;
                        case 40:
                            mangascore.push("**[4]:** " + `${mangascores[b].amount}`);
                            break;
                        case 50:
                            mangascore.push("**[5]:** " + `${mangascores[b].amount}`);
                            break;
                        case 60:
                            mangascore.push("**[6]:** " + `${mangascores[b].amount}`);
                            break;
                        case 70:
                            mangascore.push("**[7]:** " + `${mangascores[b].amount}`);
                            break;
                        case 80:
                            mangascore.push("**[8]:** " + `${mangascores[b].amount}`);
                            break;
                        case 90:
                            mangascore.push("**[9]:** " + `${mangascores[b].amount}`);
                            break;
                        case 100:
                            mangascore.push("**[10]:** " + `${mangascores[b].amount}`);
                            break;
                    };
                };

                let genrefav = [];
                let favgenre = stats.favouredGenresOverview;
                for (let c = 0; c < favgenre.length; ++c) {
                    genrefav.push(`${favgenre[c].genre}: ${favgenre[c].amount}` + "\n");
                };

                if (genrefav.length > 3) {
                    genrefav.length = 3;
                };

                let yearfav = [];
                let favyear = stats.favouredYears;
                for (let d = 0; d < favyear.length; ++d) {
                    yearfav.push(`Year: ${favyear[d].year}` + "\n" + `Amount Read/Watched: ${favyear[d].amount}` + " " + `Average Score: ${favyear[d].meanScore}` + "\n");
                };

                if (yearfav.length > 3) {
                    yearfav.length = 3;
                };

                let lastupdated;
                lastupdated = new Date(updatedAt * 1000);
                lastupdated = lastupdated.toUTCString();
                lastupdated = `${moment(lastupdated).format('DD.MM.YYYY')}` + " at " + `${moment(lastupdated).format('hh:mm a')}`;

                const embed = new Discord.RichEmbed()
                    .setAuthor(username + "'s List Info", anilistLogo)
                    .setTitle(usersearchname)
                    .setColor(color)
                    .setDescription(about)
                    .setFooter(`Information about ${usersearchname}`, anilistLogo)
                    .setImage(bannerIMG)
                    .setThumbnail(avatar)
                    .setTimestamp()
                    .setURL(siteUrl)
                    .addField('Favorite Characters:', `${favoritcharacter}`)
                    .addField('Favorite Animes:', `${favoritanime}`)
                    .addField('Time Spend Watching Anime:', `${time}`)
                    .addField('Anime List:', "**Watching:** " + `${anistats[0].amount}` + "\n" + "**Plan to Watch:** " + `${anistats[1].amount}` + "\n" + "**Completed:** " + `${anistats[2].amount}` + "\n" + "**Dropped:** " + `${anistats[3].amount}` + "\n" + "**Paused:** " + `${anistats[4].amount}`)
                    .addField('Anime Scores (Score: Amount):', `${animescore.join(' ')}`)
                    .addField('Favorite Mangas:', `${favoritmanga}`)
                    .addField('Manga Chapters Read:', `${chapterread}`)
                    .addField('Manga List:', "**Reading:** " + `${mangastats[0].amount}` + "\n" + "**Plan to Read:** " + `${mangastats[1].amount}` + "\n" + "**Completed:** " + `${mangastats[2].amount}` + "\n" + "**Dropped:** " + `${mangastats[3].amount}` + "\n" + "**Paused:** " + `${mangastats[4].amount}`)
                    .addField('Manga Scores (Score: Amount):', `${mangascore.join(' ')}`)
                    .addField('Favorite Genres:', `${genrefav.join(' ')}`)
                    .addField('Favorite Years:', `${yearfav.join(' ')}`)
                    .addField('Last List Update:', `${lastupdated}`);

                await message.channel.send(`${user}, ${usersearchname} (${userIDS}) is now your Anilist!`, {
                    embed
                });

                if (OVERWRITE === true) {
                    indexuserdiscid = UserlistDBobj.userlist.findIndex(did => did.discid == user.id);
                    UserlistDBobj.userlist[indexuserdiscid].anilistid = `${userIDS}`;
                    UserlistDBobj.userlist[indexuserdiscid].anilistusername = username;
                } else {
                    UserlistDBobj["userlist"].push({
                        discid: user.id,
                        anilistid: `${fetch1.data.User.id}`,
                        anilistusername: username
                    });
                };

                writeFile(UserlistDB, JSON.stringify(UserlistDBobj, null, 2), 'utf8', (err) => {
                    if (err) bot.log("Unable to write file", "Error");
                });
            });
    };
};
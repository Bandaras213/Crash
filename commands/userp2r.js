const fetch = require("node-fetch");
const fs = require("fs");
const p2w = require("../data/userp2w.js");
const { getColorFromURL } = require("color-thief-node");
const rgbHex = require("rgb-hex");

module.exports = async (bot, message, args, Discord) => {
  let user = message.author;
  let color;
  let UserlistDB = "data/userlists.json";
  let UserlistDBobj = JSON.parse(fs.readFileSync(UserlistDB, "utf8"));
  let anilistid;
  let anilistname = UserlistDBobj.userlist.find(did => did.anilistusername == args[0]);
  let findmentiondiscid;
  let finduserdiscid = UserlistDBobj.userlist.find(did => did.discid == user.id);
  let anilistuserindex;
  let indexmentiondiscid;
  let variables;
  let userName;
  let test;
  let listindex;
  let mentioncheck = false;
  let mention = message.mentions.users.first();
  if (mention) {
    findmentiondiscid = UserlistDBobj.userlist.find(did => did.discid == mention.id);
    mentioncheck = true;
  }

  message.delete();

  if (finduserdiscid == undefined && args[0] == undefined) {
    return message.channel.send(`${user}, Looks like you don't have a Anilist! Save a Anilist by using €anilist save [name]!`);
  }

  if (mention && findmentiondiscid == undefined && args[0] == undefined) {
    return message.channel.send(`${user}, Looks like ${mention} doesn't have a Anilist!`);
  }

  if (anilistname == undefined && mentioncheck == false && args[0] != undefined) {
    test = 1;
    userName = args[0];
    listindex = 0;
    variables = {
      userName: userName,
      type: "MANGA",
      MediaListStatus: "PLANNING"
    };
  } else if (anilistname != undefined && mentioncheck == false) {
    anilistuserindex = UserlistDBobj.userlist.findIndex(did => did.anilistusername == args[0]);
    anilistid = await UserlistDBobj.userlist[anilistuserindex].anilistid;
    test = 2;
    listindex = 0;
    variables = {
      userId: anilistid,
      type: "MANGA",
      MediaListStatus: "PLANNING"
    };
  } else if (mentioncheck == true && findmentiondiscid != undefined) {
    indexmentiondiscid = UserlistDBobj.userlist.findIndex(did => did.discid == mention.id);
    anilistid = await UserlistDBobj.userlist[indexmentiondiscid].anilistid;
    test = 3;
    listindex = 0;
    variables = {
      userId: anilistid,
      type: "MANGA",
      MediaListStatus: "PLANNING"
    };
  } else if (mentioncheck == false && args[0] == undefined) {
    anilistuserindex = UserlistDBobj.userlist.findIndex(did => did.discid == user.id);
    anilistid = await UserlistDBobj.userlist[anilistuserindex].anilistid;
    test = 4;
    listindex = 0;
    variables = {
      userId: anilistid,
      type: "MANGA",
      MediaListStatus: "PLANNING"
    };
  }

  await p2w;

  let databody = {
    query: p2w,
    variables: variables
  };

  await fetch("https://graphql.anilist.co", {
    method: "post",
    body: JSON.stringify(databody),
    headers: { "Content-Type": "application/json", Accept: "application/json" }
  })
    .then(fetch1 => fetch1.json())
    .then(async fetch1 => {
      if (fetch1.data.MediaListCollection == null) {
        return message.channel.send(`${user}, Looks like ${args[0]} is not a valid Anilist! Save a Anilist by using €anilist save [name]!`);
      }

      if (fetch1.data.MediaListCollection.lists.length == 0) {
        return message.channel.send(`${user}, Looks like ${args[0]} has no Mangas in there Anilist! Add some Mangas to your Plan 2 Read List an try again!`);
      }

      let i = Math.floor(Math.random() * fetch1.data.MediaListCollection.lists[listindex].entries.length) + 0;

      let nsfw = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.isAdult;

      let mangatitle;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.romaji == null) {
        mangatitle = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.english;
      } else {
        mangatitle = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.romaji;
      }

      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.romaji == null && fetch1.data.MediaListCollection.lists[listindex].entries[i].media.title.english == null) {
        mangatitle = "Unknown.";
      }

      let usercheck;
      usercheck = fetch1.data.MediaListCollection.user.name;

      let anilistmediaID;
      anilistmediaID = fetch1.data.MediaListCollection.lists[listindex].entries[i].mediaId;

      let description;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.description == null) {
        description = "No Description found.";
      } else {
        description = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.description
          .replace(/<[^>]*>/g, " ")
          .replace(/\s{2,}/g, " ")
          .trim();
      }

      let coverIMG;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.coverImage.large == null) {
        coverIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Foie_canvas%20(1).png?1541619925848";
      } else {
        coverIMG = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.coverImage.large;
      }

      let posterIMG;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.bannerImage == null) {
        posterIMG = "";
      } else {
        posterIMG = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.bannerImage;
      }

      let mangaurl;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.siteUrl == null) {
        mangaurl = "https://anilist.co";
      } else {
        mangaurl = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.siteUrl;
      }

      let chapters = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.chapterd;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.chapters == null) {
        chapters = "No Chapters in Database.";
      } else {
        chapters = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.chapters;
      }

      let volumes;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.volumes == null) {
        volumes = "No Volumes in Database.";
      } else {
        volumes = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.volumes;
      }

      let format;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.format == null) {
        format = "Unknown.";
      } else {
        format = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.format;
      }

      let genres;
      let genre1 = [];
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.genres.length == 0) {
        genres = "No Genres found.";
      } else {
        for (let b = 0; b < fetch1.data.MediaListCollection.lists[listindex].entries[i].media.genres.length; ++b) {
          genre1.push(fetch1.data.MediaListCollection.lists[listindex].entries[i].media.genres[b]);
        }
      }

      if (genre1.length == 0) {
        genres = "No Genres found.";
      } else {
        genres = genre1.join(", ");
      }

      let status;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.status == null) {
        status = "No Status found.";
      } else {
        status = bot.caps(fetch1.data.MediaListCollection.lists[listindex].entries[i].media.status);
      }

      let start;
      let end;

      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.day == null || fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.month == null || fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.year == null) {
        start = "No Start or End date in Database.";
        airings.push(start);
      } else {
        start = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.day + "." + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.month + "." + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.startDate.year;
      }

      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.day == null || fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.month == null || fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.year == null) {
        end = "";
      } else {
        end = "to " + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.day + "." + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.month + "." + fetch1.data.MediaListCollection.lists[listindex].entries[i].media.endDate.year;
      }

      let avgRating;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.averageScore === null) {
        avgRating = "No Rating in Database.";
      } else {
        avgRating = fetch1.data.MediaListCollection.lists[listindex].entries[i].media.averageScore + "%";
      }

      let sourcefilter;
      if (fetch1.data.MediaListCollection.lists[listindex].entries[i].media.source == null || fetch1.data.MediaListCollection.lists[listindex].entries[i].media.source == undefined) {
        sourcefilter = "No Source in Database.";
      } else {
        sourcefilter = bot.caps(fetch1.data.MediaListCollection.lists[listindex].entries[i].media.source.split("_"));
      }

      const dominantColor = await getColorFromURL(coverIMG);
      color = rgbHex(`${dominantColor}`);

      let embed;

      if (status == "Finished") {
        embed = new Discord.RichEmbed()
          .setTitle(mangatitle)
          .setColor(color)
          .setDescription(description)
          .setFooter("Anilistname:" + " " + usercheck + " " + "|" + " " + "Manganame:" + " " + mangatitle + " " + "|" + " " + "AnilistID:" + " " + anilistmediaID)
          .setImage(posterIMG)
          .setThumbnail(coverIMG)
          .setTimestamp()
          .setURL(mangaurl)
          .addField("Type:", `${bot.caps(format.split("_"))}`)
          .addField("Genres:", `${genres}`)
          .addField("Status:", `${status}`)
          .addField("Released:", `${start} ${end}`)
          .addField("Chapter:", chapters)
          .addField("Volumes:", `${volumes}`)
          .addField("Community Rating:", avgRating)
          .addField("Source:", `${sourcefilter}`);
      } else {
        embed = new Discord.RichEmbed()
          .setTitle(mangatitle)
          .setColor(color)
          .setDescription(description)
          .setFooter("Anilistname:" + " " + usercheck + " " + "|" + " " + "Manganame:" + " " + mangatitle + " " + "|" + " " + "AnilistID:" + " " + anilistmediaID)
          .setImage(posterIMG)
          .setThumbnail(coverIMG)
          .setTimestamp()
          .setURL(mangaurl)
          .addField("Type:", `${bot.caps(format.split("_"))}`)
          .addField("Genres:", `${genres}`)
          .addField("Status:", `${status}`)
          .addField("Released:", `From ${start} ${end}`)
          .addField("Community Rating:", avgRating)
          .addField("Source:", `${sourcefilter}`);
      }
      switch (test) {
        case 1:
          if (nsfw == false) {
            await message.channel.send(`${user}, ${userName}´s Random Plan 2 Read Manga is: ${mangatitle}`, { embed });
          } else {
            await message.channel.send(`${user}, ${userName}´s randomly selected Plan 2 Read Manga is NSFW! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
            await message.author.send(`${user}, ${userName}´s Random Plan 2 Read Manga is: ${mangatitle}`, { embed });
          }
          break;
        case 2:
          if (nsfw == false) {
            await message.channel.send(`${user}, ${args[0]}´s Random Plan 2 Read Manga is: ${mangatitle}`, { embed });
          } else {
            await message.channel.send(`${user}, ${args[0]}´s randomly selected Plan 2 Read Manga is NSFW! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
            await message.author.send(`${user}, ${args[0]}´s Random Plan 2 Read Manga is: ${mangatitle}`, { embed });
          }
          break;
        case 3:
          if (nsfw == false) {
            await message.channel.send(`${user}, ${mention} Random Plan 2 Read Manga is: ${mangatitle}`, { embed });
          } else {
            await message.channel.send(`${user}, ${mention} randomly selected Plan 2 Read Manga is NSFW! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
            await message.author.send(`${user}, ${mention} Random Plan 2 Read Manga is: ${mangatitle}`, { embed });
          }
          break;
        case 4:
          if (nsfw == false) {
            await message.channel.send(`${user}, Your Random Plan 2 Read Manga is: ${mangatitle}`, { embed });
          } else {
            await message.channel.send(`${user}, Your randomly selected Plan 2 Read Manga is NSFW! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
            await message.author.send(`${user}, Your Random Plan 2 Read Manga is: ${mangatitle}`, { embed });
          }
          break;
      }
    });
};

const fetch = require("node-fetch");
const query = require("../data/animequery.js");
const queryg = require("../data/genres.js");
const querypage = require("../data/pages.js");
const { getColorFromURL } = require("color-thief-node");
const rgbHex = require("rgb-hex");

module.exports = async (bot, message, args, Discord, moment) => {
  let user = message.member.user;
  let color;
  const anilistLogo = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Flogo_al.png?1543900749555";
  message.delete();

  await queryg;

  let databody = {
    query: queryg
  };

  await fetch("https://graphql.anilist.co", {
    method: "post",
    body: JSON.stringify(databody),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(fetch2 => fetch2.json())
    .then(async fetch2 => {
      var rannumb1 = [];
      var rdmgenre = [];
      while (rannumb1.length < fetch2.data.GenreCollection.length) {
        var r = Math.floor(Math.random() * fetch2.data.GenreCollection.length) + 0;
        if (rannumb1.indexOf(r) === -1) rannumb1.push(r);
      }

      for (let rdm = 0; rdm < rannumb1.length; rdm++) {
        rdmgenre.push(fetch2.data.GenreCollection[rannumb1[rdm]]);
      }

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

      await fetch("https://graphql.anilist.co", {
        method: "post",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(fetch3 => fetch3.json())
        .then(async fetch3 => {
          let rdmpage = Math.floor(Math.random() * fetch3.data.Page.pageInfo.lastPage);
          rdmnumbers.push(rdmpage);

          await query;

          let variables = {
            genre: rdmnumbers[0],
            page: rdmnumbers[1],
            perPage: 50
          };

          let databody = {
            query: query,
            variables: variables
          };

          await fetch("https://graphql.anilist.co", {
            method: "post",
            body: JSON.stringify(databody),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          })
            .then(fetch1 => fetch1.json())
            .then(async fetch1 => {
              let i = Math.floor(Math.random() * 49) + 1;

              let nsfw = fetch1.data.Page.media[i].isAdult;

              let animetitle;
              if (fetch1.data.Page.media[i].title.romaji == null) {
                animetitle = fetch1.data.Page.media[i].title.english;
              } else {
                animetitle = fetch1.data.Page.media[i].title.romaji;
              }

              if (fetch1.data.Page.media[i].title.romaji == null && fetch1.data.Page.media[i].title.english == null) {
                animetitle = "Unknown.";
              }

              let description;
              if (fetch1.data.Page.media[i].description == null) {
                description = "No Description found.";
              } else {
                description = fetch1.data.Page.media[i].description
                  .replace(/<[^>]*>/g, " ")
                  .replace(/\s{2,}/g, " ")
                  .trim();
              }

              let coverIMG;
              if (fetch1.data.Page.media[i].coverImage.large == null) {
                coverIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Foie_canvas%20(1).png?1541619925848";
              } else {
                coverIMG = fetch1.data.Page.media[i].coverImage.large;
              }

              let posterIMG;
              if (fetch1.data.Page.media[i].bannerImage == null) {
                posterIMG = "";
              } else {
                posterIMG = fetch1.data.Page.media[i].bannerImage;
              }

              let animeurl;
              if (fetch1.data.Page.media[i].siteUrl == null) {
                animeurl = "https://anilist.co";
              } else {
                animeurl = fetch1.data.Page.media[i].siteUrl;
              }

              let video;
              if (fetch1.data.Page.media[i].trailer == null) {
                video = "No Video found.";
              } else {
                video = `[Click Me](https://www.youtube.com/watch?v=` + `${fetch1.data.Page.media[i].trailer.id})`;
              }

              let format;
              if (fetch1.data.Page.media[i].format == null) {
                format = "Unknown.";
              } else {
                format = fetch1.data.Page.media[i].format;
              }

              let genres;
              let genre1 = [];
              if (fetch1.data.Page.media[i].genres.length == 0) {
                genres = "No Genres found.";
              } else {
                for (let b = 0; b < fetch1.data.Page.media[i].genres.length; ++b) {
                  genre1.push(fetch1.data.Page.media[i].genres[b]);
                }
              }

              if (genre1.length == 0) {
                genres = "No Genres found.";
              } else {
                genres = genre1.join(", ");
              }

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
                  }
                }
              }

              if (chardata.length == 0) {
                mainchar = "No Characters found.";
              } else {
                mainchar = chardata.join(", ");
              }

              let status;
              if (fetch1.data.Page.media[i].status == null) {
                status = "No Status found.";
              } else {
                status = bot.caps(fetch1.data.Page.media[i].status);
              }

              let season;
              let start;
              let end;
              let airings = [];
              if (fetch1.data.Page.media[i].season == null) {
                season = "";
              } else {
                season = bot.caps(fetch1.data.Page.media[i].season);
              }

              if (fetch1.data.Page.media[i].startDate.day == null || fetch1.data.Page.media[i].startDate.month == null || fetch1.data.Page.media[i].startDate.year == null) {
                start = "No Start or End date in Database.";
                airings.push(start);
              } else {
                start = fetch1.data.Page.media[i].startDate.day + "." + fetch1.data.Page.media[i].startDate.month + "." + fetch1.data.Page.media[i].startDate.year;
              }

              if (fetch1.data.Page.media[i].endDate.day == null || fetch1.data.Page.media[i].endDate.month == null || fetch1.data.Page.media[i].endDate.year == null) {
                end = "";
              } else {
                end = "to " + fetch1.data.Page.media[i].endDate.day + "." + fetch1.data.Page.media[i].endDate.month + "." + fetch1.data.Page.media[i].endDate.year;
              }

              airings.push(season + " " + start + " " + end);

              let nextepi;
              if (fetch1.data.Page.media[i].nextAiringEpisode == null) {
                nextepi = "No new Episodes to Air.";
              } else {
                let dateairing;
                dateairing = new Date(fetch1.data.Page.media[i].nextAiringEpisode.airingAt * 1000);
                dateairing = dateairing.toUTCString();
                dateairing = `${moment(dateairing).format("DD.MM.YYYY")}` + " at " + `${moment(dateairing).format("hh:mm a")}`;
                nextepi = "Episode " + fetch1.data.Page.media[i].nextAiringEpisode.episode + ", Airing on: " + dateairing;
              }

              let episodes = fetch1.data.Page.media[i].episodes;
              if (fetch1.data.Page.media[i].episodes == null) {
                episodes = "No Episodes in the Database.";
              } else {
                episodes = fetch1.data.Page.media[i].episodes;
              }

              let episodemin;
              let episodemins;
              if (fetch1.data.Page.media[i].duration == null) {
                episodemin = "No Duration in Database.";
              } else {
                episodemin = fetch1.data.Page.media[i].duration + " minutes";
                episodemins = fetch1.data.Page.media[i].duration;
              }

              let time;

              function timeConvert(n) {
                if (isNaN(n) || n == null) {
                  return (time = "Can't Calculate time without Episodes or Episode Length.");
                }

                let hours = Math.floor(n / 60);
                let minutes = Math.floor((n / 60 - hours) * 60);

                if (hours === 0) {
                  time = minutes + " minute(s)";
                } else if (minutes === 0) {
                  time = hours + " hour(s)";
                } else {
                  time = hours + " hour(s) and " + minutes + " minute(s)";
                }
              }

              let runtime;
              if (episodes === null || episodemin === null) {
                runtime = "Can't Calculate Runtime without Episodes or Episode length.";
              } else {
                runtime = episodes * episodemins;
                timeConvert(runtime);
              }

              let avgRating;
              if (fetch1.data.Page.media[i].averageScore === null) {
                avgRating = "No Rating in Database.";
              } else {
                avgRating = fetch1.data.Page.media[i].averageScore + "%";
              }

              let sourcefilter;
              if (fetch1.data.Page.media[i].source == null || fetch1.data.Page.media[i].source == undefined) {
                sourcefilter = "No Source in Database.";
              } else {
                sourcefilter = bot.caps(fetch1.data.Page.media[i].source.split("_"));
              }

              let studios;
              let studiosdata = [];
              if (fetch1.data.Page.media[i].studios.nodes.length == 0) {
                studios = "No Studios in the Database.";
              } else {
                for (let s = 0; s < fetch1.data.Page.media[i].studios.nodes.length; ++s) {
                  studiosdata.push(fetch1.data.Page.media[i].studios.nodes[s].name);
                }
              }

              if (studiosdata.length == 0) {
                studios = "No Studios in the Database.";
              } else {
                studios = studiosdata.join(", ");
              }

              let staff;
              let staffdata = [];
              if (fetch1.data.Page.media[i].staff.edges.length == 0) {
                staff = "No Staff in Database.";
              } else {
                let staffdatas = fetch1.data.Page.media[i].staff.edges;
                for (let m = 0; m < staffdatas.length; ++m) {
                  if (staffdatas[m].role == "Original Creator") {
                    if (staffdatas[m].node.name.last == null) {
                      staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                    } else {
                      staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + " " + staffdatas[m].node.name.last + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                    }
                  }

                  if (staffdatas[m].role == "Director") {
                    if (staffdatas[m].node.name.last == null) {
                      staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                    } else {
                      staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + " " + staffdatas[m].node.name.last + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                    }
                  }

                  if (staffdatas[m].role == "Music") {
                    if (staffdatas[m].node.name.last == null) {
                      staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                    } else {
                      staffdata.push(staffdatas[m].role + ": " + "[" + staffdatas[m].node.name.first + " " + staffdatas[m].node.name.last + "]" + "(" + staffdatas[m].node.siteUrl + ")");
                    }
                  }
                }
              }

              if (staffdata.length == 0) {
                staff = "No Staff in Database.";
              } else {
                staff = staffdata.join("\n");
              }

              const dominantColor = await getColorFromURL(coverIMG);
              color = rgbHex(`${dominantColor}`);

              const embed = new Discord.RichEmbed()
                .setAuthor("Random Anime from Genre:" + " " + rdmnumbers[0], anilistLogo)
                .setTitle(animetitle)
                .setColor(color)
                .setDescription(description)
                .setFooter(animetitle, anilistLogo)
                .setImage(posterIMG)
                .setThumbnail(coverIMG)
                .setTimestamp()
                .setURL(animeurl)
                .addField("Preview Trailer:", `${video}`)
                .addField("Type:", `${bot.caps(format.split("_"))}`)
                .addField("Genres:", `${genres}`)
                .addField("Main Characters:", `${mainchar}`)
                .addField("Status:", `${status}`)
                .addField("Aired:", `From ${season} ${start} ${end}`)
                .addField("Next Episode:", `${nextepi}`)
                .addField("Episodes:", episodes)
                .addField("Episode Length:", `${episodemin}`)
                .addField("Estimated Total Runtime:", `${time}`)
                .addField("Community Rating:", avgRating)
                .addField("Source:", `${sourcefilter}`)
                .addField("Studios:", `${studios}`)
                .addField("Staff:", `${staff}`);

              if (nsfw == false) {
                await message.channel.send(`${user}, Your Random Anime is: ${animetitle}`, { embed });
              } else {
                await message.channel.send(`${user}, Your randomly selected Anime is NSFW! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
                await message.author.send(`${user}, Your Random Anime is: ${animetitle}`, { embed });
              }
            });
        });
    });
};

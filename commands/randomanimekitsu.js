const fetch = require("node-fetch");
const { getColorFromURL } = require("color-thief-node");
const rgbHex = require("rgb-hex");

module.exports = async (bot, message, args, Discord, moment) => {
  let user = message.member.user;
  let i;
  let color;
  let randomfilter1;
  const kitsuLogo = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Ffavicon-32x32-3e0ecb6fc5a6ae681e65dcbc2bdf1f17.png?1555855889085";
  message.delete();

  await fetch("https://kitsu.io/api/edge/anime", {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  })
    .then(random1 => random1.json())
    .then(async random1 => {
      let randomfilter = random1.meta.count - 10;
      randomfilter1 = Math.floor(Math.random() * randomfilter);
    });

  await fetch("https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=" + randomfilter1, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  })
    .then(fetch1 => fetch1.json())
    .then(async fetch1 => {

      i = Math.floor(Math.random() * fetch1.data.length);

      let nsfw = fetch1.data[i].attributes.nsfw;
      let animetitle;
      if (fetch1.data[i].attributes.titles.en_us == null) {
        animetitle = fetch1.data[i].attributes.titles.en_jp;
      } else {
        animetitle = fetch1.data[i].attributes.titles.en_jp;
      }

      if (fetch1.data[i].attributes.titles.en_jp == null && fetch1.data[i].attributes.titles.en_us == null) {
        animetitle = fetch1.data[i].attributes.canonicalTitle;
      }

      let description;
      if (fetch1.data[i].attributes.synopsis == null) {
        description = "No Description found.";
      } else {
        description = fetch1.data[i].attributes.synopsis
          .replace(/<[^>]*>/g, " ")
          .replace(/\s{2,}/g, " ")
          .trim();
      }

      let coverIMG;
      if (fetch1.data[i].attributes.coverImage == null) {
        coverIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2FFF4D00-0.png?1555948245437";
      } else if (fetch1.data[i].attributes.coverImage.original != null) {
        coverIMG = fetch1.data[i].attributes.coverImage.original;
      } else if (fetch1.data[i].attributes.coverImage.large != null) {
        coverIMG = fetch1.data[i].attributes.coverImage.large;
      }

      let posterIMG;
      if (fetch1.data[i].attributes.posterImage == null) {
        posterIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Foie_canvas%20(1).png?1541619925848";
      } else if (fetch1.data[i].attributes.posterImage.original != null) {
        posterIMG = fetch1.data[i].attributes.posterImage.original;
      } else if (fetch1.data[i].attributes.posterImage.large != null) {
        posterIMG = fetch1.data[i].attributes.posterImage.large;
      }

      let animeid;
      if (fetch1.data[i].id == null) {
        animeid = "";
      } else {
        animeid = fetch1.data[i].id;
      }

      let animeurl;
      if (fetch1.data[i].id == null) {
        animeurl = "https://kitsu.io";
      } else {
        animeurl = "https://kitsu.io/anime/" + animeid;
      }

      let video;
      if (fetch1.data[i].attributes.youtubeVideoId == null || fetch1.data[i].attributes.youtubeVideoId == "" || fetch1.data[i].attributes.youtubeVideoId == " ") {
        video = "No Video found.";
      } else {
        video = `[Click Me](https://www.youtube.com/watch?v=` + `${fetch1.data[i].attributes.youtubeVideoId})`;
      }

      let format;
      if (fetch1.data[i].type == null) {
        format = "Unknown.";
      } else {
        format = fetch1.data[i].type;
      }

      await fetch(fetch1.data[i].relationships.genres.links.related, {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json"
        }
      })
        .then(fetch2 => fetch2.json())
        .then(async fetch2 => {
          let genres;
          let genre1 = [];
          if (fetch2.data.length == 0) {
            genres = "No Genres found.";
          } else {
            for (let b = 0; b < fetch2.data.length; ++b) {
              genre1.push(fetch2.data[b].attributes.name);
            }
          }

          if (genre1.length == 0) {
            genres = "No Genres found.";
          } else {
            genres = genre1.join(", ");
          }

          await fetch(fetch1.data[i].relationships.categories.links.related, {
            method: "GET",
            headers: {
              "Content-Type": "application/vnd.api+json",
              Accept: "application/vnd.api+json"
            }
          })
            .then(fetch3 => fetch3.json())
            .then(async fetch3 => {
              let tags;
              let tags1 = [];
              if (fetch3.data.length == 0) {
                tags = "No Tags found.";
              } else {
                for (let c = 0; c < fetch3.data.length; ++c) {
                  tags1.push(fetch3.data[c].attributes.title);
                }
              }

              if (tags1.length == 0) {
                tags = "No Tags found.";
              } else {
                tags = tags1.join(", ");
              }

              await fetch(fetch1.data[i].relationships.mediaRelationships.links.related, {
                method: "GET",
                headers: {
                  "Content-Type": "application/vnd.api+json",
                  Accept: "application/vnd.api+json"
                }
              })
                .then(fetch4 => fetch4.json())
                .then(async fetch4 => {
                  let relations = [];
                  let relations1 = [];
                  let relations1links = [];
                  if (fetch4.data.length == 0) {
                    let relation = "No Relations found in Database.";
                  } else {
                    for (let d = 0; d < fetch4.data.length; ++d) {
                      relations1.push(fetch4.data[d].attributes.role);
                      relations1links.push(fetch4.data[d].relationships.destination.links.self);
                    }
                  }

                  let relations2 = [];
                  let relations2ids = [];

                  for (let e = 0; e < relations1links.length; ++e) {
                    await fetch(relations1links[e], {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/vnd.api+json",
                        Accept: "application/vnd.api+json"
                      }
                    })
                      .then(relation1 => relation1.json())
                      .then(async relation1 => {
                        relations2.push(relation1.data.type);
                        relations2ids.push(relation1.data.id);
                      });
                  }

                  if (relations2ids.length == 0) {
                    relations = "No Relations found.";
                  } else {
                    for (let f = 0; f < relations1.length; ++f) {
                      if (relations2[f] == "manga" && "novel") {
                        relations.push(`[${bot.caps(relations2[f])} ${bot.caps(relations1[f])}](https://kitsu.io/manga/` + `${relations2ids[f]})`);
                      } else {
                        relations.push(`[${bot.caps(relations2[f])} ${bot.caps(relations1[f])}](https://kitsu.io/anime/` + `${relations2ids[f]})`);
                      }
                    }
                  }

                  let relationsfinal = relations;
                  let status;
                  if (fetch1.data[i].attributes.status == null) {
                    status = "No Status found.";
                  } else {
                    status = bot.caps(fetch1.data[i].attributes.status);
                  }

                  let start;
                  let end;
                  let airings = [];

                  if (fetch1.data[i].attributes.startDate == null) {
                    start = "No Start or End date in Database.";
                    airings.push(start);
                  } else {
                    let startDate = new Date(fetch1.data[i].attributes.startDate).getTime();
                    start = `From ${moment(startDate).format("DD.MM.YYYY")}`;
                    airings.push(start);
                  }

                  if (fetch1.data[i].attributes.endDate == null) {
                    end = "";
                    airings.push(end);
                  } else {
                    let endDate = new Date(fetch1.data[i].attributes.endDate).getTime();
                    end = "to " + `${moment(endDate).format("DD.MM.YYYY")}`;
                    airings.push(end);
                  }

                  let ratings = [];
                  let ageRating;
                  let ageRatingGuide;
                  if (fetch1.data[i].attributes.ageRating == null || fetch1.data[i].attributes.ageRating.length == 0) {
                    ageRating = "0";
                  } else {
                    ratings.push(fetch1.data[i].attributes.ageRating);
                  }

                  if (fetch1.data[i].attributes.ageRatingGuide == null || fetch1.data[i].attributes.ageRatingGuide == "") {
                    ageRatingGuide = "0";
                  } else {
                    ratings.push(fetch1.data[i].attributes.ageRatingGuide);
                  }

                  if (ageRating == "0" && ageRatingGuide == "0") {
                    ageRating = "No Age Rating found in Database.";
                  } else if (ageRatingGuide == "0") {
                    ageRating = ratings[0];
                  } else if (ageRating == "0") {
                    ageRating = ratings[1];
                  } else {
                    ageRating = ratings.join(" - ");
                  }

                  let episodes = fetch1.data[i].attributes.episodeCount;
                  if (fetch1.data[i].attributes.episodeCount == null) {
                    episodes = "No Episodes in the Database.";
                  } else {
                    episodes = fetch1.data[i].attributes.episodeCount;
                  }

                  let episodemin;
                  let episodemins;
                  if (fetch1.data[i].attributes.episodeLength == null) {
                    episodemin = "No Duration in Database.";
                  } else {
                    episodemin = fetch1.data[i].attributes.episodeLength + " minutes";
                    episodemins = fetch1.data[i].attributes.episodeLength;
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
                  if (fetch1.data[i].attributes.averageRating === null) {
                    avgRating = "No Rating in Database.";
                  } else {
                    avgRating = fetch1.data[i].attributes.averageRating + "%";
                  }

                  let popularityrank;
                  if (fetch1.data[i].attributes.popularityRank === null) {
                    popularityrank = "No Rating in Database.";
                  } else {
                    popularityrank = `❤️ Rank#${fetch1.data[i].attributes.popularityRank} (Most Popular Anime)`;
                  }

                  let highrated;
                  if (fetch1.data[i].attributes.ratingRank === null) {
                    highrated = "No Rating in Database.";
                  } else {
                    highrated = `⭐ Rank#${fetch1.data[i].attributes.ratingRank} (Highest Rated Anime)`;
                  }

                  const dominantColor = await getColorFromURL(posterIMG);
                  color = rgbHex(`${dominantColor}`);

                  const embed = new Discord.RichEmbed()
                    .setTitle(animetitle)
                    .setColor(color)
                    .setDescription(description)
                    .setFooter("Animetitle:" + " " + animetitle + " " + "|" + " " + "AnimeID:" + " " + animeid, kitsuLogo)
                    .setImage(coverIMG)
                    .setThumbnail(posterIMG)
                    .setTimestamp()
                    .setURL(animeurl)
                    .addField("Preview Trailer:", `${video}`)
                    .addField("Type:", `${bot.caps(format.split("_"))}`)
                    .addField("Rating:", `${ageRating}`)
                    .addField("Popularity Rating:", popularityrank)
                    .addField("Highest Rating:", highrated)
                    .addField("Genres:", `${genres}`)
                    .addField("Tags:", `${tags}`)
                    //.addField("Main Characters:", `${mainchar}`)
                    .addField("Status:", `${status}`)
                    .addField("Aired:", airings.join())
                    //.addField("Next Episode:", `${nextepi}`)
                    .addField("Episodes:", episodes)
                    .addField("Episode Length:", `${episodemin}`)
                    .addField("Estimated Total Runtime:", `${time}`)
                    .addField("Community Rating:", avgRating)
                    .addField("Relations:", relationsfinal);
                  //.addField("Source:", `${sourcefilter}`)
                  //.addField("Studios:", `${studios}`)
                  //.addField("Staff:", `${staff}`);

                  if (nsfw == false) {
                    await message.channel.send(`${user}, Your Random Anime is: ${animetitle}`, { embed });
                  } else {
                    await message.channel.send(`${user}, Your randomly selected Anime is NSFW! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
                    await message.author.send(`${user}, Your Random Anime is: ${animetitle}`, { embed });
                  }
                });
            });
        });
    });
};

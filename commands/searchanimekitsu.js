const fetch = require("node-fetch");
const { getColorFromURL } = require("color-thief-node");
const rgbHex = require("rgb-hex");

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
  let animename = args.join(" ");
  let user = message.member.user;
  let i;
  let color;
  let uid = message.author.id;
  const kitsuLogo = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Ffavicon-32x32-3e0ecb6fc5a6ae681e65dcbc2bdf1f17.png?1555855889085";
  message.delete();

  if (args.length == 0) {
    return message.channel.send(`${user}, I need a Title to search for! (Usage: €anime Title)`);
  }

  await fetch("https://kitsu.io/api/edge/anime?filter%5Btext%5D=" + animename, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  })
    .then(fetch1 => fetch1.json())
    .then(async fetch1 => {
      let field1 = [];
      let NSFW = [];
      for (let a = 0; a < fetch1.data.length; a++) {
        if (fetch1.data[a].attributes.nsfw == true) {
          NSFW.push("🔞" + "NSFW" + "🔞");
        } else {
          NSFW.push("");
        }

        field1.push({
          name: `${fetch1.data[a].attributes.titles.en_jp} (${bot.caps(fetch1.data[a].attributes.showType.split("_"))}) ${NSFW[a]}`,
          value: `Reaction: ${emoji[a + 1]}`
        });
      }

      if (field1.length == 0) {
        return message.channel.send(`${user}, Couldn't find a matching Anime for '**${animename}**'`);
      }

      if (fetch1.data.length >= 10) {
        fetch1.data.length = 7;
      }

      let embed;
      switch (fetch1.data.length) {
        case 1:
          embed = {
            color: 65280,
            author: {
              name: `Results for "${animename}"`
            },
            footer: {
              text: `Please choose by using the Reactions below!`
            },
            fields: [
              field1[0],
              {
                name: "None of the above (Abort Command)",
                value: `Reaction: ${emoji[0]}`
              }
            ]
          };
          break;
        case 2:
          embed = {
            color: 65280,
            author: {
              name: `Results for "${animename}"`
            },
            footer: {
              text: `Please choose by using the Reactions below!`
            },
            fields: [
              field1[0],
              field1[1],
              {
                name: "None of the above (Abort Command)",
                value: `Reaction: ${emoji[0]}`
              }
            ]
          };
          break;
        case 3:
          embed = {
            color: 65280,
            author: {
              name: `Results for "${animename}"`
            },
            footer: {
              text: `Please choose by using the Reactions below!`
            },
            fields: [
              field1[0],
              field1[1],
              field1[2],
              {
                name: "None of the above (Abort Command)",
                value: `Reaction: ${emoji[0]}`
              }
            ]
          };
          break;
        case 4:
          embed = {
            color: 65280,
            author: {
              name: `Results for "${animename}"`
            },
            footer: {
              text: `Please choose by using the Reactions below!`
            },
            fields: [
              field1[0],
              field1[1],
              field1[2],
              field1[3],
              {
                name: "None of the above (Abort Command)",
                value: `Reaction: ${emoji[0]}`
              }
            ]
          };
          break;
        case 5:
          embed = {
            color: 65280,
            author: {
              name: `Results for "${animename}"`
            },
            footer: {
              text: `Please choose by using the Reactions below!`
            },
            fields: [
              field1[0],
              field1[1],
              field1[2],
              field1[3],
              field1[4],
              {
                name: "None of the above (Abort Command)",
                value: `Reaction: ${emoji[0]}`
              }
            ]
          };
          break;
        case 6:
          embed = {
            color: 65280,
            author: {
              name: `Results for "${animename}"`
            },
            footer: {
              text: `Please choose by using the Reactions below!`
            },
            fields: [
              field1[0],
              field1[1],
              field1[2],
              field1[3],
              field1[4],
              field1[5],
              {
                name: "None of the above (Abort Command)",
                value: `Reaction: ${emoji[0]}`
              }
            ]
          };
          break;
        case 7:
          embed = {
            color: 65280,
            author: {
              name: `Results for "${animename}"`
            },
            footer: {
              text: `Please choose by using the Reactions below!`
            },
            fields: [
              field1[0],
              field1[1],
              field1[2],
              field1[3],
              field1[4],
              field1[5],
              field1[6],
              {
                name: "None of the above (Abort Command)",
                value: `Reaction: ${emoji[0]}`
              }
            ]
          };
          break;
      }

      let em1;
      switch (fetch1.data.length) {
        case 0:
          em1 = await message.channel.send(`${user}, Couldn't find any Results for "${args.join(" ")}"!`);
          return;
        case 1:
          em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
          await em1.react(emoji[1]);
          await em1.react(emoji[0]);
          break;
        case 2:
          em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
          await em1.react(emoji[1]);
          await em1.react(emoji[2]);
          await em1.react(emoji[0]);
          break;
        case 3:
          em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
          await em1.react(emoji[1]);
          await em1.react(emoji[2]);
          await em1.react(emoji[3]);
          await em1.react(emoji[0]);
          break;
        case 4:
          em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
          await em1.react(emoji[1]);
          await em1.react(emoji[2]);
          await em1.react(emoji[3]);
          await em1.react(emoji[4]);
          await em1.react(emoji[0]);
          break;
        case 5:
          em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
          await em1.react(emoji[1]);
          await em1.react(emoji[2]);
          await em1.react(emoji[3]);
          await em1.react(emoji[4]);
          await em1.react(emoji[5]);
          await em1.react(emoji[0]);
          break;
        case 6:
          em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
          await em1.react(emoji[1]);
          await em1.react(emoji[2]);
          await em1.react(emoji[3]);
          await em1.react(emoji[4]);
          await em1.react(emoji[5]);
          await em1.react(emoji[6]);
          await em1.react(emoji[0]);
          break;
        case 7:
          em1 = await message.channel.send(`${user} is choosing a Anime.`, { embed });
          await em1.react(emoji[1]);
          await em1.react(emoji[2]);
          await em1.react(emoji[3]);
          await em1.react(emoji[4]);
          await em1.react(emoji[5]);
          await em1.react(emoji[6]);
          await em1.react(emoji[7]);
          await em1.react(emoji[0]);
          break;
      }

      const filter = (reaction, user) => {
        return emoji.includes(reaction.emoji.name) === true && user.id === uid;
      };

      const collector = await em1.createReactionCollector(filter, {
        max: 1,
        time: 15000
      });

      collector.on("collect", async (reaction, reactionCollector) => {
        let chosen = reaction.emoji.name;

        switch (chosen) {
          case emoji[0]:
            return em1.delete(), message.channel.send(`${user} aborted the command.`);
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
        }

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
        if (fetch1.data[i].attributes.coverImage.original == null) {
          coverIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Foie_canvas%20(1).png?1541619925848";
        } else {
          coverIMG = fetch1.data[i].attributes.coverImage.original;
        }

        let posterIMG;
        if (fetch1.data[i].attributes.posterImage.original == null) {
          posterIMG = "";
        } else {
          posterIMG = fetch1.data[i].attributes.posterImage.original;
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
        if (fetch1.data[i].attributes.youtubeVideoId == null) {
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
                      relation = "No Relations found in Database.";
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

    /*let mainchar;
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
    }*/

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
                      startDate = new Date(fetch1.data[i].attributes.startDate).getTime();
                      start = `${moment(startDate).format("DD.MM.YYYY")}`;
                    }

                    if (fetch1.data[i].attributes.endDate == null) {
                      end = "";
                    } else {
                      endDate = new Date(fetch1.data[i].attributes.endDate).getTime();
                      end = "to " + `${moment(endDate).format("DD.MM.YYYY")}`;
                    }

                    let ratings = [];
                    let ageRating;
                    if (fetch1.data[i].attributes.ageRating == null) {
                      ageRating = "";
                    } else {
                      ratings.push(fetch1.data[i].attributes.ageRating);
                    }

                    if (fetch1.data[i].attributes.ageRatingGuide == null) {
                      ageRatingGuide = "";
                    } else {
                      ratings.push(fetch1.data[i].attributes.ageRatingGuide);
                    }

                    ageRating = ratings.join(" - ");

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
                      popularityrank = fetch1.data[i].attributes.popularityRank;
                    }

                    let highrated;
                    if (fetch1.data[i].attributes.ratingRank === null) {
                      highrated = "No Rating in Database.";
                    } else {
                      highrated = fetch1.data[i].attributes.ratingRank;
                    }

    /*let studios;
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
    }*/

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
                      .addField("Popularity Rating:", `❤️ Rank#${popularityrank} (Most Popular Anime)`)
                      .addField("Highest Rating:", `⭐ Rank#${highrated} (Highest Rated Anime)`)
                      .addField("Genres:", `${genres}`)
                      .addField("Tags:", `${tags}`)
                      //.addField("Main Characters:", `${mainchar}`)
                      .addField("Status:", `${status}`)
                      .addField("Aired:", `From ${start} ${end}`)
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
                      await em1.edit(`${user}, here is the result for ${animetitle}`, { embed });
                    } else {
                      await em1.delete();
                      await message.channel.send(`${user}, You've selected a NSFW Anime! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
                      await message.author.send(`${user}, Here is the result for ${animetitle}`, { embed });
                    }
                  });

                collector.on("end", collected => {
                  if (collected.size == 0) {
                    em1.delete();
                    message.channel.send(`${user}, You didn't react fast enough, try again!`);
                  }
                });
              });
          });
      });
    });
};

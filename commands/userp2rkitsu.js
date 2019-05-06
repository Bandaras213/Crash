const fetch = require("node-fetch");
const fs = require("fs");
const { getColorFromURL } = require("color-thief-node");
const rgbHex = require("rgb-hex");

module.exports = async (bot, message, args, Discord, moment) => {
  let user = message.member.user;
  let color;
  let randomfilter1;
  let UserlistDB = "data/userlists.json";
  let UserlistDBobj = JSON.parse(fs.readFileSync(UserlistDB, "utf8"));
  let kitsuid;
  let kitsuname = UserlistDBobj.userlist.find(did => did.kitsuusername == args[0]);
  let findmentiondiscid;
  let finduserdiscid = UserlistDBobj.userlist.find(did => did.discid == user.id);
  let kitsuuserindex;
  let indexmentiondiscid;
  let test;
  let mentioncheck = false;
  let mention = message.mentions.users.first();
  let mentioncheckid;
  if (mention) {
    findmentiondiscid = UserlistDBobj.userlist.find(did => did.discid == mention.id);
    kitsuuserindex = UserlistDBobj.userlist.findIndex(did => did.discid == mention.id);
    mentioncheckid = await UserlistDBobj.userlist[kitsuuserindex].kitsuid;
    mentioncheck = true;
  }
  const kitsuLogo = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Ffavicon-32x32-3e0ecb6fc5a6ae681e65dcbc2bdf1f17.png?1555855889085";
  message.delete();

  let fetchthis;
  let fetchthis1;

  if (finduserdiscid == undefined && args[0] == undefined) {
    return message.channel.send(`${user}, Looks like you don't have a Kitsulist! Save a Kitsulist by using kitsu save [name]!`);
  }

  if (mentioncheck == true && findmentiondiscid == undefined && mentioncheckid == undefined) {
    return message.channel.send(`${user}, Looks like ${mention} doesn't have a Kitsulist!`);
  }

  if (mentioncheck == true && mentioncheckid == undefined) {
    return message.channel.send(`${user}, Looks like ${mention} doesn't have a Kitsulist!`);
  }

  if (kitsuname == undefined && mentioncheck == false && args[0] != undefined) {
    test = 1;
    fetchthis = args[0];
    fetchthis1 = "https://kitsu.io/api/edge/users?filter%5Bname%5D=";
  } else if (kitsuname != undefined && mentioncheck == false && args[0] != undefined) {
    kitsuuserindex = UserlistDBobj.userlist.findIndex(did => did.kitsuusername == args[0]);
    kitsuid = await UserlistDBobj.userlist[kitsuuserindex].kitsuid;
    test = 2;
    fetchthis = kitsuid;
    fetchthis1 = "https://kitsu.io/api/edge/users/";
  } else if (mentioncheck == true && findmentiondiscid != undefined) {
    indexmentiondiscid = UserlistDBobj.userlist.findIndex(did => did.discid == mention.id);
    kitsuid = await UserlistDBobj.userlist[indexmentiondiscid].kitsuid;
    test = 3;
    fetchthis = kitsuid;
    fetchthis1 = "https://kitsu.io/api/edge/users/";
  } else if (mentioncheck == false && args[0] == undefined) {
    kitsuuserindex = UserlistDBobj.userlist.findIndex(did => did.discid == user.id);
    kitsuid = await UserlistDBobj.userlist[kitsuuserindex].kitsuid;
    test = 4;
    fetchthis = kitsuid;
    fetchthis1 = "https://kitsu.io/api/edge/users/";
  }

  let plannedmangalist;
  let nouserfound;

  await fetch(fetchthis1 + fetchthis, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  })
    .then(getlist1 => getlist1.json())
    .then(async getlist1 => {
      if (getlist1.meta.count == 0) {
        nouserfound = true;
      } else {
        await fetch(fetchthis1 + fetchthis, {
          method: "GET",
          headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json"
          }
        })
          .then(getlist2 => getlist2.json())
          .then(async getlist2 => {
            if (test == 1) {
              plannedmangalist = getlist2.data[0].relationships.libraryEntries.links.related + "?filter[kind]=manga&filter[status]=planned";
            } else {
              plannedmangalist = getlist2.data.relationships.libraryEntries.links.related + "?filter[kind]=manga&filter[status]=planned";
            }
          });
      }
    });

  if (nouserfound == true) {
    return message.channel.send(`${user}, Looks like ${args[0]} dosn't have a Kitsulist! Or the Kitsulist coudnt be found!`);
  }

  let p2ridlink;
  let randomfilter;

  await fetch(plannedmangalist, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  })
    .then(random1 => random1.json())
    .then(async random1 => {
      randomfilter = random1.meta.count;
      randomfilter1 = Math.floor(Math.random() * randomfilter) + 0;
      if (randomfilter1 == random1.meta.count && randomfilter1 != 0) {
        randomfilter1 = randomfilter1 - 1;
      }

      p2ridlink = plannedmangalist + "&page%5Blimit%5D=1&page%5Boffset%5D=" + randomfilter1;
    });

  if (randomfilter == 0) {
    return message.channel.send(`${user}, Looks like the specified Kitsulist doesnt have a Plan 2 Read Manga!`);
  }

  await fetch(p2ridlink, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  })
    .then(random2 => random2.json())
    .then(async random2 => {
      p2ridlink = random2.data[0].relationships.manga.links.self;
    });

  let p2rid;

  await fetch(p2ridlink, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  })
    .then(idgetter => idgetter.json())
    .then(async idgetter => {
      p2rid = idgetter.data.id;
    });

  await fetch("https://kitsu.io/api/edge/manga/" + p2rid, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  })
    .then(fetch1 => fetch1.json())
    .then(async fetch1 => {
      let Mangatitle;
      if (fetch1.data.attributes.titles.en_us == null) {
        Mangatitle = fetch1.data.attributes.titles.en_jp;
      } else {
        Mangatitle = fetch1.data.attributes.titles.en_jp;
      }

      if (fetch1.data.attributes.titles.en_jp == null && fetch1.data.attributes.titles.en_us == null) {
        Mangatitle = fetch1.data.attributes.canonicalTitle;
      }

      let description;
      if (fetch1.data.attributes.synopsis == null) {
        description = "No Description found.";
      } else {
        description = fetch1.data.attributes.synopsis
          .replace(/<[^>]*>/g, " ")
          .replace(/\s{2,}/g, " ")
          .trim();
      }

      let coverIMG;
      if (fetch1.data.attributes.coverImage == null) {
        coverIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2FFF4D00-0.png?1555948245437";
      } else if (fetch1.data.attributes.coverImage.original != null) {
        coverIMG = fetch1.data.attributes.coverImage.original;
      } else if (fetch1.data.attributes.coverImage.large != null) {
        coverIMG = fetch1.data.attributes.coverImage.large;
      }

      let posterIMG;
      if (fetch1.data.attributes.posterImage == null) {
        posterIMG = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Foie_canvas%20(1).png?1541619925848";
      } else if (fetch1.data.attributes.posterImage.original != null) {
        posterIMG = fetch1.data.attributes.posterImage.original;
      } else if (fetch1.data.attributes.posterImage.large != null) {
        posterIMG = fetch1.data.attributes.posterImage.large;
      }

      let Mangaid;
      if (fetch1.data.id == null) {
        Mangaid = "";
      } else {
        Mangaid = fetch1.data.id;
      }

      let Mangaurl;
      if (fetch1.data.id == null) {
        Mangaurl = "https://kitsu.io";
      } else {
        Mangaurl = "https://kitsu.io/manga/" + Mangaid;
      }

      let format;
      if (fetch1.data.type == null) {
        format = "Unknown.";
      } else {
        format = fetch1.data.type;
      }

      await fetch(fetch1.data.relationships.genres.links.related, {
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

          await fetch(fetch1.data.relationships.categories.links.related, {
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

              await fetch(fetch1.data.relationships.mediaRelationships.links.related, {
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
                  if (fetch1.data.attributes.status == null) {
                    status = "No Status found.";
                  } else {
                    status = bot.caps(fetch1.data.attributes.status);
                  }

                  let start;
                  let end;
                  let airings = [];

                  if (fetch1.data.attributes.startDate == null) {
                    start = "No Start or End date in Database.";
                    airings.push(start);
                  } else {
                    let startDate = new Date(fetch1.data.attributes.startDate).getTime();
                    start = `From ${moment(startDate).format("DD.MM.YYYY")}`;
                    airings.push(start);
                  }

                  if (fetch1.data.attributes.endDate == null) {
                    end = "";
                    airings.push(end);
                  } else {
                    let endDate = new Date(fetch1.data.attributes.endDate).getTime();
                    end = "to " + `${moment(endDate).format("DD.MM.YYYY")}`;
                    airings.push(end);
                  }

                  let ratings = [];
                  let ageRating;
                  let ageRatingGuide;
                  if (fetch1.data.attributes.ageRating == null || fetch1.data.attributes.ageRating.length == 0) {
                    ageRating = "0";
                  } else {
                    ratings.push(fetch1.data.attributes.ageRating);
                  }

                  if (fetch1.data.attributes.ageRatingGuide == null || fetch1.data.attributes.ageRatingGuide == "") {
                    ageRatingGuide = "0";
                  } else {
                    ratings.push(fetch1.data.attributes.ageRatingGuide);
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

                  let chapters;
                  if (fetch1.data.attributes.chapterCount == null || fetch1.data.attributes.chapterCount == "0") {
                    chapters = "No Chapters in the Database.";
                  } else {
                    chapters = fetch1.data.attributes.chapterCount;
                  }

                  let volumes;
                  if (fetch1.data.attributes.volumeCount == null || fetch1.data.attributes.volumeCount == "0") {
                    volumes = "No Volumes in Database.";
                  } else {
                    volumes = fetch1.data.attributes.volumeCount;
                  }

                  let serialization;
                  if (fetch1.data.attributes.serialization == null || fetch1.data.attributes.serialization == "") {
                    serialization = "No Serialized Studio in Database.";
                  } else {
                    serialization = fetch1.data.attributes.serialization;
                  }

                  let avgRating;
                  if (fetch1.data.attributes.averageRating === null) {
                    avgRating = "No Rating in Database.";
                  } else {
                    avgRating = fetch1.data.attributes.averageRating + "%";
                  }

                  let popularityrank;
                  if (fetch1.data.attributes.popularityRank === null) {
                    popularityrank = "No Rating in Database.";
                  } else {
                    popularityrank = `❤️ Rank#${fetch1.data.attributes.popularityRank} (Most Popular Manga)`;
                  }

                  let highrated;
                  if (fetch1.data.attributes.ratingRank === null) {
                    highrated = "No Rating in Database.";
                  } else {
                    highrated = `⭐ Rank#${fetch1.data.attributes.ratingRank} (Highest Rated Manga)`;
                  }

                  const dominantColor = await getColorFromURL(posterIMG);
                  color = rgbHex(`${dominantColor}`);

                  const embed = new Discord.RichEmbed()
                    .setTitle(Mangatitle)
                    .setColor(color)
                    .setDescription(description)
                    .setFooter("Mangatitle:" + " " + Mangatitle + " " + "|" + " " + "MangaID:" + " " + Mangaid, kitsuLogo)
                    .setImage(coverIMG)
                    .setThumbnail(posterIMG)
                    .setTimestamp()
                    .setURL(Mangaurl)
                    .addField("Type:", `${bot.caps(format.split("_"))}`)
                    .addField("Rating:", `${ageRating}`)
                    .addField("Popularity Rating:", popularityrank)
                    .addField("Highest Rating:", highrated)
                    .addField("Genres:", `${genres}`)
                    .addField("Tags:", `${tags}`)
                    .addField("Status:", `${status}`)
                    .addField("Aired:", airings.join())
                    .addField("Chapters:", chapters)
                    .addField("Volumes:", volumes)
                    .addField("Serialization:", serialization)
                    .addField("Community Rating:", avgRating)
                    .addField("Relations:", relationsfinal);

                  await message.channel.send(`${user}, here is the result for ${Mangatitle}`, { embed });
                });
            });
        });
    });
};

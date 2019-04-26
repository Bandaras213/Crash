const fetch = require("node-fetch");
const { getColorFromURL } = require("color-thief-node");
const rgbHex = require("rgb-hex");

module.exports = async (bot, message, args, Discord, moment) => {
  let nameofuser = args.join(" ");
  let user = message.member.user;
  let uid = message.author.id;
  const kitsuLogo = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Ffavicon-32x32-3e0ecb6fc5a6ae681e65dcbc2bdf1f17.png?1555855889085";
  message.delete();

  if (args.length == 0) {
    return message.channel.send(`${user}, I need a Username to search for! (Usage: €user Username)`);
  }

  await fetch("https://kitsu.io/api/edge/users?filter%5Bname%5D=" + nameofuser, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    }
  })
    .then(fetch1 => fetch1.json())
    .then(async fetch1 => {
      if (fetch1.data.length == 0) {
        return message.channel.send(`${user}, Couldn't find a matching Kitsulist for '**${args.join(" ")}**'`);
      }

      let username = fetch1.data[0].attributes.name;
      let userID = fetch1.data[0].id;

      let about = fetch1.data[0].attributes.about;
      if (about == null) {
        about = `No Bio Information on ${username}'s Profile.`;
      } else {
        about = about;
      }

      let avatar;
      if (fetch1.data[0].attributes.avatar == null) {
        avatar = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2FFF4D00-0.png?1555948245437";
      } else if (fetch1.data[0].attributes.avatar.original != null) {
        avatar = fetch1.data[0].attributes.avatar.original;
      } else if (fetch1.data[0].attributes.avatar.large != null) {
        avatar = fetch1.data[0].attributes.avatar.large;
      }

      let coverImage;
      if (fetch1.data[0].attributes.coverImage == null) {
        coverImage = "https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Fdefault_cover-7bda2081d0823731a96bbb20b70f4fcf.png?1556260589303";
      } else if (fetch1.data[0].attributes.coverImage.original != null) {
        coverImage = fetch1.data[0].attributes.coverImage.original;
      } else if (fetch1.data[0].attributes.coverImage.large != null) {
        coverImage = fetch1.data[0].attributes.coverImage.large;
      }

      const dominantColor = await getColorFromURL(avatar);
      let color = rgbHex(`${dominantColor}`);

      let siteUrl = "https://kitsu.io/users/" + userID;
      let updatedAt = fetch1.data[0].attributes.updatedAt;

      let favoritlinks = [];
      let favoritanime = [];
      let favoritmanga = [];
      let favoritcharacter = [];
      await fetch(fetch1.data[0].relationships.favorites.links.related + "?sort=favRank&page[limit]=20", {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json"
        }
      })
        .then(fetch4 => fetch4.json())
        .then(async fetch4 => {
          if (fetch4.data.length == 0) {
            favoritanime = "No Favorits found in Database.";
          } else {
            for (let d = 0; d < fetch4.data.length; ++d) {
              favoritlinks.push(fetch4.data[d].relationships.item.links.related);
            }
          }
        });

      let favoritanimename = [];
      let favoritmanganame = [];
      let favoritcharactername = [];
      let favoritanimeids = [];
      let favoritmangaids = [];
      //let favoritcharacterids = [];

      for (let e = 0; e < favoritlinks.length; ++e) {
        await fetch(favoritlinks[e], {
          method: "GET",
          headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json"
          }
        })
          .then(favorits1 => favorits1.json())
          .then(async favorits1 => {
            switch (favorits1.data.type) {
              case "anime":
                if (favorits1.data.attributes.titles.en_us != null) {
                  favoritanimename.push(favorits1.data.attributes.titles.en_us);
                  favoritanimeids.push("https://kitsu.io/anime/" + favorits1.data.id);
                } else if (favorits1.data.attributes.titles.en_jp != null) {
                  favoritanimename.push(favorits1.data.attributes.titles.en_jp);
                  favoritanimeids.push("https://kitsu.io/anime/" + favorits1.data.id);
                }
                break;
              case "manga":
                if (favorits1.data.attributes.titles.en_us != null) {
                  favoritmanganame.push(favorits1.data.attributes.titles.en_us);
                  favoritmangaids.push("https://kitsu.io/manga/" + favorits1.data.id);
                } else if (favorits1.data.attributes.titles.en_jp != null) {
                  favoritmanganame.push(favorits1.data.attributes.titles.en_jp);
                  favoritmangaids.push("https://kitsu.io/manga/" + favorits1.data.id);
                }
                break;
              case "characters":
                if (favorits1.data.attributes.names.en != null) {
                  favoritcharactername.push(favorits1.data.attributes.names.en);
                  //favoritcharacterids.push("https://kitsu.io/character/" + favorits1.data.id);
                } else if (favorits1.data.attributes.canonicalName != null) {
                  favoritcharactername.push(favorits1.data.attributes.canonicalName);
                  //favoritcharacterids.push("https://kitsu.io/character/" + favorits1.data.id);
                }
                break;
            }
          });
      }

      let topresults = 5
      if (favoritanimename.length == 0) {
        favoritanime = "No Favorit Animes found.";
      } else if (favoritanime.length < topresults) {
        for (let f = 0; f < favoritanimename.length; ++f) {
          favoritanime.push(`[${favoritanimename[f]}](${favoritanimeids[f]})`);
        }
      } else if (favoritanime.length >= topresults) {
        favoritanimename.length = topresults;
        for (let f = 0; f < favoritanimename.length; ++f) {
          favoritanime.push(`[${favoritanimename[f]}](${favoritanimeids[f]})`);
        }
      }

      if (favoritmanganame.length == 0) {
        favoritmanga = "No Favorit Mangas found.";
      } else if (favoritmanganame.length < topresults) {
        for (let ff = 0; ff < favoritmanganame.length; ++ff) {
          favoritmanga.push(`[${favoritmanganame[ff]}](${favoritmangaids[ff]})`);
        }
      } else if (favoritmanga.length >= topresults) {
        favoritmanganame.length = topresults;
        for (let ff = 0; ff < favoritmanganame.length; ++ff) {
          favoritmanga.push(`[${favoritmanganame[ff]}](${favoritmangaids[ff]})`);
        }
      }

      if (favoritcharactername.length == 0) {
        favoritcharacter = "No Favorit Characters found.";
      } else if (favoritcharactername.length < topresults) {
        for (let fff = 0; fff < favoritcharactername.length; ++fff) {
          favoritcharacter.push(favoritcharactername[fff]);
        }
      } else if (favoritcharactername.length >= topresults) {
        favoritcharactername.length = topresults;
        for (let fff = 0; fff < favoritcharactername.length; ++fff) {
          favoritcharacter.push(favoritcharactername[fff]);
        }
      }

      var value = fetch1.data[0].attributes.lifeSpentOnAnime;

      var units = {
        month: 24 * 60 * 30,
        day: 24 * 60,
        hour: 24 * 6,
        //minute: 24
      };

      var lifeSpentOnAnimeresult = [];

      for (var name in units) {
        var p = Math.floor(value / units[name]);
        if (p == 1) lifeSpentOnAnimeresult.push(p + " " + name);
        if (p >= 2) lifeSpentOnAnimeresult.push(p + " " + name + "s");
        value %= units[name];
      }

      let listentriespart1 = fetch1.data[0].relationships.libraryEntries.links.related;
      let listentriesstatus = ["completed", "current", "dropped", "on_hold", "planned"];
      let listentrieskind = ["anime", "manga"];
      let listentriespart2A = "?filter[kind]=" + listentrieskind[0] + "&filter[status]=";
      let listentriespart2B = "?filter[kind]=" + listentrieskind[1] + "&filter[status]=";
      let listentriesstatsA = fetch1.data[0].relationships.stats.links.related;
      let listentriesstats = ["manga-amount-consumed", "anime-category-breakdown", "manga-category-breakdown"];
      let listentriesstatsB = "?filter%5Bkind%5D=";

      let listentries_links = {
        data: [
          {
            listentries: [
              {
                id: "0",
                link: listentriespart1 + listentriespart2A + listentriesstatus[0]
              },
              {
                id: "1",
                link: listentriespart1 + listentriespart2A + listentriesstatus[1]
              },
              {
                id: "2",
                link: listentriespart1 + listentriespart2A + listentriesstatus[2]
              },
              {
                id: "3",
                link: listentriespart1 + listentriespart2A + listentriesstatus[3]
              },
              {
                id: "4",
                link: listentriespart1 + listentriespart2A + listentriesstatus[4]
              },
              {
                id: "5",
                link: listentriespart1 + listentriespart2B + listentriesstatus[0]
              },
              {
                id: "6",
                link: listentriespart1 + listentriespart2B + listentriesstatus[1]
              },
              {
                id: "7",
                link: listentriespart1 + listentriespart2B + listentriesstatus[2]
              },
              {
                id: "8",
                link: listentriespart1 + listentriespart2B + listentriesstatus[3]
              },
              {
                id: "9",
                link: listentriespart1 + listentriespart2B + listentriesstatus[4]
              }
            ]
          },
          {
            listentries: [
              {
                id: "0",
                link: listentriesstatsA + listentriesstatsB + listentriesstats[0]
              },
              {
                id: "1",
                link: listentriesstatsA + listentriesstatsB + listentriesstats[1]
              },
              {
                id: "2",
                link: listentriesstatsA + listentriesstatsB + listentriesstats[2]
              }
            ]
          }
        ]
      };

      let listentries_anime = [];
      let listentries_manga = [];

      for (let g = 0; g < listentries_links.data[0].listentries.length; ++g) {
        await fetch(listentries_links.data[0].listentries[g].link, {
          method: "GET",
          headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json"
          }
        })
          .then(listentries1 => listentries1.json())
          .then(async listentries1 => {
            switch (listentries_links.data[0].listentries[g].id) {
              case "0":
                listentries_anime.push("Completed:" + " " + listentries1.meta.count);
                break;
              case "1":
                listentries_anime.push("Current:" + " " + listentries1.meta.count);
                break;
              case "2":
                listentries_anime.push("Dropped:" + " " + listentries1.meta.count);
                break;
              case "3":
                listentries_anime.push("On Hold:" + " " + listentries1.meta.count);
                break;
              case "4":
                listentries_anime.push("Planned:" + " " + listentries1.meta.count);
                break;
              case "5":
                listentries_manga.push("Completed:" + " " + listentries1.meta.count);
                break;
              case "6":
                listentries_manga.push("Current:" + " " + listentries1.meta.count);
                break;
              case "7":
                listentries_manga.push("Dropped:" + " " + listentries1.meta.count);
                break;
              case "8":
                listentries_manga.push("On Hold:" + " " + listentries1.meta.count);
                break;
              case "9":
                listentries_manga.push("Planned:" + " " + listentries1.meta.count);
                break;
            }
          });
      }
      let chapterread = [];
      let animecategory;
      let mangacategory;
      for (let gg = 0; gg < listentries_links.data[1].listentries.length; ++gg) {
        await fetch(listentries_links.data[1].listentries[gg].link, {
          method: "GET",
          headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json"
          }
        })
          .then(liststats1 => liststats1.json())
          .then(async liststats1 => {
            switch (listentries_links.data[1].listentries[gg].id) {
              case "0":
                chapterread.push(liststats1.data[0].attributes.statsData.units);
                break;
              case "1":
                animecategory = liststats1.data[0].attributes.statsData.categories;
                break;
              case "2":
                mangacategory = liststats1.data[0].attributes.statsData.categories;
                break;
            }
          });
      }

      let sortObject = (obj) => {
        var arr = [];
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            arr.push({
              'genre': prop,
              'amount': obj[prop]
            });
          }
        }
        arr.sort((a, b) => { return b.amount - a.amount; });
        return arr;
      }

      let animecategorysorted = sortObject(animecategory)
      let animecategorysortedfix = [];
      let mangacategorysorted = sortObject(mangacategory)
      let mangacategorysortedfix = [];
      animecategorysorted.length = 5;
      mangacategorysorted.length = 5;

      for (let e = 0; e < animecategorysorted.length; ++e) {
        animecategorysortedfix.push(animecategorysorted[e].genre + ":" + " " + animecategorysorted[e].amount)
        mangacategorysortedfix.push(mangacategorysorted[e].genre + ":" + " " + mangacategorysorted[e].amount)
      }

      const embed = new Discord.RichEmbed()
        .setTitle(username)
        .setColor(color)
        .setDescription(about)
        .setFooter(`Information about ${username}`, kitsuLogo)
        .setImage(coverImage)
        .setThumbnail(avatar)
        .setTimestamp()
        .setURL(siteUrl)
        .addField("Anime List:", listentries_anime, true)
        .addField("Manga List:", listentries_manga, true)
        .addField("Anime Watch Time:", bot.caps(lifeSpentOnAnimeresult.join(" ")), true)
        .addField("Manga Chapters Read:", chapterread, true)
        .addField("Favorite Animes:", favoritanime, true)
        .addField("Favorite Mangas:", favoritmanga, true)
        .addField("Favorite Characters:", favoritcharacter)
        .addField("Favorite Anime Genres:", animecategorysortedfix, true)
        .addField("Favorite Manga Genres:", mangacategorysortedfix, true)
      //.addField("Favorite Years:", `${yearfav.join(" ")}`)
      //.addField("Last List Update:", updatedAt);

      await message.channel.send(`${user}, here is the result for ${username}`, { embed });
    });
};
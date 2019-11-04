const Discord = require("discord.js");
const moment = require("moment");
let token;

var bot = new Discord.Client();
bot.config = require("./config.json");
bot.log = require("./functions/log.js");
bot.caps = require("./functions/capitalize.js");
bot.allcaps = require("./functions/allcaps.js");
bot.date = require("./functions/holidaycheck.js");

if (process.env.DISCORDTOKEN == null) {
  token = bot.config.token;
} else {
  token = process.env.DISCORDTOKEN;
}

bot.token = token;

bot.on("ready", () => require("./events/ready.js")(bot));
bot.on("message", message => require("./events/message.js")(bot, message, Discord, moment));
bot.on("error", error => require("./events/error.js")(bot, error));

bot.commands = new Discord.Collection();
bot.commands.set("help", require("./commands/help.js"));
bot.commands.set("user", require("./commands/searchuser.js"));
bot.commands.set("kitsu", require("./commands/kitsu.js"));
bot.commands.set("anilist", require("./commands/anilist.js"));
bot.commands.set("waifu", require("./commands/mywaifu.js"));
bot.commands.set("anilistanime", require("./commands/searchanime.js"));
bot.commands.set("kitsuanime", require("./commands/searchanimekitsu.js"));
bot.commands.set("anilistmanga", require("./commands/searchmanga.js"));
bot.commands.set("kitsumanga", require("./commands/searchmangakitsu.js"));
bot.commands.set("rdmanime", require("./commands/randomanime.js"));
bot.commands.set("kitsurdmanime", require("./commands/randomanimekitsu.js"));
bot.commands.set("rdmmanga", require("./commands/randommanga.js"));
bot.commands.set("kitsurdmmanga", require("./commands/randommangakitsu.js"));
bot.commands.set("character", require("./commands/searchcharacter.js"));
bot.commands.set("staff", require("./commands/searchstaff.js"));
bot.commands.set("poll", require("./commands/poll.js"));
bot.commands.set("test", require("./commands/test.js"));
bot.commands.set("p2w", require("./commands/userp2w.js"));
bot.commands.set("kitsup2w", require("./commands/userp2wkitsu.js"));
bot.commands.set("p2r", require("./commands/userp2r.js"));
bot.commands.set("kitsup2r", require("./commands/userp2rkitsu.js"));
bot.commands.set("antibully", require("./commands/antibully.js"));
bot.commands.set("antiantibully", require("./commands/antiantibully.js"));
bot.commands.set("yt", require("./commands/youtubesearch.js"));
bot.commands.set("animekitsu", require("./commands/searchanimekitsu.js"));
bot.commands.set("music", require("./commands/music.js"));
bot.commands.set("rewatch", require("./commands/randomrewatchanime.js"));

bot.login(bot.token);

//Webserver

const http = require("http");
const express = require("express");
const app = express();
var externalRoutes = require('./webserver/externalRoutes');
app.use(express.static("webserver/script"));
app.use(express.static("webserver/view"));
app.use("/", externalRoutes);
app.get("/stayalive", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 270000);

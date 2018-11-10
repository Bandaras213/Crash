const ms = require("ms");
module.exports = (bot) => {
    bot.log(`Bot ${bot.user.tag} has started with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`, "Started");
    bot.user.setActivity('Calculating Waifu material', {
      type: "STREAMING",
      url: "https://www.twitch.tv/xtobishotz"});

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
}
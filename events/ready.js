const ms = require("ms");
module.exports = (bot) => {
let activity = bot.config.botactivity.activity
let type = bot.config.botactivity.type
let status = bot.config.botactivity.status
    bot.log(`Bot ${bot.user.tag} has started with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`, "Started");
bot.user.setPresence({
        game: { 
            name: activity,
            type: type
        },
        status: status
    });

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
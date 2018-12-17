const Discord = require("discord.js");
const moment = require('moment');
let token

var bot = new Discord.Client();
bot.config = require('./config.json');
bot.log = require('./functions/log.js');
bot.caps = require('./functions/capitalize.js');
bot.allcaps = require('./functions/allcaps.js');

if (process.env.DISCORDTOKEN == null) {
  token = bot.config.token;
} else {
  token = process.env.DISCORDTOKEN;
};

bot.token = token;

bot.on('ready', () => require('./events/ready.js')(bot));
bot.on('message', message => require('./events/message.js')(bot, message, Discord, moment));
bot.on("error", error => require('./events/error.js')(bot, error));

bot.commands = new Discord.Collection();
bot.commands.set('waifu', require('./commands/mywaifu.js'));
bot.commands.set('anilist', require('./commands/anilist.js'));
bot.commands.set('anime', require('./commands/searchanime.js'));
bot.commands.set('character', require('./commands/searchcharacter.js'));
bot.commands.set('manga', require('./commands/searchmanga.js'));
bot.commands.set('user', require('./commands/searchuser.js'));
bot.commands.set('rdmanime', require('./commands/randomanime.js'));
bot.commands.set('rdmmanga', require('./commands/randommanga.js'));
bot.commands.set('help', require('./commands/help.js'));
bot.commands.set('staff', require('./commands/searchstaff.js'));
bot.commands.set('poll', require('./commands/poll.js'));
bot.commands.set('test', require('./commands/test.js'));
bot.commands.set('p2w', require('./commands/userp2w.js'));
//bot.commands.set('', require('./commands/.js'));
//bot.commands.set('', require('./commands/.js'));
//bot.commands.set('', require('./commands/.js'));
//bot.commands.set('', require('./commands/.js'));

bot.login(bot.token);


//Webserver

  const http = require('http');
  const express = require('express');
  const app = express();
  app.use(express.static('webserver/script'));
  app.use(express.static('webserver/view'));
  app.get("/stayalive", (request, response) => {
    response.sendStatus(200);
  });
  app.get('/about',function(req,res){
  res.sendFile('./webserver/view/about.html', {root: __dirname});
  });
  app.listen(process.env.PORT);
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 270000);
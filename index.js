const Discord = require("discord.js");
const moment = require('moment');
let token = process.env.TOKEN

var bot = new Discord.Client();
bot.config = require('./config.json');
bot.log = require('./functions/log.js');
bot.token = token

bot.on('ready', () => require('./events/ready.js')(bot));
bot.on('message', message => require('./events/message.js')(bot, message, Discord, moment));
bot.on("error", error => require('./events/error.js')(bot, error));

bot.commands = new Discord.Collection();
bot.commands.set('benutzer', require('./commands/userinfo.js'));
bot.commands.set('anime', require('./commands/searchanime.js'));
bot.commands.set('hilfe', require('./commands/help.js'));
bot.commands.set('test', require('./commands/test.js'));

bot.login(bot.token);
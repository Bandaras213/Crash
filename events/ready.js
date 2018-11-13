const ms = require("ms");
module.exports = (bot) => {

  let activity
  let type
  let status

  if (process.env.ACTIVITYACTIVITY) {
    activity = process.env.ACTIVITYACTIVITY
  } else {
    activity = bot.config.botactivity.activity
  };

  if (process.env.ACTIVITYTYPE) {
    type = process.env.ACTIVITYTYPE
  } else {
    type = bot.config.botactivity.type
  };

  if (process.env.botactivity.status) {
    status = process.env.ACTIVITYSTATUS
  } else {
    status = bot.config.botactivity.status
  };


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
};

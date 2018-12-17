const ms = require("ms");
module.exports = (bot) => {

  let activity;
  let type;
  let status;

  if (process.env.ACTIVITYACTIVITY != null) {
    activity = process.env.ACTIVITYACTIVITY;
  } else {
    activity = bot.config.botactivity.activity;
  };

  if (process.env.ACTIVITYTYPE != null) {
    type = process.env.ACTIVITYTYPE;
  } else {
    type = bot.config.botactivity.type;
  };

  if (process.env.ACTIVITYSTATUS != null) {
    status = process.env.ACTIVITYSTATUS;
  } else {
    status = bot.config.botactivity.status;
  };


  bot.log(`Bot ${bot.user.tag} has started with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`, "Started");

  bot.user.setPresence({
    game: {
      name: activity,
      type: type
    },
    status: status
  });
};
module.exports = async (bot, message, args, Discord, moment) => {
  let prefix = bot.config.prefix;

  message.author.send({
    embed: {
      color: "2123412",
      author: {
        name: `${bot.user.tag}`,
        icon_url: bot.user.avatarURL
      },
      title: `${bot.user.username} commands Help`,
      url: "http://github.com/Bandaras213/Crash/wiki/Commands",
      description: "These are all Commands with a Description.",
      fields: [{
        name: `${prefix}help`,
        value: "Shows you this Embed."
      },
      {
        name: `${prefix}anime [Anime Name]`,
        value: "Starts a search for Anime and let's you choose one of the results."
      },
      {
        name: `${prefix}manga [Manga Name]`,
        value: "Starts a search for Manga and let's you choose one of the results."
      },
      {
        name : `${prefix}character [Character Name]`,
        value: "Starts a search for Character and let's you choose one of the results."
      },
      {
        name: `${prefix}rdmanime`,
        value: "Searches for a random Anime."
      }],
      timestamp: new Date(),
      footer: {
        icon_url: bot.user.avatarURL,
        text: "Crash Bot coding at 4pm"
      }
    }
  });

  message.delete(1000);
};

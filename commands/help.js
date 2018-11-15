module.exports = async (bot, message, args, Discord, moment) => {
  let prefix = bot.config.prefix

  message.author.send({
    embed: {
      color: "2123412",
      author: {
        name: `${bot.user.tag}`,
        icon_url: bot.user.avatarURL
      },
      title: "Help",
      url: "http://github.com/Bandaras213/Crash/wiki/Commands",
      description: "Thelse are all Commands with a description.",
      fields: [{
        name: `${prefix}help`,
        value: "Shows you this embed."
      },
      {
        name: `${prefix}anime [Anime Name]`,
        value: "Starts a search for a anime for you and let's you choose one of seven results."
      },
      {
        name: `${prefix}manga [Manga Name]`,
        value: "Starts a search for a Manga for you and let's you choose one of seven results."
      },
      {
        name: `${prefix}rdmanime`,
        value: "Searches a random Anime for you."
      }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: bot.user.avatarURL,
        text: "Crash Bot coding at 4pm"
      }
    }
  });

  message.delete(1000);

};
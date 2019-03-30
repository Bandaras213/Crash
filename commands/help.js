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
          value: "Starts a Anime search and let's you choose one of the results."
        },
        {
          name: `${prefix}rdmanime`,
          value: "Searches for a random Anime."
        },
        {
          name: `${prefix}rdmmanga`,
          value: "Searches for a random Manga."
        },
        {
          name: `${prefix}manga [Manga Name]`,
          value: "Starts a Manga search and let's you choose one of the results."
        },
        {
          name: `${prefix}character [Character Name]`,
          value: "Starts a Character search and let's you choose one of the results."
        },
        {
          name: `${prefix}waifu [@user / save]`,
          value: `Shows the Waifu of the User that triggered the command / the User mentioned.\nWaifus can be saved with ${prefix}waifu save Character Name.`
        },
        {
          name: `${prefix}user [User Name]`,
          value: "Starts a User search and displays Anilist stats for that User."
        },
        {
          name: `${prefix}anilist [@user / save]`,
          value: `Shows Anilist stats of the User that triggered the command / the User mentioned.\nAnilist can be saved with ${prefix}anilist save Username.`
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
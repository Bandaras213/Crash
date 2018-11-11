module.exports = async (bot, message, args, Discord, moment) => {

  let prefix = bot.config.prefix
  var embed = new Discord.RichEmbed()
    .setAuthor(`${bot.user.tag} Commands:`)
    .setThumbnail(`${bot.user.avatarURL}`, false)
    .addField(`${prefix}help`, "Shows you this embed", false)
    .addField(`${prefix}anime [Anime Name]`, "Search on Kitsu.io for Anime.", false)
    .addField(`${prefix}manga [Manga Name]`, "Search on Kitsu.io for Manga.", false)
    .setFooter("Dab on the errors.")
    .setColor("#1919ff");

  await message.author.send(embed);
  message.delete(1000);
};
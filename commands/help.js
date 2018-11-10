module.exports = async (bot, message, args, Discord, moment) => {
    var embed = new Discord.RichEmbed()
        .setAuthor('Crash Commands')
        .setThumbnail(`${bot.user.avatarURL}`, false)
        .addField(`${bot.config.prefix}help`, "Shows you this embed", false)
        .addField(`${bot.config.prefix}anime [Anime Name]`, "Searches on Kitsu.io for the Anime Name and returns 7 results from which you can choose 1 and the Bot posts the Info as an embed in the channel.", false)
        .setFooter("Dab on the errors.")
    		.setColor("#1919ff")
    await message.author.send(embed);
  	message.delete(1000)
};
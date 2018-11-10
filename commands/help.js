module.exports = async (bot, message, args, Discord, moment) => {
    var embed = new Discord.RichEmbed()
        .setAuthor('Crash Commands')
        .setThumbnail(`${bot.user.avatarURL}`, false)
        .addField(`${bot.config.prefix}hilfe`, "Zeigt diese Hilfe an mit allen Kommandos", false)
        .addField(`${bot.config.prefix}anime [Anime Name]`, "Sucht auf Kitsu.io nach einem Anime und gibt 7 Resultate aus aus denen gewählt werden kann.", false)
        .setFooter("Dab auf die Fehler.")
    		.setColor("#1919ff")
    await message.author.send(embed);
  	message.delete(1000)
};
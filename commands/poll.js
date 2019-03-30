module.exports = async (bot, message, args, Discord, moment) => {

    let msgs = args.join(' ');

    if (args.length < 1) {
        await message.delete;
        await message.channel.send("No Question asked! Use [" + bot.config.prefix + "poll (Poll Question)]");
    } else {
        var embed = new Discord.RichEmbed()
            .addField(`📋 A Poll Has Been Started By ${message.member.displayName}`, `${msgs}`)
            .setColor(message.member.displayHexColor)
            .setFooter(`You Can Now Vote Using The Reactions Below!`);
        await message.delete();
        let msg = await message.channel.send({ embed });
        await msg.react('👍');
        await msg.react('👎');
    };
};
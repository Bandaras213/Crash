module.exports = (bot, message, Discord, moment) => {
  if (message.author.equals(bot.user)) return;
  if (message.content.indexOf(bot.config.prefix) !== 0) return;
  const args = message.content
    .slice(bot.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (bot.commands.has(command)) {
    bot.commands.get(command)(bot, message, args, Discord, moment);
    bot.log(`${message.member.displayName} (${message.member.user.tag}) executed command "${command}" in #${message.channel.name} on the ${message.member.guild} Server`, "Command");
  }
};

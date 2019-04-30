module.exports = async (bot, message, args, Discord, moment) => {
  let today = moment(new Date).format("DD.MM");
  if (today >= 29.04 && today <= 30.04) {
    message.channel.send(`${today} ist Halloween`);
    bot.Date(today)
   } else {
    message.channel.send(`${today} ist Kein Feiertag aber Tobias ist ein String`);
   }
   console.log(today)
};

let size;

module.exports = async (bot, message, args, Discord) => {

    let mention = message.mentions.users.first();
    message.delete();

    if (args.length == 0) {
        return message.channel.send("Please add a @user size mention to the command. " + message.author);
    };

    if (message.channel.guild.members.find(val => val.id === mention.id) == null) {
        return message.channel.send("Please add a @user size mention to the command. " + message.author);
    } else {
        if (args[1] != undefined) {
            if ((Math.log(args[1]) / Math.log(2)) % 1 === 0 == false || size > 2048) {
                return message.channel.send("The Avatar Size must be a Power of Two and can´t be bigger then 2048");
            } else {
                size = args[1];
            };
        } else {
            size = 256;
        };
    };

    let username = mention.username;
    let avatarurl = mention.avatarURL;
  
    let avatarfilter = avatarurl.indexOf('?');
    avatarurl = avatarurl.substring(0, avatarfilter != -1 ? avatarfilter : avatarurl.length);

    let embed = new Discord.RichEmbed()
        .setTitle("Here is the Avatar for " + username + " in size " + size + "x" + size)
        .setImage(avatarurl + "?size=" + size)
        .setTimestamp()

    message.channel.send(embed);
};
const ytdl = require("ytdl-core");

const queue = new Map();
let list;

module.exports = async (bot, message, args, Discord, moment) => {
  const serverQueue = queue.get(message.guild.id);

  message.delete();

  if (args[0] == "play") {
    execute(message, serverQueue);
    return;
  } else if (args[0] == "skip") {
    skip(message, serverQueue);
    return;
  } else if (args[0] == "stop") {
    stop(message, serverQueue);
    return;
  } else if (args[0] == "list") {
    list(message, serverQueue);
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }

  async function execute(message, serverQueue) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music!");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send("I need the permissions to join and speak in your voice channel!");
    }

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
      title: songInfo.title,
      url: songInfo.video_url
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }

  function skip(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send("You have to be in a voice channel to stop the music!");
    if (!serverQueue) return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }

  function stop(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send("You have to be in a voice channel to stop the music!");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
  
  function list(message, serverQueue) {
    if (!serverQueue) {
      return message.channel.send("There is no songs that I could show!");
    } else {
      let quelist = [];
      for (let a = 0; a < serverQueue.songs.length; ++a) {
      quelist.push({"name": a+1, "value": serverQueue.songs[a].title});
      }

      const embed = {
        "title": "Current Song List",
        "description": "This is the Current Music List",
        "color": 7743335,
        "timestamp": new Date(),
        "footer": {
          "icon_url": bot.user.avatarURL,
          "text": "Current Song List"
        },
        "thumbnail": {
          "url": bot.user.avatarURL
        },
        "author": {
          "name": bot.user.username,
          "icon_url": bot.user.avatarURL
        },
        "fields": quelist
      };

      message.channel.send({ embed });
    }
  }

  function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .playStream(ytdl(song.url))
      .on("end", () => {
        console.log("Music ended!");
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => {
        console.error(error);
      });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 7);
  }
};

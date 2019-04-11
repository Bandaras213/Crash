const search = require("youtube-search");
let apikey = process.env.YTAPIV3KEY;

var emoji = [
  "❌", //X
  "\u0031\u20E3", //1
  "\u0032\u20E3", //2
  "\u0033\u20E3", //3
  "\u0034\u20E3", //4
  "\u0035\u20E3" //5
];

module.exports = async (bot, message, args, Discord) => {
  message.delete();
  let custom = args.join(" ");
  let user = message.author;
  let i;
  let uid = message.author.id;
  var opts = {
    maxResults: 5,
    key: apikey,
    type: "video",
    order: "relevance"
  };

  if (args.length == 0) {
    return message.channel.send(`${user}, I need a Title to search for! (Usage: €yt Title)`);
  }

  search(custom, opts, async (err, results) => {
    if (err) return console.log(err);
    console.log(results.length);

    let field1 = [];
    for (let a = 0; a < results.length; a++) {
      field1.push({
        name: `${results[a].title.replace(/&quot;/g, "")}`,
        value: `Reaction: ${emoji[a + 1]}`
      });
    }

    let embed;
    switch (results.length) {
      case 1:
        embed = {
          color: 65280,
          author: {
            name: `Results for "${args}"`
          },
          footer: {
            text: `Please choose by using the Reactions below!`
          },
          fields: [
            field1[0],
            {
              name: "None of the above (Abort Command)",
              value: `Reaction: ${emoji[0]}`
            }
          ]
        };
        break;
      case 2:
        embed = {
          color: 65280,
          author: {
            name: `Results for "${args}"`
          },
          footer: {
            text: `Please choose by using the Reactions below!`
          },
          fields: [
            field1[0],
            field1[1],
            {
              name: "None of the above (Abort Command)",
              value: `Reaction: ${emoji[0]}`
            }
          ]
        };
        break;
      case 3:
        embed = {
          color: 65280,
          author: {
            name: `Results for "${args}"`
          },
          footer: {
            text: `Please choose by using the Reactions below!`
          },
          fields: [
            field1[0],
            field1[1],
            field1[2],
            {
              name: "None of the above (Abort Command)",
              value: `Reaction: ${emoji[0]}`
            }
          ]
        };
        break;
      case 4:
        embed = {
          color: 65280,
          author: {
            name: `Results for "${args}"`
          },
          footer: {
            text: `Please choose by using the Reactions below!`
          },
          fields: [
            field1[0],
            field1[1],
            field1[2],
            field1[3],
            {
              name: "None of the above (Abort Command)",
              value: `Reaction: ${emoji[0]}`
            }
          ]
        };
        break;
      case 5:
        embed = {
          color: 65280,
          author: {
            name: `Results for "${args}"`
          },
          footer: {
            text: `Please choose by using the Reactions below!`
          },
          fields: [
            field1[0],
            field1[1],
            field1[2],
            field1[3],
            field1[4],
            {
              name: "None of the above (Abort Command)",
              value: `Reaction: ${emoji[0]}`
            }
          ]
        };
        break;
    }

    let em1;
    switch (results.length) {
      case 0:
        em1 = await message.channel.send(`${user}, Couldn't find any Results for "${args.join(" ")}"!`);
        return;
      case 1:
        em1 = await message.channel.send(`${user} is choosing a Video.`, { embed });
        await em1.react(emoji[1]);
        await em1.react(emoji[0]);
        break;
      case 2:
        em1 = await message.channel.send(`${user} is choosing a Video.`, { embed });
        await em1.react(emoji[1]);
        await em1.react(emoji[2]);
        await em1.react(emoji[0]);
        break;
      case 3:
        em1 = await message.channel.send(`${user} is choosing a Video.`, { embed });
        await em1.react(emoji[1]);
        await em1.react(emoji[2]);
        await em1.react(emoji[3]);
        await em1.react(emoji[0]);
        break;
      case 4:
        em1 = await message.channel.send(`${user} is choosing a Video.`, { embed });
        await em1.react(emoji[1]);
        await em1.react(emoji[2]);
        await em1.react(emoji[3]);
        await em1.react(emoji[4]);
        await em1.react(emoji[0]);
        break;
      case 5:
        em1 = await message.channel.send(`${user} is choosing a Video.`, { embed });
        await em1.react(emoji[1]);
        await em1.react(emoji[2]);
        await em1.react(emoji[3]);
        await em1.react(emoji[4]);
        await em1.react(emoji[5]);
        await em1.react(emoji[0]);
        break;
    }

    const filter = (reaction, user) => {
      return emoji.includes(reaction.emoji.name) === true && user.id === uid;
    };

    const collector = await em1.createReactionCollector(filter, {
      max: 1,
      time: 15000
    });

    collector.on("collect", async (reaction, reactionCollector) => {
      let chosen = reaction.emoji.name;

      switch (chosen) {
        case emoji[0]:
          return em1.delete(), message.channel.send(`${user} aborted the command.`);
        case emoji[1]:
          em1.clearReactions();
          i = 1;
          break;
        case emoji[2]:
          em1.clearReactions();
          i = 2;
          break;
        case emoji[3]:
          em1.clearReactions();
          i = 3;
          break;
        case emoji[4]:
          em1.clearReactions();
          i = 4;
          break;
        case emoji[5]:
          em1.clearReactions();
          i = 5;
          break;
      }

      switch (i) {
        case 0:
          return em1.delete(), message.channel.send(`${user} aborted the command.`);
        case emoji[1]:
          em1.delete();
          message.channel.send(`${user}, Your video is ${results[0].link}`);
          break;
        case 1:
          em1.delete();
          message.channel.send(`${user}, Your video is ${results[1].link}`);
          break;
        case 2:
          em1.delete();
          message.channel.send(`${user}, Your video is ${results[2].link}`);
          break;
        case 3:
          em1.delete();
          message.channel.send(`${user}, Your video is ${results[3].link}`);
          break;
        case 4:
          em1.delete();
          message.channel.send(`${user}, Your video is ${results[4].link}`);
          break;
      }
    });
    collector.on("end", collected => {
      if (collected.size == 0) {
        em1.delete();
        message.channel.send(`${user}, You didn't react fast enough, try again!`);
      }
    });
  });
};

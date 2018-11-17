const fetch = require('node-fetch')

module.exports = async (bot, message, args, Discord, moment) => {

    let charactername = args.join(' ');
    let user = message.member.user;
		message.delete();
  
    if (args.length == 0) {
      return message.channel.send(`${user}, I need a Title to search for! (Usage: €betaanime Title)`);
    };
  
  
  	var query = `
    query ($search: String) {
    Character(search: $search) {
        id
        siteUrl
        name {
            first
            last
						alternative
        }
        image {
            large
        }
        description(asHtml: false)
    }
}
`;
  
  	let variables = {
    search: charactername
    };

    let databody = {
        query: query,
        variables: variables
    };
  
  	    await fetch('https://graphql.anilist.co', {
        method: 'post',
        body: JSON.stringify(databody),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    		})
        .then(fetch1 => fetch1.json())
        .then(async fetch1 => {
          
   	let name = fetch1.data.Character.name.first;
    if (fetch1.data.Character.name.last != null) {
        name += ` ${fetch1.data.Character.name.last}`;
    }
          
    let alternative = fetch1.data.Character.name.alternative
				alternative = alternative.toString().split(",").join(", ")
          console.log (alternative)
  if (alternative == null) {
    	name = name
  } else{
    	name = name +", "+alternative};
          
  	let url = fetch1.data.Character.siteUrl
    let imageUrl = fetch1.data.Character.image.large
    let description = fetch1.data.Character.description
        
    const anilistLogo = "https://anilist.co/img/logo_al.png";

let embed = new Discord.RichEmbed()
        .setTitle(name)
        .setAuthor(name, anilistLogo)
				.setColor(0x00AE86)
        .setThumbnail(imageUrl)
        .setURL(url) 
				.setFooter(name, anilistLogo)
        description = description.replace(/<[^>]*>/g, ' ').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/\s{2,}/g, ' ').trim()
await message.channel.send({ embed })
message.channel.send(description.substring(0, 1999))
message.channel.send(description.substring(2000))
});
}
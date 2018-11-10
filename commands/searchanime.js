const fetch = require('node-fetch');

module.exports = async (bot, message, args, Discord, moment) => {

let animename = args.join(' ')
let user = message.member.user
let i
let color = Math.floor(Math.random() * 16777214) + 1;
const mes = await message.channel.send(`${user} is choosing a Anime.`)

await fetch('https://kitsu.io/api/edge/anime/?filter[text]=' + animename, {
  	method: 'GET',
  	headers: {'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json'} 
})
	.then(filter0 => filter0.json())
  .then(async filter0 => {
  
  //define the embed
    let embed = {
        "color": 65280,
        "author": {
            "name": `Please choose`,
        },
        "footer": {
            "text": `Please choose a number between 0-7`,
        },
        "fields": [
            {
                "name": filter0.data[0].attributes.canonicalTitle,
              	"value": "Number: 1"
            },
            {
                "name": filter0.data[1].attributes.canonicalTitle,
              	"value": "Number: 2"
            },
            {
                "name": filter0.data[2].attributes.canonicalTitle,
              	"value": "Number: 3"
            },
            {
                "name": filter0.data[3].attributes.canonicalTitle,
              	"value": "Number: 4"
            },
            {
                "name": filter0.data[4].attributes.canonicalTitle,
              	"value": "Number: 5"
            },
            {
                "name": filter0.data[5].attributes.canonicalTitle,
              	"value": "Number: 6"
            },
            {
                "name": filter0.data[6].attributes.canonicalTitle,
              	"value": "Number: 7"
            },
          	{
          			"name": "None of the above (Go back)",
              	"value": "Number: 0"
            }
        ]
    }

await message.author.send(`This is what the search found for ${animename}`, { embed })
  .then (async (newmsg) => {
  
let msgs = await newmsg.channel.awaitMessages(msg => {
  			return msg.content;
}, { max: 1, time: 20000 });
  
      if (Number.isInteger(parseInt(msgs.map(msg => msg.content)))) {

        let msgint = parseInt(msgs.map(msg => msg.content), 10);
        if (msgint === NaN || msgint > 7 || msgint === "") {
            return mes.edit("I need a number between 0-7")
        }
        
        switch (msgint) {
            case 0:
                mes.edit("Number 0 got chosen and the command got canceled.")
            		newmsg.channel.send("You choose number 0 and canceled the command.")
            		message.delete
                break
            case 1:
                mes.edit("Number 1 got chosen")
            		newmsg.channel.send(`You choose number 1 the result got send to ${message.channel.name}.`)
            		message.delete
            		i = 0
                break
            case 2:
                mes.edit("Number 2 got chosen");
            		newmsg.channel.send(`You choose number 2 the results got send to ${message.channel.name}.`)
            		message.delete
            		i = 1
                break
            case 3:
                mes.edit("Number 3 got chosen");
            		newmsg.channel.send(`You choose number 3 results got send to ${message.channel.name}.`)
            		message.delete
            		i = 2
                break
            case 4:
                mes.edit("Number 4 got chosen");
            		newmsg.channel.send(`You choose number 4 results got send to ${message.channel.name}.`)
            		message.delete
            		i = 3
                break
            case 5:
                mes.edit("Number 5 got chosen");
            		newmsg.channel.send(`You choose number 5 results got send to ${message.channel.name}.`)
            		message.delete
            		i = 4
                break
            case 6:
                mes.edit("Number 6 got chosen");
            		newmsg.channel.send(`You choose number 6 results got send to ${message.channel.name}.`)
            		message.delete
            		i = 5
                break
            case 7:
                mes.edit("Nummber 7 got chosen");
            		newmsg.channel.send(`You choose number 7 results got send to ${message.channel.name}.`)
    						message.delete
            		i = 6
                break
        };
            } else {
        return mes.edit("I need a number between 0 - 7")
}
  

await fetch('https://kitsu.io/api/edge/anime/?filter[text]=' + animename, {
  	method: 'GET',
  	headers: {'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json'} 
})
	.then(res0 => res0.json())
  .then(async res0 => {
//console.log(JSON.stringify(res0.data[0], null, 2))
//data
let id = res0.data[i].id
let type = res0.data[i].type
let url = "https://kitsu.io/anime/" + id

//data.atributes
let synopsis = res0.data[i].attributes.synopsis
let canonTitle = res0.data[i].attributes.canonicalTitle
let avgRating = res0.data[i].attributes.averageRating
let favcount = res0.data[i].attributes.favoritesCount
let startdate = res0.data[i].attributes.startDate
let enddate = res0.data[i].attributes.endDate
let poprank = res0.data[i].attributes.popularityRank
let ratingrank = res0.data[i].attributes.ratingRank
let ager = res0.data[i].attributes.ageRating
let agerg = res0.data[i].attributes.ageRatingGuide
let subtype =  res0.data[i].attributes.subtype
let status = res0.data[i].attributes.status
let posterIMG = res0.data[i].attributes.posterImage.medium
let coverIMG = res0.data[i].attributes.coverImage.original
let episodes = res0.data[i].attributes.episodeCount
let episodemin = res0.data[i].attributes.episodeLength
let genres = res0.data[i].relationships.categories.links.related

let startfilter = startdate.split("-")
let start = startfilter[2]+"."+startfilter[1]+"."+startfilter[0]
if (episodemin == null) {
  episodemin = "20"}
let endfilter
let end
if (enddate === null) {
  end = "running"
}else{
endfilter = enddate.split("-")
end = endfilter[2]+"."+endfilter[1]+"."+endfilter[0]
}
let runtime 
if (episodes === null) {
  runtime = "Can't Calculate runtime without Episodes."
}else{
 runtime = Math.round(episodes * episodemin / 60) + " Hours"
}
if (episodes === null) {
  episodes = "No Episodes in Kitsu.io Database."}
if (coverIMG === null) {
  coverIMG = "./img/empty.png"}
  
await fetch(`${genres}`, {
  	method: 'GET',
  	headers: {'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json'} 
})
	.then(res1 => res1.json())
  .then(async res1 => {
  //console.log(JSON.stringify(res1, null, 2))
  var genreval=[];
	for(var o = 0; o < res1.data.length; o++){
  genreval.push(res1.data[o].attributes.title);
}

    const embed = new Discord.RichEmbed()
  .setTitle(canonTitle)
  .setColor(color)
  .setDescription(synopsis)
  .setFooter(canonTitle)
  .setImage(coverIMG)
  .setThumbnail(posterIMG)
  .setTimestamp()
  .setURL(url)
  .addField('Genre:', genreval.join(", "))
  .addField('Episodes:', episodes)
  .addField('Status:', status.charAt(0).toUpperCase() + status.substring(1))
  .addField('Aired:', `${subtype.charAt(0).toUpperCase() + subtype.substring(1)} ${start} - ${end}`)
  .addField('Type:', type.charAt(0).toUpperCase() + type.substring(1))
  .addField('Length per Episode:', `${episodemin} Min`)
  .addField('Time spend to watch:', `${runtime}`)
  .addField('Community Rating:', avgRating+"%") 
  .addField('Favorit Counter:', favcount)
  .addField('Popularity Rank:', poprank)
  .addField('Rating Rank:', ratingrank)
  .addField('Age Category:', `${ager} ${agerg}`)
 
  await mes.edit(`${user}, Here is the result for ${canonTitle}`, {embed});
  message.delete(2000)
})})})})}
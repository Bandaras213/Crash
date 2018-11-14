const fetch = require('node-fetch');

module.exports = async (bot, message, args, Discord, moment) => {

    let username
    let password
    let clientid
    let clientsecret

    if (process.env.KITSUUSERNAME) {
        username = process.env.KITSUUSERNAME
    } else {
        username = bot.config.KITSUUSERNAME
    };

    if (process.env.KITSUPASSWORD) {
        password = process.env.KITSUPASSWORD
    } else {
        password = bot.config.KITSUPASSWORD
    };

    if (process.env.KITSUCLIENTID) {
        clientid = process.env.KITSUCLIENTID
    } else {
        clientid = bot.config.KITSUCLIENTID
    };

    if (process.env.KITSUCLIENTSECRET) {
        clientsecret = process.env.KITSUCLIENTSECRET
    } else {
        clientsecret = bot.config.KITSUCLIENTSECRET
    };

    const authbody = {
        grant_type: 'password',
        username: username,
        password: password,
        client_id: clientid,
        client_secret: clientsecret
    };

    await fetch('https://kitsu.io/api/oauth/token', {
        method: 'post',
        body: JSON.stringify(authbody),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(tores => tores.json())
        .then(async tores => {
        	
       	let toktype = tores.token_type
            let acctok = tores.access_token
            let user = message.member.user
            let color = Math.floor(Math.random() * 16777214) + 1;
            message.delete();
            
            await fetch('https://kitsu.io/api/edge/anime/', {
                method: 'GET',
                headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json', 'Authorization': `${toktype} ${acctok}` }
            })
                .then(idmax => idmax.json())
                .then(async idmax => {
                	
                let ida = idmax.links.last
                let idb = ida.split("=");
                let idc = idb.pop();
                let idnum = Math.floor(Math.random() * idc) + 1;
                	
            await fetch('https://kitsu.io/api/edge/anime/' + idnum, {
                method: 'GET',
                headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json', 'Authorization': `${toktype} ${acctok}` }
            })
                .then(filter0 => filter0.json())
                .then(async filter0 => {
                    let nsfw = filter0.data.attributes.nsfw
                    let newid = filter0.data.id
                    
                  await fetch('https://kitsu.io/api/edge/anime/' + newid, {
                            method: 'GET',
                            headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json', 'Authorization': `${toktype} ${acctok}` }
                        })
                            .then(res0 => res0.json())
                            .then(async res0 => {

                                //data
                                let id = res0.data.id
                                //let type = res0.data.type
                                let url = "https://kitsu.io/anime/" + id

                                //data.atributes
                                let synopsis = res0.data.attributes.synopsis
                                let canonTitle = res0.data.attributes.canonicalTitle
                                let avgRating = res0.data.attributes.averageRating
                                let startdate = res0.data.attributes.startDate
                                let enddate = res0.data.attributes.endDate
                                let ager = res0.data.attributes.ageRating
                                let agerg = res0.data.attributes.ageRatingGuide
                                let subtype = res0.data.attributes.subtype
                                let status = res0.data.attributes.status
                                let posterIMG = res0.data.attributes.posterImage.medium
                                let coverIMG = res0.data.attributes.coverImage
                                let episodes = res0.data.attributes.episodeCount
                                let episodemin = res0.data.attributes.episodeLength
                                let categories = res0.data.relationships.categories.links.related
                                let videoid = res0.data.attributes.youtubeVideoId
                                let nsfw = res0.data.attributes.nsfw


                                if (startdate === null && enddate === null) {
                                    start = "No Startdate in the Database."
                                    end = "No Enddate in the Database."
                                };

                                let startfilter
                                let start
                                if (startdate === null) {
                                    start = "Not Running or no Data in Database."
                                } else {
                                    startfilter = startdate.split("-")
                                    start = startfilter[2] + "." + startfilter[1] + "." + startfilter[0]
                                };

                                let endfilter
                                let end
                                if (enddate === null) {
                                    end = "running"
                                } else {
                                    endfilter = enddate.split("-")
                                    end = endfilter[2] + "." + endfilter[1] + "." + endfilter[0]
                                };

                                if (avgRating === null) {
                                    avgRating = "No Data in Database."
                                } else {
                                    avgRating = avgRating + "%"
                                };

                                if (videoid == null || videoid == undefined) {
                                    videoid = "DLzxrzFCyOs"
                                };

                                if (ager === null) {
                                    ager = "No data in database."
                                };

                                if (agerg === null) {
                                    agerg = "No Data in Database."
                                };

                                if (subtype === null) {
                                    subtype = "No Data in Database."
                                } else {
                                    subtype = bot.caps(subtype);
                                };

                                if (status === null) {
                                    status = "No Data in Database."
                                } else {
                                    status = bot.caps(status);
                                };

                                if (posterIMG === null) {
                                    posterIMG = 'https://cdn.glitch.com/6343387a-229e-4206-a441-3faed6cbf092%2Foie_canvas%20(1).png?1541619925848'
                                };

                                let time
                                function timeConvert(n) {

                                    let hours = Math.floor(n / 60);
                                    let minutes = Math.floor((n / 60 - hours) * 60);

                                    if (hours === 0) {
                                        time = minutes + " minute(s)."
                                    } else { time = "Approximately " + hours + " hour(s) and " + minutes + " minute(s)." };
                                };

                                if (time == undefined || time == null) {
                                    time = "No Data in Database."
                                };

                                let runtime
                                if (episodes === null || episodemin === null) {
                                    runtime = "Can't Calculate Runtime without Episodes or Episode length."
                                } else {
                                    runtime = episodes * episodemin
                                    timeConvert(runtime)
                                };

                                if (episodes === null) {
                                    episodes = "No Episodes in the Kitsu.io database."
                                };

                                if (episodemin === null) {
                                    episodemin = "No Data in Database."
                                } else { episodemin = episodemin + " Min" };

                                if (coverIMG === null) {
                                    coverIMG = ""
                                } else {
                                    coverIMG = coverIMG.original
                                };

                                        await fetch(`${categories}`, {
                                            method: 'GET',
                                            headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json', 'Authorization': `${toktype} ${acctok}` }
                                        })
                                            .then(res9 => res9.json())
                                            .then(async res9 => {
                                                var categoryval = [];
                                                for (var owo = 0; owo < res9.data.length; owo++) {
                                                    categoryval.push(res9.data[owo].attributes.title);
                                                };

                                                if (categoryval == null || categoryval == "") {
                                                    categoryval = "No Categories in Database."
                                                } else {
                                                    categoryval = categoryval.join(", ");
                                                };

											         									const embed = new Discord.RichEmbed()
                                                    .setTitle(canonTitle)
                                                    .setColor(color)
                                                    .setDescription(synopsis)
                                                    .setFooter(canonTitle)
                                                    .setImage(coverIMG)
                                                    .setThumbnail(posterIMG)
                                                    .setTimestamp()
                                                    .setURL(url)
                                                    .addField('Type:', `${subtype}`)
                                                    .addField('Status:', status)
                                                    .addField('Preview Trailer:', `[Click Me](https://www.youtube.com/watch?v=` + `${videoid})`)
                                                    .addField('Categories:', categoryval)
                                                    .addField('Aired:', `From ${start} to ${end}`)
                                                    .addField('Episodes:', episodes)
                                                    .addField('Episode Length:', `${episodemin}`)
                                                    .addField('Total Runtime:', `${time}`)
                                                    .addField('Community Rating:', avgRating)
                                                    .addField('Age Category:', `${ager} ${agerg}`)

                                                if (nsfw == false) {
                                                    await message.channel.send(`${user}, here is your random result it is ${canonTitle}`, { embed });
                                                } else {
                                                    await message.channel.send(`${user}, You're random selection was a NSFW Anime! I've sent you a DM ( ͡~ ͜ʖ ͡°)`);
                                                    await message.author.send(`Here is your random result it is ${canonTitle}`, { embed });
                                                };
                                            });
                                    });
                            });
                    });
              });
			};
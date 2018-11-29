const fetch = require('node-fetch');
const query = require("../data/staffquery.js");

module.exports = async (bot, message, args, Discord, moment) => {

    let staffname = args.join(' ');
    let color = Math.floor(Math.random() * 16777214) + 1;
    let user = message.member.user;
    message.delete();
    
    if (args.length == 0) {
       return message.channel.send(`${user}, I need a Staff Name to search for! (Usage: €staff Name)`);
    };

    await query;

    let variables = {
        search: staffname,
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
      
      if (fetch1.data.Staff == null) {
          return message.channel.send(`${user}, Couldn't find a matching Staffmember for '**${args.join(" ")}**'`);
      };
      
      let staffid = fetch1.data.Staff.id;
      let name = fetch1.data.Staff.name.first;
      if (fetch1.data.Staff.name.last != null) {
          name += ` ${fetch1.data.Staff.name.last}`;
      };
      let namenative = fetch1.data.Staff.name.native;
      let stafflanguage = fetch1.data.Staff.language;
      let staffimage = fetch1.data.Staff.image.large;
      let description = fetch1.data.Staff.description;
      let staffurl = fetch1.data.Staff.siteUrl;
      
      let staffmedia = [];
      let staffedges = fetch1.data.Staff.staffMedia.edges;
      for (let a = 0; a < staffedges.length; a++) {
        let staffrole = staffedges[a].staffRole;
        let mediatitle = staffedges[a].node.title.romaji;
        let mediatype = bot.caps(staffedges[a].node.type);
        let mediaurl = staffedges[a].node.siteUrl;
        staffmedia.push(staffrole + ":");
        staffmedia.push("[" + mediatitle + "]" + "(" + mediaurl + ")" + " " + "(" + mediatype + ")");
      };
      
      let staffmediasort0 = [];
      let staffmediasort1 = [];
      let staffmediasort2 = [];
      let staffmediasort3 = [];
      let staffmediasort4 = [];
      let staffmediasort5 = [];
      let staffmediasort6 = [];
      let staffmediasort7 = [];
      let staffmediasort8 = [];
      let staffmediasort9 = [];
        for (let d = 0; d < staffmedia.length; d += 2) {
          
          switch(staffmedia[d]) {
            case staffmedia[0]: staffmediasort0.push(staffmedia[d])
                                staffmediasort0.push(staffmedia[d+1])
                                break;
            case staffmedia[1]: staffmediasort1.push(staffmedia[d])
                                staffmediasort1.push(staffmedia[d+1])
                                break;
            case staffmedia[2]: staffmediasort2.push(staffmedia[d])
                                staffmediasort2.push(staffmedia[d+1])
                                break;
            case staffmedia[3]: staffmediasort3.push(staffmedia[d])
                                staffmediasort3.push(staffmedia[d+1])
                                break;
            case staffmedia[4]: staffmediasort4.push(staffmedia[d])
                                staffmediasort4.push(staffmedia[d+1])
                                break;
            case staffmedia[5]: staffmediasort5.push(staffmedia[d])
                                staffmediasort5.push(staffmedia[d+1])
            										break;
            case staffmedia[6]: staffmediasort6.push(staffmedia[d])
              									staffmediasort6.push(staffmedia[d+1])
              									break;
            case staffmedia[7]: staffmediasort7.push(staffmedia[d])
              									staffmediasort7.push(staffmedia[d+1])
              									break;
            case staffmedia[8]: staffmediasort8.push(staffmedia[d])
              									staffmediasort8.push(staffmedia[d+1])
              									break;
            case staffmedia[9]: staffmediasort9.push(staffmedia[d])
              									staffmediasort9.push(staffmedia[d+1])
              									break;
    				};
        };
      
      let staffmedia1
      staffmedia1 = staffmediasort0.concat(staffmediasort1, staffmediasort2, staffmediasort3, staffmediasort4, staffmediasort5, staffmediasort6, staffmediasort7, staffmediasort8, staffmediasort9);
      var uniqstaff = [ ...new Set(staffmedia1)];
      
      let characters = [];
      let characters1 = [];
      if (fetch1.data.Staff.characters.edges < 1) {
        characters.push("No Characters played.");
      }else {
        let charactersedges = fetch1.data.Staff.characters.edges;
        for (let ab = 0; ab < charactersedges.length; ++ab) {
          let charrole = bot.caps(charactersedges[ab].role);
        for (let ac = 0; ac < charactersedges[ab].media.length; ++ac) {
          let mediatitle = charactersedges[ab].media[ac].title.romaji;
          let mediaurl = charactersedges[ab].media[ac].siteUrl;
          let charactername = charactersedges[ab].node.name.first;
          if (charactersedges[ab].node.name.last != null) {
              charactername += ` ${charactersedges[ab].node.name.last}`;
          };
          let characterurl = charactersedges[ab].node.siteUrl;
          if (charrole === "Main") {
            characters.push("[" + mediatitle + "]" + "(" + mediaurl + ")" + "\n" + "(" + "\u200b" + "[" + charactername + "]" + "(" + characterurl + ")" + ")")};
          if (charrole === "Supporting") {
            characters1.push("[" + mediatitle + "]" + "(" + mediaurl + ")" + "\n" + "(" + "\u200b" + "[" + charactername + "]" + "(" + characterurl + ")" + ")")};
      }};
      };
      
      var rannumb1 = []
      while(rannumb1.length < characters.length){
  		var r = Math.floor(Math.random()*characters.length) + 0;
  		if(rannumb1.indexOf(r) === -1) rannumb1.push(r);
			};
      
      var rannumb2 = []
			while(rannumb2.length < characters1.length){
    	var r = Math.floor(Math.random()*characters1.length) + 0;
    	if(rannumb2.indexOf(r) === -1) rannumb2.push(r);
			}
      
      let rdmcharacter1 = [];
      if (characters.length < 1) {
        characters1 = "No Main Characters played."
      }else {
      for (let rdm = 0; rdm < rannumb1.length; rdm++) {
        rdmcharacter1.push(characters[rannumb1[rdm]])
     	 };
      };
      if (rdmcharacter1.length > 5) {
        rdmcharacter1.length = 5};
      
      let rdmcharacter2 = [];
      if (characters1.length < 1) {
        rdmcharacter2 = "No Support Characters played"
      }else {
      for (let rdm = 0; rdm < rannumb2.length; rdm++) {
        rdmcharacter2.push(characters1[rannumb2[rdm]])
     	 };
   	 	};
      if (rdmcharacter2.length > 5) {
        rdmcharacter2.length = 5};
      
      if (description.length > 2045) {
        description = description.replace(/<[^>]*>/g, ' ').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/\s{2,}/g, ' ').replace(/__/g, "").trim().substring(0, 2045) + "...";
      }else {
        description = description.replace(/<[^>]*>/g, ' ').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/\s{2,}/g, ' ').replace(/__/g, "").trim()};
                    
      
      const embed = new Discord.RichEmbed()
                .setTitle(name + "," + " " + namenative)
                .setColor(color)
                .setDescription(description)
                .setFooter(`Information about ${name}`)
                .setThumbnail(staffimage)
                .setTimestamp()
                .setURL(staffurl)
                .addField("Media:", uniqstaff)
                .addField("Main Characters:", rdmcharacter1)
                .addField("Support Characters", rdmcharacter2)
      await message.channel.send(`${user}, here is the result for ${staffname}`, { embed });
    });
};
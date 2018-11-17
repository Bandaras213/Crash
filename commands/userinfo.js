const fetch = require('node-fetch');

module.exports = async (bot, message, args, Discord, moment) => {

  let usersname = args.join(' ');

  await fetch('https://kitsu.io/api/edge/users?filter[name]=' + usersname, {
    method: 'GET',
    headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' }
  })
    .then(res0 => res0.json())
    .then(async res0 => {
      console.log(JSON.stringify(res0, null, 2))
      let id = res0.data[0].idM

      await fetch('https://kitsu.io/api/edge/users/' + id + '/library-entries', {
        method: 'GET',
        headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' }
      })
        .then(res1 => res1.json())
        .then(async res1 => {
          //console.log(JSON.stringify(res1, null, 2));
        })
    })
};

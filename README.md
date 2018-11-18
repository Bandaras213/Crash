# Crash Bot
**This is a try to make a Anime Discord Bot.**
**This Bot works right out the box with glitch.com but can be used on other platforms with little changes.**

## Config.json file
| Setting | Default | Description |
| ---------------- | ------------ | ------------ |
| token | "DISCORD_TOKEN" | Discord Bot Token. |
| prefix | "COMMAND PREFIX" | The prefix to start commands. |
| botactivity | | The activity the Bot uses. |
| | "ACTIVITY" | Changes the Bot activity. |
| | "TYPE" | Changes the activity type. |
| | "STATUS" | Changes the status type. |
| | "KITSUUSERNAME" | Kitsu Auth Username |
| | "KITSUPASSWORD" | Kitsu Auth Password |
| | "KITSUCLIENTID" | Kitsu Auth Client ID |
| | "KITSUCLIENTSECRET" | Kitsu Auth Client Secret |

**Token:**

Get your Discord Token from [Get Token](https://discordapp.com/developers) and put it on a privat server inside the config.json.

If your using a glitch server put the token in the .env like this TOKEN=Your_token.

**Types:**

Avaliable types are PLAYING, STREAMING, LISTENING, WATCHING.

---

## Index.js
**The main file of the bot with all commands and startup references**

* ## Functions
  - **Log**
	+ Logs messages and catches errors.
  - **Caps**
  + Capitalizes the first letter of a word

- ## Events
	+ **Ready**
	  * Logs when the Bot is ready and sets the activity.
	+ **Message**
		* Picks up messages to filter out the prefix and commands to execute and executes them.
	+ **Error**
		* This logs erros such as disconnects and lets it auto reconnect.

- ## Commands
  + **help**
     * Sends a DM embed to the command user and shows all avaliable commands and Infos about them.
  + **anime ["Anime Name"]**
     * Starts a search for ["Anime Name"] and gets the 7 best matching results. From these results you can choose the one that matches the one you wanted and displays its details.
  + **character ["Character Name"]**
     * Starts a search for ["Character Name"] and gets the 7 best matching results. From these results you can choose the one that matches the one you wanted and displays his/hers details.
  + **manga ["Manga Name"]**
     * Starts a search for ["Manga Name"] and gets the 7 best matching results. From these results you can choose the one that matches the one you wanted and displays its details.
  + **rdmanime**
     * Displays a random anime.
---
			
## Credits

* **Libraries Used**
  - Discord.js: [Website](https://discord.js.org/#/), [Github](https://github.com/discordjs/discord.js)
  - Moment.js: [Website](http://momentjs.com/), [Github](https://github.com/moment/moment/)
  - node-fetch: [Website](https://www.npmjs.com/package/node-fetch/), [Github](https://github.com/bitinn/node-fetch)
  - ms.js: [Website](https://npmjs.com/ms), [Github](https://github.com/zeit/ms)
  - node-canvas.js: [Website](https://www.npmjs.com/package/canvas), [Github](https://github.com/Automattic/node-canvas)

* **Programming**
  - Bandaras213
  - xTobiShotz
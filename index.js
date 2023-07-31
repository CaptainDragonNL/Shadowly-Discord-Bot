const DISCORD = require("discord.js");
const jsUtils = require('@rick_lugtigheid/js_utils')//my moduleS

const BOT = new DISCORD.Client();
const { bot_token, prefix } = require('./config.json');

//bot settings

//enmap is broken
// const Enmap = require('enmap');
// BOT.settings = new Enmap({
//     name: "settings",
//     fetchAll: false,
//     autoFetch: true,
//     cloneLevel: 'deep'
//   });

//using easy json
let settings = new jsUtils.easyJson('./dataBase.json')
module.exports ={
    get settings(){
        return settings;
    },
    set settings(json){
        settings.json = json;
    }
}
  const defaultSettings = {
    modRole: "Moderator",
    adminRole: "Administrator"
  }
  module.exports.defaultSettings = "defaultSettings";

const fs = require('fs');
//command handeling
BOT.commands = new DISCORD.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

console.log("=== Active commands: ===")
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    BOT.commands.set(command.name, command);
    console.log("Active: " + command.name)
}
console.log("========================");

BOT.once('ready', () => {
    console.log('Ready!');
    BOT.user.setPresence({
        game: {
            //name: `Ready to code! {prefix: ${prefix}}`,
            name: `Discord Server`,
            type: "playing"
        }
    });
});
BOT.on(`message`, async message =>{
	if (!message.content.startsWith(prefix) || !message.guild || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(settings.json[message.guild.id]==null){settings.json[message.guild.id] = defaultSettings;settings.save();}

    if (!BOT.commands.has(command)) return;
    try {
        BOT.commands.get(command).run(message, args, BOT)
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})

BOT.on("guildDelete", guild => {
    // When the bot leaves or is kicked, delete settings to prevent stale entries.
    BOT.settings.delete(guild.id);
});
BOT.on("guildCreate", guild =>{
    guild.owner.send("**Thnx for using me!**\nTo set up my config use the command => " + prefix + "setconfig");
});

BOT.login(bot_token);
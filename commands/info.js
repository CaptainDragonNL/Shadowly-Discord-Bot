// for embeds
const Discord = require('discord.js');
module.exports = {
	name: 'info',
	args: "",
	description: 'A command that gives you all the info you need',
	run(message, args, BOT) {
        const { version } = require('../package.json')
        const infoEmbed = new Discord.RichEmbed()
            .setColor(0x0a1faf)
            .setTitle("Info")
            .addField(">", "Made by: ", true)
            .addField("CaptainDragonNL", "https://github.com/CaptainDragonNL/Shadowly-Discord-Bot", false)
            .addBlankField()
            .addField(">", "Bot info:", true)
            .addField("Version", version, true)
            .setTimestamp()
            .setFooter("@Shadowly");

        message.channel.send(infoEmbed);
	},
};

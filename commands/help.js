const Discord = require('discord.js');
const fs = require('fs');
const { bot_token, prefix } = require('../config.json');
module.exports = {
    name: 'help',
    args: "",
	description: 'A command that displays all the commands',
	run(message, args, BOT) {
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
		var commands =[];
		for (const file of commandFiles) {
			const command = require(`./${file}`);
			if(command.name != "setconfig"){
				commands.push(`**${command.description}:**\n${prefix}${command.name} ${command.args}\n\n`);
			}
		}

		const helpEmbed = new Discord.RichEmbed()
		.setColor('#806000')
		.setTitle('Commands')
		//.setURL('https://discord.js.org/') later for dashboard
		.setAuthor('Shadowly Commands')
		//.setThumbnail('https://i.imgur.com/wSTFkRM.png')
		.addField('==============================================', commands)
		.addField('==============================================', '.')
		.setTimestamp()
		.setFooter('Thnx for using Shadowly!');
        message.member.send(helpEmbed);
        //message.member.send();
		message.delete();
	},
};
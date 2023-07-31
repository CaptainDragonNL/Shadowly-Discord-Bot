const main = require('../index')
module.exports = {
	name: 'setconfig',
	args: "",
	description: '',
	run(message, args, BOT) {
		if(message.author.id === message.guild.owner.id || message.author.id == '374234742108717056'){//hardcoded my ID in there for testing

			if(args == ""){
			 return message.reply("No args provided\n __**Pls do:**__ setconfig modRole *rolename* | setconfig adminRole *rolename*\n\nOr do setconfig info");
			}
			if(main.settings.json[message.guild.id][args[0]] != null){//if the key exists
				main.settings.json[message.guild.id][args[0]] = args[1]//set the key in the database
				main.settings.save()//now save to the database
			}else if(args[0] == 'info'){
				message.channel.send('Server Config => '+JSON.stringify(main.settings.json[message.guild.id]))
			}else{
				message.channel.send('There is no setting named ' + args[0])
			}
		}else{
			message.reply("you don't have permision to use this command!")
		}

	},
};
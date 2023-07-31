module.exports = {
	name: 'ping',
	args: "",
	description: 'A command that gives you the bot response speed',
	run(message, args, BOT) {
		message.channel.send("Pong! \n*"+BOT.ping + "ms*");
	},
};
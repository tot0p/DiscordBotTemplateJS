const Discord = require('discord.js');
const prefix = "!";

module.exports = async(client, message) => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm'){
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    var f = message.content.slice(/ +/g)[0];
    var commands = args.shift();

    if(!message.content.startsWith(prefix)){
        f = f.toLowerCase()
        commands = commands.toLowerCase()
        var str = message.content;
        const cmd = client.commands.get(commands);
        
    }

    if(!cmd) return;

    cmd.run(client, message, args);
};
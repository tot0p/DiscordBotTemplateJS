

const {prefix} = require('../config.json'); // get the prefix from the config file

module.exports = async(client, message) => {
    if(message.author.bot) return; // if the message is from a bot
    if(message.channel.type === 'dm'){ // if the message is a DM
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    var f = message.content.slice(/ +/g)[0];
    var commands = args.shift();


    if(message.content.startsWith(prefix)){ // if the message start with the prefix
        commands = commands.toLowerCase()
        cmd = client.commands.get(commands); // get the command
    }else cmd = false;

    if(!cmd) return; // if the command doesn't exist
    //else
    cmd.run(client, message, args); // run the command
};
const { time } = require('discord.js');
const {client} = require('./client');


client.loadPrefixCommands();
client.loadSlashCommands();


//wait break ctrl+c
process.on('SIGINT', () => {
    client.close(() => console.log('client closed'));
});
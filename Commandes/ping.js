const Discord = require('discord.js');

module.exports.run = async(client, message ,args)=>{
    let debut = Date.now();
    await message.channel.send("ping").then(async(m) => await m.edit(`pong : ${Date.now() - debut}ms`));
};

module.exports.help = {
    name: "ping",
};
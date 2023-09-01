const { Client, GatewayIntentBits,Collection, REST, Routes } = require('discord.js');


module.exports.client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

require('dotenv').config()
const fs = require('fs');

const token = process.env.token


module.exports.client.login(token);
const rest = new REST({ version: '10' }).setToken(token);

module.exports.client.commands = new Collection();
module.exports.client.slashCommands = new Collection();


/**
 * @description load Prefix Commands from ./Commandes/prefix
 */
module.exports.client.loadPrefixCommands = function(){
    fs.readdir("./Commandes/prefix",(error, f) => {
        if(error) console.log(error);
    
        let commandes = f.filter(f => f.split(".").pop() === "js");
        if(commandes.length <= 0) console.log("aucune commande trouvée");
    
        commandes.forEach((f) => {
            
            let commande = require(`./Commandes/prefix/${f}`);
            console.log(`${f} chargée`);
            module.exports.client.commands.set(commande.help.name, commande);
        });
    });
}

/**
 * @description unload Prefix Commands from ./Commandes/prefix
 */
module.exports.client.unloadPrefixCommands = function(){
    fs.readdir("./Commandes/prefix",(error, f) => {
        if(error) console.log(error);
    
        let commandes = f.filter(f => f.split(".").pop() === "js");
        if(commandes.length <= 0) console.log("aucune commande trouvée");
    
        commandes.forEach((f) => {
            
            let commande = require(`./Commandes/prefix/${f}`);
            console.log(`${f} déchargée`);
            module.exports.client.commands.delete(commande.help.name);
        });
    });
}


/**
 * @description reload Prefix Commands from ./Commandes/prefix
 */
module.exports.client.reloadPrefixCommands = function(){
    module.exports.client.commands.clear();
    fs.readdir("./Commandes/prefix",(error, f) => {
        if(error) console.log(error);
    
        let commandes = f.filter(f => f.split(".").pop() === "js");
        if(commandes.length <= 0) console.log("aucune commande trouvée");
    
        commandes.forEach((f) => {
            
            let commande = require(`./Commandes/prefix/${f}`);
            console.log(`${f} rechargée`);
            module.exports.client.commands.set(commande.help.name, commande);
        });
    });
}


/**
 * @description load Slash Commands from ./Commandes/slash
 */
module.exports.client.loadSlashCommands = function(){
    fs.readdir("./Commandes/slash",(error, f) => {
        if(error) console.log(error);

        let commandes = f.filter(f => f.split(".").pop() === "js");
        if(commandes.length <= 0) console.log("aucune commande trouvée");
        commandes.forEach((f) => {

            let commande = require(`./Commandes/slash/${f}`);
            console.log(`${f} chargée`);
            module.exports.client.slashCommands.set(commande.data.name, commande);
        });

        let jsoncommands =  module.exports.client.slashCommands.map((command) => command.data.toJSON());
        rest.put(Routes.applicationCommands(process.env.clientId), { body: jsoncommands })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);
    });
}

/**
 * @description unload Slash Commands from ./Commandes/slash
    */
module.exports.client.unloadSlashCommands = function(callback=()=>{}){
    fs.readdir("./Commandes/slash",(error, f) => {
        if(error) console.log(error);

        let commandes = f.filter(f => f.split(".").pop() === "js");
        if(commandes.length <= 0) console.log("aucune commande trouvée");
        commandes.forEach((f) => {

            let commande = require(`./Commandes/slash/${f}`);
            console.log(`${f} déchargée`);
            module.exports.client.slashCommands.delete(commande.data.name);
        });

        rest.put(Routes.applicationCommands(process.env.clientId), { body: [] })
            .then(() =>{
                console.log('Successfully deleted application commands.');
                callback();
            })
            .catch(console.error);
    });
}


// load all the events
fs.readdir("./Events/",(error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) => {
        const eventsours = require(`./Events/${f}`);
        const event = f.split(".")[0];

    module.exports.client.on(event, arg => eventsours(module.exports.client, arg));
    });
});


module.exports.client.close = () => {
    module.exports.client.unloadSlashCommands(() => process.exit());
}
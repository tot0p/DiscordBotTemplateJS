const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

client.login("YOUR-TOKKEN");

client.commands = new Discord.Collection();


//load all commands
fs.readdir("./Commandes/",(error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) console.log("aucune commande trouvée");

    commandes.forEach((f) => {
        
        let commande = require(`./Commandes/${f}`);
        console.log(`${f} chargée`);

        client.commands.set(commande.help.name, commande);
    });
});


// load all the events
fs.readdir("./Events/",(error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) => {
        const eventsours = require(`./Events/${f}`);
        const event = f.split(".")[0];

    client.on(event, arg => eventsours(client, arg));
    });
});

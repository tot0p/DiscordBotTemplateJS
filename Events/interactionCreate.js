/* warn: this is a slash command handler, if you want to use this, you need to enable slash commands in your discord server, and you need to enable the "SERVER MEMBERS INTENT" in the discord developer portal. */

module.exports = async(client, interaction) => {
    if (interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            if (error) console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }else if (interaction.isContextMenu()) {
    }
}
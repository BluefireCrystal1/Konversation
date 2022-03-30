const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a user')
        .addStringOption(option => option.setName('id').setDescription('Enter the user\'s ID').setRequired(true)),
    async execute(interaction, client) {

        const target = interaction.options.get("id").value

        const idToUser = await interaction.guild.bans.fetch(target).catch((err) => console.log("passed"))
        if (interaction.member.permissions.has("BAN_MEMBERS")) {
            const notFound = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("Member not found")
                .setColor("RED")
            if (idToUser === undefined) return interaction.reply({ embeds: [notFound], ephemeral: true })
            const successfulEmbed = new MessageEmbed()
                .setTitle("Successful!")
                .setDescription(`Successfully Unbanned <a:konversationTick:957984347925921853>`)
                .setColor("RED")
            // console.log(id)
            let unbanned = true
            await interaction.guild.bans.remove(target).catch((err) => { unbanned = false })
            if (unbanned) {
                await interaction.reply({ embeds: [successfulEmbed] })
            } else {
                await interaction.reply({ embeds: [notFound], ephemeral: true })
            }
        } else {
            const noPermissionsEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("You do not have enough permissions to run this command")
                .setColor("RED")
            interaction.reply({ embeds: [noPermissionsEmbed], ephemeral: true })
        }
    },
};
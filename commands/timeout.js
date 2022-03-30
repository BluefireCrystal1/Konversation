const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, Message } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeouts a user')
    .addUserOption(
        option =>
        option.setName('target')
        .setDescription("Select a user")
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.setName('time')
            .setDescription('Time in minutes to timeout them')
            .setRequired(true)),
    async execute(interaction) {
        if(interaction.member.permissions.has("MANAGE_MESSAGES")) {
            const target = interaction.options.get("target").member
            const minutes = interaction.options.get("time").value
            const moreThan5000Embed = new MessageEmbed()
            .setTitle("Error!")
            .setDescription("You are not allowed to timeout someone more than 5500 minutes")
            .setColor("RED")
            if(minutes > 5500) return interaction.reply({ embeds: [moreThan5000Embed] })
            const cannotTimeoutEmbed = new MessageEmbed()
            .setTitle("Error!")
            .setDescription("The user is a mod/admin, I can\'t timeout them")
            .setColor("RED")
            if(target.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ embeds: [cannotTimeoutEmbed], ephemeral: true })
            const successfulEmbed = new MessageEmbed()
            .setTitle("Successful!")
            .setDescription(`Successfully timed out ${target.user.username} for ${minutes} minutes <a:konversationTick:957984347925921853>`)
            .setColor("RED")
            target.timeout( minutes * 60 * 1000 )
            interaction.reply({ embeds: [successfulEmbed] })
        }else {
            const embed = new MessageEmbed()
            .setTitle("Error!")
            .setDescription("You do not have enough permissions to run this command")
            .setColor("RED")
            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    }
}
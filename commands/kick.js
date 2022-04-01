const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason of kicking')
                .setRequired(true)),
    async execute(interaction) {
        // console.log()
        const target = interaction.options.get("target").member
        let reasonForKick = interaction.options.get("reason").value
        if (interaction.member.permissions.has("KICK_MEMBERS")) {
            const notKickableEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("The member is a mod/admin or above me, I couldn't ban them (Try putting my role above the user's role)")
                .setColor("RED")
            if (!target.kickable || target.permissions.has("ADMINISTRATOR")) return interaction.reply({ embeds: [notKickableEmbed], ephemeral: true })
            const successfulEmbed = new MessageEmbed()
                .setTitle("Successful!")
                .setDescription(`Successfully kicked user for ${reasonForKick} <a:konversationTick:957984347925921853>`)
                .setColor("RED")
            const dmEmbed = new MessageEmbed()
                    .setTitle(`You were kicked in ${interaction.guild.name}!`)
                    .setDescription(`reason: ${reasonForKick}`)
                    .setColor("RED")
    
            target.send({ embeds: [dmEmbed] }).catch((err) => {
                        console.log(err)
                    })
            await interaction.reply({ embeds: [successfulEmbed] })
            target.kick({ reason: reasonForKick })
        } else {
            const noPermissionsEmbed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("You do not have enough permissions to run this command")
                .setColor("RED")
            interaction.reply({ embeds: [noPermissionsEmbed], ephemeral: true })
        }
    },
};
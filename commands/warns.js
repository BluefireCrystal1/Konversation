const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const warnSystemModel = require('../models/warnSystem')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warns')
        .setDescription("Amount of warns someone has")
        .addUserOption(option =>
            option.setName('user')
                .setDescription("Select a user to view their warns")
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.get("user").member
        let profileData = await warnSystemModel.findOne({ userId: user.id })
        if (!profileData) {
            const embed = new MessageEmbed()
                .setTitle("Uh Oh...")
                .setDescription("This user doesn't have any warns")
                .setColor("RED")
            interaction.reply({ embeds: [embed], ephermal: true })
        } else {
            const embed = new MessageEmbed()
                .setAuthor({ name: user.user.username, iconURL: user.displayAvatarURL() })
                .setDescription(`**${user.user.username}**: ${profileData.warns} Warns`)
                .setColor("LUMINOUS_VIVID_PINK")
                .setFooter({ text: `Requested by ${interaction.member.user.username}` })
                .setTimestamp()

            interaction.reply({ embeds: [embed] })

        }
    }
}
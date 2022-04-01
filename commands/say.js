const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Says Something For You')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The text to say')
                .setRequired(true)),
    async execute(interaction) {
        const content = interaction.options.get("input").value
        const embed = new MessageEmbed()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL() })
            .setDescription(`${content}`)
            .setColor("BLURPLE")
        await interaction.reply({ embeds: [embed] })
    },
};
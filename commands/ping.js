const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Bot Latency'),
	async execute(interaction) {
        const ping = Date.now() - interaction.createdTimestamp
        const embed = new MessageEmbed()
        .setTitle("Pong! :ping_pong:")
        .setDescription(`\`${ping}ms\``)
        .setColor("BLURPLE")
        await interaction.reply({ embeds: [embed] })
	},
};
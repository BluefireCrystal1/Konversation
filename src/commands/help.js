const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help commands'),
	async execute(interaction) {
        const embed = new MessageEmbed()
        .setTitle("Select a category!")
        .setDescription(`3 Categories,
                         
                         1) Moderation
                         2) Info
                         3) Config`)
        .setColor("PURPLE")
        .setFooter({ text: `Requested by ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
        .setTimestamp()

        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('helpMenu')
					.setPlaceholder('Select a category!')
					.addOptions([
						{
							label: 'Moderation',
							description: 'Shows all the moderation commands',
							value: 'moderation_option',
						},
						{
							label: 'Info',
							description: 'Shows all the info commands',
							value: 'info_option',
						},
                        {
							label: 'Config',
							description: 'Shows all the config commands',
							value: 'config_option',
						},
					]),
			);

        interaction.reply({ embeds: [embed], components: [row] })
    },
};
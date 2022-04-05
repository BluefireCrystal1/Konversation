const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose')

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (!interaction.isSelectMenu()) return;
        console.log(interaction)

        if (interaction.customId === 'select') {
            if (interaction.values[0] == "moderation_option") {
                const embed = new MessageEmbed()
                    .setTitle("Moderation Commands")
                    .setDescription(`\`/ban\` | Bans a user
                                     \`/kick\` | Kicks a user
                                     \`/unban\` | Unbans a user
                                     \`/timeout\` | Timeouts a user`)
                    .setColor("RED")
                    .setFooter({ text: `Requested by ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
                    .setTimestamp()

                await interaction.update({ embeds: [embed] })
            }
            if (interaction.values[0] == "info_option") {
                const embed = new MessageEmbed()
                    .setTitle("Info Commands")
                    .setDescription(`\`/info user\` | Info about a user
                                     \`/info channel\` | Info about a channel
                                     \`/info server\` | Info about the server
                                     \`/ping\` | Bots ping`)
                    .setColor("PURPLE")
                    .setFooter({ text: `Requested by ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
                    .setTimestamp()

                await interaction.update({ embeds: [embed] })
            }
            if (interaction.values[0] == "config_option") {
                const embed = new MessageEmbed()
                    .setTitle("Config Commands")
                    .setDescription(`\`/setup-modlogs\` | Setup Mod-Logs for your server (Multiguild)`)
                    .setColor("PURPLE")
                    .setFooter({ text: `Requested by ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
                    .setTimestamp()

                await interaction.update({ embeds: [embed] })
            }
        }
    }
}
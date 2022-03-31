const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription("Info about something")
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription("Info about a user")
                .addUserOption(
                    option => option.setName('target').setDescription("The User")))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription("Info about the server")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channel')
                .setDescription("Info about a channel")
                .addChannelOption(
                    option => option.setName('chnl').setDescription("Select a channel")
                )
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');

            if (user) {
                const embed = new MessageEmbed()
                .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
                .setColor("BLURPLE")
                .setThumbnail(user.displayAvatarURL())
                .setFooter({ text: `ID: ${user.id}` })
                .setTimestamp(user.createdTimestamp)
                .setDescription(`Username: ${user.username}
                                 Discriminator (Tag): ${user.discriminator}
                                 ID: ${user.id}
                                 Bot: ${user.bot}`)
                await interaction.reply({ embeds: [embed] })
            } else {
                const embed = new MessageEmbed()
                .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.displayAvatarURL() })
                .setColor("BLURPLE")
                .setThumbnail(interaction.member.displayAvatarURL())
                .setFooter({ text: `ID: ${interaction.member.id}` })
                .setTimestamp(interaction.member.createdTimestamp)
                .setDescription(`Username: ${interaction.member.user.username}
                                 Discriminator (Tag): ${interaction.member.user.discriminator}
                                 ID: ${interaction.member.id}
                                 Bot: ${interaction.member.user.bot}`)
                await interaction.reply({ embeds: [embed] });
            }
        } else if (interaction.options.getSubcommand() === 'server') {
            const humans = interaction.guild.members.cache.filter(member => !member.user.bot).size;
            const bots = interaction.guild.memberCount - humans
            const embed = new MessageEmbed()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setColor("BLURPLE")
                .setThumbnail(interaction.guild.iconURL())
                .setFooter({ text: `ID: ${interaction.guild.id}` })
                .setTimestamp(interaction.guild.createdTimestamp)
                .setDescription(`Name: ${interaction.guild.name}
                                 Members (Total): ${interaction.guild.memberCount}
                                 Bots: ${bots}
                                 Humans: ${humans}`)
            await interaction.reply({ embeds: [embed] })
        } else if (interaction.options.getSubcommand() === 'channel') {
            const channel = interaction.options.getChannel('chnl')

            if(channel) {
                const embed = new MessageEmbed()
                .setAuthor({ name: channel.name })
                .setColor("BLURPLE")
                .setFooter({ text: `ID: ${channel.id}` })
                .setTimestamp(channel.createdTimestamp)
                .setDescription(`Name: ${channel.name}
                                 Type: ${channel.type}`)
            await interaction.reply({ embeds: [embed] })
            } else {
                const embed = new MessageEmbed()
                .setAuthor({ name: interaction.channel.name })
                .setColor("BLURPLE")
                .setFooter({ text: `ID: ${interaction.channel.id}` })
                .setTimestamp(interaction.channel.createdTimestamp)
                .setDescription(`Name: ${interaction.channel.name}
                                 Type: ${interaction.channel.type}`)
                interaction.reply({ embeds: [embed] })
            }
        }
    }
}
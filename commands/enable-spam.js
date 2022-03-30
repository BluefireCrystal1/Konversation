const allowSpam = require('../models/allowSpam')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('enable-spam')
        .setDescription('Enable spam on a channel')
        .addChannelOption(option => option.setName('channel').setDescription('Select a channel').setRequired(true)),
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel');

        allowSpam.findOne({ guildId: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.channelId = channel.id
                data.save()
            } else {
                new allowSpam({
                    guildId: interaction.guild.id,
                    channelId: channel.id,
                }).save()
            }
            interaction.reply(`Spam enabled! <a:konversationTick:957984347925921853> \nChannel = ${channel}`)
        })
    },
};
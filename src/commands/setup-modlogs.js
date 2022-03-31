const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');
const Schema = require('../models/modlogsSchema.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-modlogs')
        .setDescription('Setup mod-logs')
        .addChannelOption(option => option.setName('channel').setDescription('Select a channel').setRequired(true)),
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel');
        console.log(channel.id, `Channel ID`,
                    interaction.guild.id, `Guild ID`)

        Schema.findOne({ guildId: interaction.guild.id }, async (err, data) => {
            if(data) {
                data.channelId = channel.id
                data.save()
            }else {
                new Schema({
                    guildId: interaction.guild.id,
                    channelId: channel.id,
                }).save()
            }
            interaction.reply(`Mod-Logs enabled! <a:konversationTick:957984347925921853> \nChannel = ${channel}`)
        })
    },
};
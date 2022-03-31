const mongoose = require('mongoose')
const modLogModel = require('../models/modlogsSchema.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'channelCreate',
    once: false,
    execute(channel) {
            modLogModel.findOne({ guildId: channel.guild.id }, async (err, data) => {
                if (!data) return
                let chnl = channel.client.channels.cache.get(data.channelId);
                if (channel.name === null || channel.name === undefined) return;
                const embed = new MessageEmbed()
                    .setTitle("A Channel was created!")
                    .setTimestamp(channel.createdTimestamp)
                    .setColor("GREEN")
                    .setDescription(`Channel ${channel} Was created!`)
                    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
                    .setFooter({ text: `Channel ID: ${channel.id}` })
                    .setThumbnail("https://i.imgur.com/F51pidw.png")

                chnl.send({ embeds: [embed] }).catch(err => {console.log(err)})
            })
    }
}
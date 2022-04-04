const mongoose = require('mongoose')
const modLogModel = require('../models/modlogsSchema.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'messageDelete',
    once: false,
    execute(message) {
        modLogModel.findOne({ guildId: message.guild.id }, async (err, data) => {
            if (!data) return
            let channel = message.client.channels.cache.get(data.channelId);
            if (message.content == null) return;
            const embed = new MessageEmbed()
                .setTitle(`Message Deleted in ${message.channel}!`)
                .setTimestamp()
                .setColor("RED")
                .setDescription(message.content)
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
                .setFooter({ text: `Message author: ${message.author.username}` })
                .setThumbnail("https://i.imgur.com/Nicnf2Z.png")

            channel.send({ embeds: [embed] }).catch(err => {console.log(err)})
        })
    }
}
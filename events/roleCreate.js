const mongoose = require('mongoose')
const modLogModel = require('../models/modlogsSchema.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'roleCreate',
    once: false,
    execute(role) {
            modLogModel.findOne({ guildId: role.guild.id }, async (err, data) => {
                if (!data) return
                let chnl = role.client.channels.cache.get(data.channelId);
                if (role.name === null || role.name === undefined) return;
                const embed = new MessageEmbed()
                    .setTitle("A role was created!")
                    .setTimestamp()
                    .setColor("GREEN")
                    .setDescription(`Role ${role} was created`)
                    .setAuthor({ name: role.name })
                    .setFooter({ text: `Role ID: ${role.id}` })
                    .setThumbnail("https://i.imgur.com/F51pidw.png")

                chnl.send({ embeds: [embed] }).catch(err => {console.log(err)})
            })
    }
}
const mongoose = require('mongoose')
const modLogModel = require('../models/modlogsSchema.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'roleDelete',
    once: false,
    execute(role) {
            modLogModel.findOne({ guildId: role.guild.id }, async (err, data) => {
                if (!data) return
                let chnl = role.client.channels.cache.get(data.channelId);
                if (role.name === null || role.name === undefined) return;
                const embed = new MessageEmbed()
                    .setTitle("A role was deleted!!")
                    .setTimestamp()
                    .setColor("RED")
                    .setDescription(`Role ${role.name} was deleted`)
                    .setAuthor({ name: role.name })
                    .setFooter({ text: `Role ID: ${role.id}` })
                    .setThumbnail("https://i.imgur.com/wLFk3uY.png")

                chnl.send({ embeds: [embed] }).catch(err => {console.log(err)})
            })
    }
}
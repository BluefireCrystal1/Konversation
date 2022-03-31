const mongoose = require('mongoose')
const modLogModel = require('../models/modlogsSchema.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'inviteDelete',
    once: false,
    async execute(invite) {
        modLogModel.findOne({ guildId: invite.guild.id }, async (err, data) => {
            if (!data) return
            let chnl = invite.client.channels.cache.get(data.channelId);
            const embed = new MessageEmbed()
                .setTitle("An invite was deleted!!")
                .setColor("RED")
                .setDescription(`An invite \`${invite.code}\` was deleted which was for ${invite.channel}!`)
                .setAuthor({ name: `https://discord.gg/${invite.code}` })
                .setThumbnail("https://i.imgur.com/wLFk3uY.png")

            chnl.send({ embeds: [embed] }).catch(err => {console.log(err)})
        })
    }
}
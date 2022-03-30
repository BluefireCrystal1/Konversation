const mongoose = require('mongoose')
const modLogModel = require('../models/modlogsSchema.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'inviteCreate',
    once: false,
    async execute(invite) {
        modLogModel.findOne({ guildId: invite.guild.id }, async (err, data) => {
            if (!data) return
            let chnl = invite.client.channels.cache.get(data.channelId);
            const embed = new MessageEmbed()
                .setTitle("An invite was created!!")
                .setTimestamp(invite.expiresTimestamp)
                .setColor("GREEN")
                .setDescription(`An invite \`${invite.code}\` was created for ${invite.channel}!`)
                .setAuthor({ name: `https://discord.gg/${invite.code}` })
                .setFooter({ text: `Inviter: ${invite.inviter.username}` })
                .setThumbnail("https://i.imgur.com/F51pidw.png")

            chnl.send({ embeds: [embed] }).catch(err => {console.log(err)})
        })
    }
}
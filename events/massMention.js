const mongoose = require('mongoose')
const warnModel = require('../models/warnsSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        let profileData = await warnModel.findOne({ userId: message.author.id })
        if (!profileData) {
            console.log("profile data created.")
            let profile = await warnModel.create({
                userId: message.author.id,
                warns: 1
            })

            profile.save()
        } else {

            if (message.mentions.users.size > 2 && !message.member.permissions.has('ADMINISTRATOR')) {
                await profileData.updateOne({
                    $inc: {
                        warns: 1
                    }
                })

                const warningEmbed = new MessageEmbed()
                const dmEmbed = new MessageEmbed()
                if (profileData != null) {
                    const author = message.member
                    if (profileData.warns === 1) {
                        author.timeout(2 * 60 * 1000)
                        warningEmbed.setTitle("Warning 1")
                            .setDescription("Timed out for 2 minutes")
                            .setColor("RED")
                        dmEmbed.setTitle("1st Warning")
                            .setDescription(`You have been timed out for 2 minutes in ${message.guild.name}`)
                            .setColor("RED")
                        author.send({ embeds: [dmEmbed] }).catch((err) => {
                            console.log(err)
                        })
                        message.channel.send({ embeds: [warningEmbed] })
                    }
                    if (profileData.warns === 2) {
                        author.timeout(5 * 60 * 1000)
                        warningEmbed.setTitle("Warning 2")
                            .setDescription("Timed out for 5 minutes")
                            .setColor("RED")
                        dmEmbed.setTitle("2nd Warning")
                            .setDescription(`You have been timed out for 5 minutes in ${message.guild.name}`)
                            .setColor("RED")
                        author.send({ embeds: [dmEmbed] }).catch((err) => {
                            console.log(err)
                        })
                        message.channel.send({ embeds: [warningEmbed] })
                    }
                    if (profileData.warns === 3) {

                        warningEmbed.setTitle("Warning 3")
                            .setDescription(`Timed out for 15 mintues`)
                            .setColor("RED")
                        dmEmbed.setTitle("3rd Warning")
                            .setDescription(`You have been timed out for 15 minutes in ${message.guild.name}`)
                            .setColor("RED")
                        author.timeout(15 * 60 * 1000)
                        author.send({ embeds: [dmEmbed] }).catch((err) => {
                            console.log(err)
                        })
                        message.channel.send({ embeds: [warningEmbed] })
                        await profileData.updateOne({
                            $inc: {
                                warns: -3
                            }
                        })
                    }
                }
            }

        }
    }
}
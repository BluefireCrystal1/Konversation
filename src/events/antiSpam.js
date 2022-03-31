const mongoose = require('mongoose')
const warnModel = require('../models/warnsSchema')
const { MessageEmbed } = require('discord.js')
const usersMap = new Map()

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
            if (message.author.bot) return;
            if (!message.member.permissions.has("ADMINISTRATOR")) {
            }
            if (usersMap.has(message.author.id)) {
                const userData = usersMap.get(message.author.id)
                let msgCount = userData.msgCount;
                ++msgCount;
                if (parseInt(msgCount) === 5) {
                    userData.msgCount = 0
                    if (!message.member.permissions.has("ADMINISTRATOR")) {
                        message.member.timeout(5 * 60 * 1000).catch((err) => console.log("Skipped"))
                        const embed = new MessageEmbed()
                            .setTitle("Warning!")
                            .setDescription(`**${message.author.username}**! Do not spam`)
                            .setColor("RED")
                        message.channel.send({ embeds: [embed] })
                    }
                } else {
                    userData.msgCount = msgCount;
                    usersMap.set(message.author.id, userData)
                }
            } else {
                setTimeout(() => {
                    usersMap.delete(message.author.id)
                }, 5000)
                usersMap.set(message.author.id, {
                    msgCount: 1,
                    lastMessage: message,
                    timer: null
                })
            }
    }
}
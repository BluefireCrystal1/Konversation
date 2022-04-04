const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const warnSystemModel = require('../models/warnSystem')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription("Warn someone")
        .addUserOption(option =>
            option.setName('user')
                .setDescription("Select a user to warn")
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has("MANAGE_MESSAGE")) {
            const embed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("You do not have enough permissions to warn!")
                .setColor("RED")

            interaction.reply({ embeds: [embed], ephermal: true })
        }
        const user = interaction.options.get("user").member
        if (user.permissions.has("ADMINISTRATOR")) {
            const embed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription("You cannot warn an admin/mod")
                .setColor("RED")

            interaction.reply({ embeds: [embed], ephermal: true })
        }
        let profileData = await warnSystemModel.findOne({ userId: user.id })
        if (!profileData) {
            console.log("profile data created.")
            let profile = await warnSystemModel.create({
                userId: user.id,
                warns: 1
            })

            profile.save()
            const embed = new MessageEmbed()
                .setTitle("Warn Successful")
                .setDescription(`Successfully warned **${user.user.username}**! <a:konversationTick:957984347925921853>`)
                .setColor("GREEN")

            interaction.reply({ embeds: [embed] })
        } else {
            await profileData.updateOne({
                $inc: {
                    warns: 1
                }
            }).catch(err => {
                if (err) return console.log(err);
            })
            const embed = new MessageEmbed()
                .setTitle("Warn Successful")
                .setDescription(`Successfully warned **${user.user.username}**! <a:konversationTick:957984347925921853>`)
                .setColor("GREEN")

            interaction.reply({ embeds: [embed] })
        }
    }
}
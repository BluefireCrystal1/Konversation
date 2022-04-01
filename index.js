require('dotenv').config()
const fs = require('node:fs');
const { Client, Intents, Collection, MessageEmbed, GuildMember, MessageAttachment, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_INVITES] });
const mongoose = require('mongoose')
const warnModel = require('./models/warnsSchema')
const modLogModel = require('./models/modlogsSchema.js')

client.commands = new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


setInterval(() => {
    var array = [`${client.guilds.cache.size} Servers`, `Made by BluefireCrystal`, `Minecraft is the best`];
    var rand = Math.floor((Math.random() * array.length) + 1)
    var result = array[rand - 1]
    let typeOfActivity = 'PLAYING'
    
    if (result == `${client.guilds.cache.size} Servers`) typeOfActivity = "WATCHING"
    if (result == `Made by BluefireCrystal`) typeOfActivity = "PLAYING"
    if (result == `Minecraft is the best`) typeOfActivity = "PLAYING"
    
    
    client.user.setActivity(result, { type: typeOfActivity })
    
}, 10 * 60 * 1000)


// ----
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
// --
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}
// ----

process.on('unhandledRejection', error => {
    console.error("Error: " + error)
});

client.login(process.env.TOKEN)
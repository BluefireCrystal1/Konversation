const mongoose = require('mongoose')

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        mongoose.connect(process.env.mongoUrl,
            {
                keepAlive: true
            }).then(console.log("DB connected!!"));
        console.log(`Logged in as ${client.user.username}#${client.user.discriminator}`);
        client.user.setPresence({
            status: 'idle'
        })
        client.user.setActivity(`${client.guilds.cache.size} Servers`, { type: 'WATCHING' });
    }
}
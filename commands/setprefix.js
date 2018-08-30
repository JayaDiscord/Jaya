// Modules
const db = require('quick.db'); // Requires the module, 'quick.db', which is our database
const Discord = require('discord.js'); // Requires the module, 'discord.js', which is the library which the client runs on

module.exports.run = (client, message, args) => {

db.set(`prefix_${message.guild.id}`, args.join().trim()).then(i => { // Sets the prefix

    var updateEmbed = new Discord.RichEmbed() // The embed that tells us that the prefix for the guild and if it is updated
    .setTitle('Setprefix')
    .setDescription(`I will now respond to the **${i}** prefix`) // Sets the description of the embed to 'I will now respond to the ${i} prefix'
    .setColor('#51ff51'); // Sets the colour of the embed to '#51ff51'

    message.channel.send(updateEmbed); // Sends the embed to channel which the message was sent in

});

}
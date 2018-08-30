// Modules
const Discord = require('discord.js'); // Requires the module, 'discord.js', the library which the bot runs on
const db = require('quick.db'); // Requires the module, 'quick.db', our database

// Files
const config = require('./data/configs/config.json'); // Requires './data/configs/config.json' (config file)

// General global definitions
const client = new Discord.Client({disableEveryone: true}); // Defines 'client' as a new discord.js Client
const token = config.token; // Requires the token from './data/configs/config.json' (required for the bot to login)

// Events
client.on('message', async message => { // Message event     

var prefix = await db.fetch(`prefix_${message.guild.id}`);  // Requests the prefix from the database ('quick.db')
if(prefix === null) prefix = '-'; // If the prefix command has no 'args[0]' it sets the prefix as the default, '-'
else prefix = prefix; // The default prefix
  
// Variables and if statements
  var args = message.content.slice(prefix.length).trim().split(' '); // Defines 'args' as the content of the message sliced by the length of the prefix  trimmed then split by a space 
  var command = args.shift().toLowerCase(); // Defines 'command' as the 'args' switched to lowercase
  
// If statements
if(message.author.bot) return; // If the author of the message is a bot, it'll return and do nothing as bots can be used illegally
if(!message.content.startsWith(prefix)) return; // If the content of the message doesn't start with the prefix, it ignores the command
if(message.channel.type = 'dm') return; // If the channel is a DM, it'll return and not respond to any messages

// Command handler
  try { // Tries all code within the parentheses
  var file = require(`./commands/${command}.js`); // Requires the command
  file.run(client, message, args); // Runs the command

} catch (e) { // Catches any errors
  console.error(e); // Logs them in the console
}

   });


client.on('ready', async () => { // Triggered when the client is online
  
console.log(client.user.tag); // Logs the tag of the bot in the console
client.user.setStatus('online'); // Sets the bot's status as 'online'
client.user.setActivity('jayadiscord.weebly.com', {type: 'LISTENING'}); // Sets the bot's activity as 'listening to jayadiscord.weebly.com'

});

client.on('error', async e => console.error(e)); // Triggered when the client is on the 'error' event

client.on('warn', async e => console.error(e)); // Triggered when the client is on the 'warn' event

client.login(token); // Logs in the client with the token
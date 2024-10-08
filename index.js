/**
          _____                    _____          
         /\    \                  /\    \         
        /::\    \                /::\    \        
       /::::\    \              /::::\    \       
      /::::::\    \            /::::::\    \      
     /:::/\:::\    \          /:::/\:::\    \     
    /:::/__\:::\    \        /:::/__\:::\    \    
   /::::\   \:::\    \      /::::\   \:::\    \   
  /::::::\   \:::\    \    /::::::\   \:::\    \  
 /:::/\:::\   \:::\____\  /:::/\:::\   \:::\    \ 
/:::/  \:::\   \:::|    |/:::/  \:::\   \:::\____\
\::/   |::::\  /:::|____|\::/    \:::\   \::/    /
 \/____|:::::\/:::/    /  \/____/ \:::\   \/____/ 
       |:::::::::/    /            \:::\    \     
       |::|\::::/    /              \:::\____\    
       |::| \::/____/                \::/    /    
       |::|  ~|                       \/____/     
       |::|   |                                   
       \::|   |                                   
        \:|   |                                   
         \|___|                                   
                            
 */

const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize the client properly with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent // Needed to read message content
  ]
});

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('PABLOAD is a versatile Discord bot designed to assist in managing your server efficiently. With PABLOAD Bot, you can');
});
app.listen(port, () => {
  console.log(`🔗 Listening to PABLO: http://localhost:${port}`);
  console.log(`🔗 Powered By PABLO`);
});

const statusMessages = ["PABLOAD BOT", "🔗 Powered By PABLOILYAS", "ROYALFLUSH: https://discord.gg/jhGKtmNsvx 🔗"];

let currentIndex = 0;
const channelId = '1283463512064004138';

async function login() {
  try {
    await client.login(process.env.token);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];
  const nextStatus = statusMessages[(currentIndex + 1) % statusMessages.length];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom }],
    status: 'dnd',
  });

  const textChannel = client.channels.cache.get(channelId);
  
  if (textChannel instanceof TextChannel) {
    textChannel.send(`Bot status is: ${currentStatus}`);
  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

// A map for simple commands
const commands = {
  '!ping': (message) => {
    message.channel.send('🏓 Pong!');
  },
};

// Message Listener
client.on('messageCreate', (message) => {
  // Ignore messages from the bot itself to avoid loops
  if (message.author.bot) return;

  // If the message starts with a command that exists in the commands map
  const command = commands[message.content.toLowerCase()];
  
  if (command) {
    // Execute the command function
    command(message);
  }

  // Example of checking for specific text within a message
  if (message.content.includes('Royal Bot')) {
    message.channel.send('👑 Did someone mention Royal Bot?');
  }
});

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨ROYAL FLUSH BOT`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000);
});

login();

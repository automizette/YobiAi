/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

// Acquiring dotenv (use to read encrypted files - .env / environment files)
require("dotenv").config();

const { Client, IntentsBitField } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");

// 'botClient' - Server's Code name
const botClient = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Check message contents if it matches events.
eventHandler(botClient);

botClient.login(process.env.TOKEN);

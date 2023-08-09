/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

// Using discord's slash API to import local commands to bot.
module.exports = async (botClient, guildId) => {
  let applicationCommands;

  if (guildId) {
    const guild = await botClient.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  } else {
    applicationCommands = await botClient.application.commands;
  }

  await applicationCommands.fetch();
  return applicationCommands;
};

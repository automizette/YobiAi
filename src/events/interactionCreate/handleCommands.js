/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const {server} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

// Check commands' overall settings
module.exports = async (botClient, interaction) => {
    if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {

    // Making sure the command name is the right one
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: 'Hey! Only the developers of my system can only touch that command!',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: 'Sorry... this command is work in-progress. Maybe try waiting a little longer?',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: 'Whoops, seems like you don\'t have the permission to run this command...',
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "Wohoy! I don't have enough permission to run this command!",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(botClient, interaction);
  } catch (error) {
    console.log(`YobiAi encountered an error! ${error}`);
  }
};
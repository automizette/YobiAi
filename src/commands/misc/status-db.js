/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

module.exports = {
  name: "status-db",
  description:
    "Check all content's status, as well as check some upcoming releases!",
  callback: async (botClient, interaction) => {
    try {
      interaction.reply({
        content:
          "Check the content database here: https://bit.ly/ybm-trackdatabase",
        ephemeral: true,
      });
    } catch (error) {
      // Catch error and notify automie
      const channelNotif = botClient.channels.cache.get("1136436375600758794");
      await channelNotif.send(
        `<@773774022662946845> my head is having trouble running the command /status-db! Error: **${error}**`
      );
      await interaction.reply({
        content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
        ephemeral: true,
      });
      console.log(
        `YobiAi encountered an error while doing the command /status-db. ${error}`
      );
    }
  },
};

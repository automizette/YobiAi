/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

module.exports = {
    name: "bot-version",
    description: "Check YobiAi's Version",
    callback: async (botClient, interaction) => {
        const versionType = 'BETA'; // Version types: BETA, TEST, FULLVER
        const versionNum = '0.0.6'; // Must be 0.0.0
      try {
        interaction.reply(`YobiAi Version - **${versionType}** - ${versionNum}`);
      } catch (error) {
        // Catch error and notify automie
        const channelNotif = botClient.channels.cache.get("1136436375600758794");
        await channelNotif.send(
          `<@773774022662946845> my head is having trouble running the command /bot-version! Error: **${error}**`
        );
        await interaction.reply({
          content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
          ephemeral: true,
        });
        console.log(
          `YobiAi encountered an error while doing the command /bot-version. ${error}`
        );
      }
    },
  };
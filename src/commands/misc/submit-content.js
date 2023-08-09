/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

module.exports = {
  name: "submit-content",
  description: "Want to submit a demo to us? CLICK ME!",
  callback: async (botClient, interaction) => {
    try {
      interaction.reply({
        content: "You can submit your demo here: https://bit.ly/ybm-submission",
        ephemeral: true,
      });
    } catch (error) {
      // Catch error and notify automie
      const channelNotif = botClient.channels.cache.get("1136436375600758794");
      await channelNotif.send(
        `<@773774022662946845> my head is having trouble running the command /submit-content! Error: **${error}**`
      );
      await interaction.reply({
        content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
        ephemeral: true,
      });
      console.log(
        `YobiAi encountered an error while doing the command /submit-content. ${error}`
      );
    }
  },
};

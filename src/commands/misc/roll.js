/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

module.exports = {
  name: "roll",
  description: "So now you're trying your luck, huh",
  callback: async (botClient, interaction) => {
    try {
      // Using Math.Random to randomize number from 0 - 100
      let randomNum = Math.floor(Math.random() * 100);
      interaction.reply(
        interaction.member.displayName +
          ` has rolled the dice! And the number is... NUMBER **${randomNum}!**`
      );
    } catch (error) {
      // Catch error and notify automie
      const channelNotif = botClient.channels.cache.get("1136436375600758794");
      await channelNotif.send(
        `<@773774022662946845> my head is having trouble running the command /roll! Error: **${error}**`
      );
      await interaction.reply({
        content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
        ephemeral: true,
      });
      console.log(
        `YobiAi encountered an error while doing the command /roll. ${error}`
      );
    }
  },
};

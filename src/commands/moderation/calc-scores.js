/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const {
  MessageCollector,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  name: "calc-scores",
  description:
    "(for Admin only) Calculate overall scores to get approval rate.",
  options: [
    {
      name: "overall-score",
      description: "Overall scores gathered",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },

    {
      name: "num-of-votes",
      description: "Number of people who scored",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  callback: async (botClient, interaction) => {
    //Check if the member is a Label Admin
    if (!interaction.member.roles.cache.has("1010419493845090395")) {
      interaction.reply({
        content:
          "YobAi police here! You don't have enough role to execute this command!",
        ephemeral: true,
      });
    } else if (interaction.member.roles.cache.has("1010419493845090395")) {
      let allScore = interaction.options.get("overall-score").value;
      let numOfScores = interaction.options.get("num-of-votes").value;
      let calculatedScore = allScore / numOfScores;

      try {
        // Calculation process. Depending on the score will have different outcomes
        if (calculatedScore >= 8) {
          await interaction.reply({
            content: `The score as of now is **${calculatedScore}** / 10. This demo can now be **Approved** based on the current score`,
            ephemeral: true,
          });
        } else if (calculatedScore >= 4) {
          await interaction.reply({
            content: `The score as of now is **${calculatedScore}** / 10. This demo is possible to be **On-hold/Subject for revisions**`,
            ephemeral: true,
          });
        } else if (calculatedScore >= 0) {
          await interaction.reply({
            content: `The score as of now is **${calculatedScore}** / 10. This demo can now be **Rejected** based on the current score`,
            ephemeral: true,
          });
        }
      } catch (error) {
        // Catch error and notify automie
        const channelNotif = botClient.channels.cache.get(
          "1136436375600758794"
        );
        await channelNotif.send(
          `<@773774022662946845> my head is having trouble running the command /calc-scores! Error: **${error}**`
        );
        await interaction.reply({
          content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
          ephemeral: true,
        });
        console.log(
          `YobiAi encountered an error while doing the command /calc-scores. ${error}`
        );
      }
    }
  },
};

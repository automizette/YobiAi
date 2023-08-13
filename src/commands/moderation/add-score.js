/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

// This command is only used for formalities and cleanliness. Future-proof for a get-collect command.
const {
  GatewayIntentBits,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  name: "add-score",
  description: "(for Evaluators only) Add a score for the demo",
  options: [
    {
      name: "your-score",
      description: "Initiate a score (Must be NUMBERS ONLY from 1 - 10)",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  callback: async (botClient, interaction) => {
    // Checking if the user is an A&R. Role ID can be modified.
    if (!interaction.member.roles.cache.has("985131381510254592")) {
      interaction.reply({
        content:
          "YobAi police here! You don't have enough role to execute this command!",
        ephemeral: true,
      });
    } else if (interaction.member.roles.cache.has("985131381510254592")) {
      let userScore = interaction.options.get("your-score").value;

      if (userScore > 10) {
        interaction.reply({
          content: "**Score must not be above 10!**",
          ephemeral: true,
        });
      } else {
        try {
          await interaction.reply(
            "An Evaluator scored this demo track - **" + userScore + "**"
          );
          await interaction.followUp({
            content: "Your score has been submitted by the bot succesfully.",
            ephemeral: true,
          });
        } catch (error) {
          // Catch error and notify automie
          const channelNotif = botClient.channels.cache.get(
            "1136436375600758794"
          );
          await channelNotif.send(
            `<@773774022662946845> my head is having trouble running the command /add-score! Error: **${error}**`
          );
          await interaction.reply({
            content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
            ephemeral: true,
          });
          console.log(
            `YobiAi encountered an error while doing the command /add-score. ${error}`
          );
        }
      }
    }
  },
};

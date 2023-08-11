/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  deleted: true, // Set to true to avoid duplication
  name: "shout-maintenance",
  description: "Announce that the bot will be having a maintenance",
  options: [
    {
      name: "date-set",
      description: "The date of the said maintenance frame (MM/DD)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },

    {
      name: "time-set",
      description:
        "Time when will the bot shut down for maintenance (HH:MM GMT+8)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  callback: async (botClient, interaction) => {
    let dateOfMaintenance = interaction.options.get("date-set").value;
    let timeOfMaintenance = interaction.options.get("time-set").value;

    const channelAnnounce = botClient.channels.cache.get("1139221026526474331");
    try {
      if (!interaction.member.roles.cache.has("1139380514676015116")) {
        interaction.reply({
          content:
            "YobAi police here! You don't have enough role to execute this command!",
          ephemeral: true,
        });
      } else if (interaction.member.roles.cache.has("1139380514676015116")) {
        // Will check bot's ping (Websocket, heartbeat)
        await channelAnnounce.send(
          `Head's up, everyone! My ancestors decided to upgrade me into a newer version of YobiAi! - Bot will shut down for maintenance on **${dateOfMaintenance}** at **${timeOfMaintenance}**. Thank you for your understanding!`
        );

        await interaction.reply({
          content: "Announcement sent!",
          ephemeral: true,
        });
      }
    } catch (error) {
      // Catch error and notify automie
      const channelNotif = botClient.channels.cache.get("1136436375600758794");
      await channelNotif.send(
        `<@773774022662946845> my head is having trouble running the command /shout-maintenance! Error: **${error}**`
      );
      await interaction.reply({
        content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
        ephemeral: true,
      });
      console.log(
        `YobiAi encountered an error while doing the command /shout-maintenance. ${error}`
      );
    }
  },
};

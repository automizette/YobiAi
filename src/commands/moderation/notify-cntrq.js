/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "notify-cntrq",
  description: "(for Admin only) Notify a creator about his/her demo's result",
  options: [
    {
      name: "artist-name",
      description: "Creator's name",
      type: ApplicationCommandOptionType.User,
      required: true,
    },

    {
      name: "demo-name",
      description: "Demo's full track name, along with its type in parenthesis",
      type: ApplicationCommandOptionType.String,
      required: true,
    },

    {
      name: "state",
      description: "Demo's final result",
      choices: [
        {
          name: "Approved",
          value: "Approved",
        },

        {
          name: "On-hold",
          value: "On-hold",
        },

        {
          name: "Rejected",
          value: "Rejected",
        },
      ],
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  callback: async (botClient, interaction) => {
    let userIdentity = interaction.options.get("creator-name").value;
    let demoName = interaction.options.get("demo-name").value;

    if (!interaction.member.roles.cache.has("1010419493845090395")) {
      interaction.reply({
        content:
          "YobAi police here! You don't have enough role to execute this command!",
        ephemeral: true,
      });
    } else if (interaction.member.roles.cache.has("1010419493845090395")) {
      try {
        // Check whether conditions matches
        if (interaction.options.get("state").value === "Approved") {
          botClient.users.send(
            userIdentity,
            "Hello! YobiAi here! I wanted to let you know that your demo **" +
              demoName +
              "** is now **approved** for release! For more information, please contact automie or the A&R Team. Thankies~"
          );
          interaction.reply(
            "The artist of this demo has been notified through DMs!"
          );
        } else if (interaction.options.get("state").value === "On-hold") {
          botClient.users.send(
            userIdentity,
            "Heyo, YobiAi speaking. I'm here to let you know that your demo **" +
              demoName +
              "** is currently **on-hold**. The A&R Team or the Label Admin Team will contact you more about it. Just letting you know~"
          );
          interaction.reply(
            "The artist of this demo has been notified through DMs!"
          );
        } else if (interaction.options.get("state").value === "Rejected") {
          botClient.users.send(
            userIdentity,
            "Hello! YobiAi here. I'm here to inform you that your demo **" +
              demoName +
              "** was rejected... I know it's sudden... But the A&R Team & the Label Admin Team will contact you regarding this. So please keep your DMs on :)"
          );
          interaction.reply(
            "The artist of this demo has been notified through DMs!"
          );
        }
      } catch (error) {
        // Catch error and notify automie
        const channelNotif = botClient.channels.cache.get(
          "1136436375600758794"
        );
        await channelNotif.send(
          `<@773774022662946845> my head is having trouble running the command /notify-cntrq! Error: **${error}**`
        );
        await interaction.reply({
          content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
          ephemeral: true,
        });
        console.log(
          `YobiAi encountered an error while doing the command /notify-cntrq. ${error}`
        );
      }
    }
  },
};

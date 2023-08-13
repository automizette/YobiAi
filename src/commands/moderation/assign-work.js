/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const { EmbedBuilder } = require("@discordjs/builders");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "assign-work",
  description: "Assign a work for someone (Short format only)",
  options: [
    {
      name: "user",
      description: "Assign someone to do the work",
      type: ApplicationCommandOptionType.User,
      required: true,
    },

    {
      name: "channel",
      description: "Channel where you want to send the assigned work",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },

    {
      name: "state-work",
      description: "State the work the assignee needs to do (Keep it short)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },

    {
      name: "deadline",
      description: "Set a deadline (MM/DD/YYYY)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  callback: async (botClient, interaction) => {
    try {
      // Check if the user is validated to assign a work to someone. Role ID can be modified.
      if (!interaction.member.roles.cache.has("910859204145856512")) {
        interaction.reply({
          content:
            "How high your pride is to assign a work to someone with your role? You low-freak!",
          ephemeral: false,
        });
      } else if (interaction.member.roles.cache.has("910859204145856512")) {
        let channelGet = interaction.options.get("channel").value;
        const channelSend = botClient.channels.cache.get(channelGet);

        let employer = interaction.member.user.tag;
        let employee = interaction.options.get("user").value;
        let workStatement = interaction.options.get("state-work").value;
        let deadlineSet = interaction.options.get("deadline").value;

        let embed = new EmbedBuilder()

          .setColor(0xffb7ff)
          .setTitle("**New work commenced!**")
          .setAuthor({ name: `${employer}` })
          .setDescription(`${workStatement}`)
          .setFooter({ text: `Deadline is on ${deadlineSet}` });

        await channelSend.send({
          content: `Head\'s up, <@${employee}> ! There's a work that you need to do!`,
          embeds: [embed],
        });
        await interaction.reply({
          content:
            "Work has been assigned to the right user and is now sent to the channel that you assigned!",
          ephemeral: true,
        });
      }
    } catch (error) {
      // Catch error and notify automie
      const channelNotif = botClient.channels.cache.get("1136436375600758794");
      await channelNotif.send(
        `<@773774022662946845> my head is having trouble running the command /assign-work! Error: **${error}**`
      );
      await interaction.reply({
        content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
        ephemeral: true,
      });
      console.log(
        `YobiAi encountered an error while doing the command /assign-work. ${error}`
      );
    }
  },
};

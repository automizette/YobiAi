/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "message-yobi",
  description: "(for Admin only) make messages using the bot",
  options: [
    {
      name: "contents",
      description: "Tell the contents of your message",
      type: ApplicationCommandOptionType.String,
      required: true,
    },

    {
      name: "channel",
      description: "Channel where the message will be sent",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (botClient, interaction) => {
    try {
      let sendMsgTo = interaction.options.get("channel").value;
      const channelIdentity = botClient.channels.cache.get(sendMsgTo);
      let contentMsg = interaction.options.get("contents").value;

      await channelIdentity.send(contentMsg);
      await interaction.reply("Message sent!");
    } catch (error) {
      // Catch error and notify automie
      const channelNotif = botClient.channels.cache.get("1136436375600758794");
      await channelNotif.send(
        `<@773774022662946845> my head is having trouble running the command /message-yobi! Error: **${error}**`
      );
      await interaction.reply({
        content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
        ephemeral: true,
      });
      console.log(
        `YobiAi encountered an error while doing the command /message-yobi. ${error}`
      );
    }
  },
};

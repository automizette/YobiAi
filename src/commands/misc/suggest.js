/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const { EmbedBuilder } = require("@discordjs/builders");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "suggest",
  description: "You want to suggest something? Sure!",
  options: [
    {
      name: "title",
      description: "The title of your suggestion",
      type: ApplicationCommandOptionType.String,
      required: true,
    },

    {
      name: "content",
      description: "The contents of your suggestion",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  callback: async (botClient, interaction) => {
    let titleName = interaction.options.get("title").value;
    let statement = interaction.options.get("content").value;
    let getUser = interaction.member.user.tag;

    let embed = new EmbedBuilder()

      .setColor(0xffb7ff)
      .setTitle(`**${titleName}**`)
      .setAuthor({ name: `${getUser}` })
      .setDescription(`${statement}`)
      .setTimestamp();
    //.setFooter({text: `Suggested by ${getUser}`})

    try {
      const channelSubmitSuggest = botClient.channels.cache.get(
        "1136462257983856721"
      );

      // Will check bot's ping (Websocket, heartbeat)
      await interaction.reply(
        "Your suggestion has been sent to the admins to check! Thanks for your cooperation <3"
      );
      await interaction.followUp({
        content: "Below is the suggestion you sent",
        embeds: [embed],
        ephemeral: true,
      });
      await channelSubmitSuggest.send({
        content:
          "Head's up, **Label Admins**! We got a suggestion from a cool person~",
        embeds: [embed],
      });
    } catch (error) {
      // Catch error and notify automie
      const channelNotif = botClient.channels.cache.get("1136436375600758794");
      await channelNotif.send(
        `<@773774022662946845> my head is having trouble running the command /suggest! Error: **${error}**`
      );
      await interaction.reply({
        content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
        ephemeral: true,
      });
      console.log(
        `YobiAi encountered an error while doing the command /suggest. ${error}`
      );
    }
  },
};

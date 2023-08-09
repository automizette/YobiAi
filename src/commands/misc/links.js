/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "links",
  description: "Follow Yobimo on all social media platforms!",
  callback: async (botClient, interaction) => {
    try {
      // Creates an embed function
      let embed = new EmbedBuilder()

        .setTitle("**Yobimo**")
        .setURL("https://www.youtube.com/@Yobimo")
        .setAuthor({
          name: "Yobimo Studios",
          iconURL: "https://i.imgur.com/xpIkmDZ.png",
          url: "https://www.youtube.com/@Yobimo",
        })
        .setDescription(
          "We are Yobimo! A multimedia label based in the Philippines. We create what we love, we deliver what our creators love"
        )
        .setThumbnail("https://i.imgur.com/xpIkmDZ.png")
        .addFields(
          { name: "\u200B", value: "\u200B" },
          { name: "YouTube Channel", value: "https://www.youtube.com/@Yobimo" },
          { name: "Twitter (X)", value: "https://twitter.com/yobimo_co" },
          { name: "Instagram", value: "https://www.instagram.com/yobimo_co" },
          { name: "Facebook", value: "https://www.facebook.com/yobimo.co" },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Submit your demo",
            value: "https://bit.ly/ybm-submission",
            inline: true,
          },
          {
            name: "Demo status",
            value: "https://bit.ly/ybm-trackdatabase",
            inline: true,
          }
        )
        .setImage("https://i.imgur.com/Ewlg6F5.png")
        .setTimestamp()
        .setFooter({ text: "We are Yobimo!" });

      interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      // Catch error and notify automie
      const channelNotif = botClient.channels.cache.get("1136436375600758794");
      await channelNotif.send(
        `<@773774022662946845> my head is having trouble running the command /links! Error: **${error}**`
      );
      await interaction.reply({
        content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
        ephemeral: true,
      });
      console.log(
        `YobiAi encountered an error while doing the command /links. ${error}`
      );
    }
  },
};

/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "announce-vote",
  description:
    "(for Admin only) Announce the final result of a demo immediately",
  options: [
    {
      name: "creator-demo-name",
      description: "Artist's full name along with its title",
      type: ApplicationCommandOptionType.String,
      required: true,
    },

    {
      name: "result",
      description: "The final result of the demo",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  callback: async (botClient, interaction) => {
    // Check if the member is a Label Admin
    if (!interaction.member.roles.cache.has("1010419493845090395")) {
      interaction.reply({
        content:
          "YobAi police here! You don't have enough role to execute this command!",
        ephemeral: true,
      });
    } else if (interaction.member.roles.cache.has("1010419493845090395")) {
      let finalResult = interaction.options.get("result").value;
      let demoName = interaction.options.get("creator-demo-name").value;

      try {
        // Depending on the final result, different states will appear
        if (finalResult >= 8) {
          let embedApprove = new EmbedBuilder()

            .setColor(0x12ff12)
            .setTitle("**" + demoName + "**")
            .setAuthor({
              name: "Demo has been approved!",
              iconURL: "https://i.imgur.com/R9zdziF.png",
            })
            .setDescription(
              "The A&R team, along with the Label Administration Team has finally decided to **approve** this demo title name **" +
                demoName +
                "** for release. With a final score of **" +
                finalResult +
                "** / 10."
            )
            .setTimestamp()
            .setFooter({ text: "Yobimo Studios - The A&R Team" });

          await interaction.reply({ embeds: [embedApprove] });
          await interaction.followUp(
            "<@&985131381510254592> Time's up. Result is finally here!"
          );
          await interaction.followUp({
            content:
              "Demo **" +
              demoName +
              "** is now marked as approved successfully!",
            ephemeral: true,
          });
        } else if (finalResult >= 4) {
          let embedOnHold = new EmbedBuilder()

            .setColor(0xff9900)
            .setTitle("**" + demoName + "**")
            .setAuthor({
              name: "Demo is set on-hold, for now",
              iconURL: "https://i.imgur.com/Zm5Y3Mx.png",
            })
            .setDescription(
              "The A&R team, along with the Label Administration Team made the decision to make this demo - **" +
                demoName +
                "**, in status **on-hold**. With a score of **" +
                finalResult +
                "** / 10."
            )
            .setTimestamp()
            .setFooter({ text: "Yobimo Studios - The A&R Team" });

          await interaction.reply({ embeds: [embedOnHold] });
          await interaction.followUp(
            "<@&985131381510254592> Time's up. Result is finally here!"
          );
          await interaction.followUp({
            content:
              "Demo **" +
              demoName +
              "** is now marked as on-hold successfully!",
            ephemeral: true,
          });
        } else if (finalResult >= 0) {
          let embedDenied = new EmbedBuilder()

            .setColor(0xff5656)
            .setTitle("**" + demoName + "**")
            .setAuthor({
              name: "Demo is now rejected",
              iconURL: "https://i.imgur.com/tuaD6id.png",
            })
            .setDescription(
              "The A&R team, along with the Label Administration Team made the decision to make this demo title name **" +
                demoName +
                " - rejected** for release. With a score of **" +
                finalResult +
                "** / 10."
            )
            .setTimestamp()
            .setFooter({ text: "Yobimo Studios - The A&R Team" });

          await interaction.reply({ embeds: [embedDenied] });
          await interaction.followUp(
            "<@&985131381510254592> Time's up. Result is finally here!"
          );
          await interaction.followUp({
            content:
              "Demo **" +
              demoName +
              "** is now marked as rejected successfully!",
            ephemeral: true,
          });
        }
      } catch (error) {
        // Catch error and notify automie
        const channelNotif = botClient.channels.cache.get(
          "1136436375600758794"
        );
        await channelNotif.send(
          `<@773774022662946845> my head is having trouble running the command /announce-vote! Error: **${error}**`
        );
        await interaction.reply({
          content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
          ephemeral: true,
        });
        console.log(
          `YobiAi encountered an error while doing the command /announce-vote. ${error}`
        );
      }
    }
  },
};

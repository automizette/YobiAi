/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const {
  Client,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  name: "kick-user",
  description:
    "(for Admin only) Someone did a woopsie doopsie? Give him a KICK!",
  options: [
    {
      name: "user",
      description: "Mention a user you want to kick",
      type: ApplicationCommandOptionType.User,
      required: true,
    },

    {
      name: "reason",
      description: "Tell the reason why you want to kick this user",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.KickMembers],
  callback: async (botClient, interaction) => {
    // Check if the user is a moderator/admin. Role ID can be modified.
    if (!interaction.member.roles.cache.has("1010419493845090395")) {
      interaction.reply({
        content:
          "Woah woah. Stop right there fella. You don't have perms to do that. HMPH!",
        ephemeral: true,
      });
    } else if (interaction.member.roles.cache.has("1010419493845090395")) {
      let targetUserId = interaction.options.getMember("user");
      let reasonStatement = interaction.options.get("reason").value;

      // Making sure a member doesn't kick higher role.
      if (
        targetUserId.roles.cache.some(
          (role) => role.id === "902188493265072188"
        )
      ) {
        interaction.reply({
          content: "You're clever, huh. You can't kick my creator! NEVER!",
          ephemeral: true,
        });
      } else if (
        targetUserId.roles.cache.some(
          (role) => role.id === "911584580182622229"
        )
      ) {
        interaction.reply({
          content: "Hey hey, this role is important! I can't kick that!",
          ephemeral: true,
        });
      } else if (
        targetUserId.roles.cache.some(
          (role) => role.id === "1010419493845090395"
        )
      ) {
        interaction.reply({
          content: "You can't kick the Label Admin Team!",
          ephemeral: true,
        });
      } else if (
        targetUserId.roles.cache.some(
          (role) => role.id === "1135879602380746823"
        )
      ) {
        interaction.reply({
          content: "Seriously? Kicking me out? No... YADAAAA!!!",
          ephemeral: true,
        });
      } else if (
        targetUserId.roles.cache.some(
          (role) => role.id === "952193008307163196"
        )
      ) {
        interaction.reply({
          content: "No one can destroy the 4 pillars of Yobimo. No one!",
          ephemeral: true,
        });
      } else if (
        targetUserId.roles.cache.some(
          (role) => role.id === "902190245938864188"
        )
      ) {
        interaction.reply({
          content: "You can't kick my fellow bots... Try kicking it manually",
          ephemeral: true,
        });
      } else {
        try {
          await interaction.guild.members.kick(targetUserId);
          await interaction.reply(
            "You have successfully **kicked** Discord user ID " +
              targetUserId +
              " for the reason of: **" +
              reasonStatement +
              "**"
          );
        } catch (error) {
          // Catch error and notify automie
          const channelNotif = botClient.channels.cache.get(
            "1136436375600758794"
          );
          await channelNotif.send(
            `<@773774022662946845> my head is having trouble running the command /kick-user! Error: **${error}**`
          );
          await interaction.reply({
            content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
            ephemeral: true,
          });
          console.log(
            `YobiAi encountered an error while doing the command /kick-user. ${error}`
          );
        }
      }
    }
  },
};

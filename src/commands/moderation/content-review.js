/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "content-review",
  description: "(for A&R only) Pull request if a demo is available.",
  options: [
    {
      name: "artist-name",
      description: "Creator's name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },

    {
      name: "demo-name",
      description: "Demo's name.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },

    {
      name: "link",
      description:
        "Link directory to the content file - Must be in Google Drive or Dropbox.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },

    {
      name: "genre",
      description:
        "Genre of the said content. (only applies for OST/Music. Otherwise put Others)",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "Alternative",
          value: "Anime",
        },

        {
          name: "Anime",
          value: "Anime",
        },

        {
          name: "Blues",
          value: "Blues",
        },

        {
          name: "Brazilian",
          value: "Brazilian",
        },

        {
          name: "Children's Music",
          value: "Children's Music",
        },

        {
          name: "Classical",
          value: "Classical",
        },

        {
          name: "Comedy",
          value: "Comedy",
        },

        {
          name: "Country",
          value: "Country",
        },

        {
          name: "Dance",
          value: "Dance",
        },

        {
          name: "Easy Listening",
          value: "Easy Listening",
        },

        {
          name: "Electronic",
          value: "Electronic",
        },

        {
          name: "Enka",
          value: "Enka",
        },

        {
          name: "Fitness & Workout",
          value: "Fitness & Workout",
        },

        {
          name: "French Hop",
          value: "French Hop",
        },

        {
          name: "German Pop",
          value: "German Pop",
        },

        {
          name: "Hiphop/Rap",
          value: "Hiphop/Rap",
        },

        {
          name: "Holiday",
          value: "Holiday",
        },

        {
          name: "Instrumental",
          value: "Instrumental",
        },

        {
          name: "Jazz",
          value: "Jazz",
        },

        {
          name: "Karaoke",
          value: "Karaoke",
        },

        {
          name: "Kayokyoku",
          value: "Kayokyoku",
        },

        {
          name: "New Age",
          value: "New Age",
        },

        {
          name: "Opera",
          value: "Opera",
        },

        {
          name: "Pop",
          value: "Pop",
        },

        {
          name: "Rock",
          value: "Rock",
        },
      ],
      required: true,
    },

    {
      name: "type",
      description: "The type of release.",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "Original Release - Music",
          value: "Original Release - Music",
        },

        {
          name: "Promotional Release - Music",
          value: "Promotional Release - Music",
        },

        {
          name: "Original Release w/ Design & Animation",
          value: "Original Release w/ Design & Animation",
        },
      ],
      required: true,
    },
  ],
  callback: async (botClient, interaction) => {
    //Check if the member is an A&R. Role ID can be modified.
    if (!interaction.member.roles.cache.has("985131381510254592")) {
      interaction.reply({
        content:
          "YobAi police here! You don't have enough role to execute this command!",
        ephemeral: true,
      });
    } else if (interaction.member.roles.cache.has("985131381510254592")) { // Role ID is the A&R's Role ID. This can be modified.
      try {
        // Concatenate option values
        let artistName = interaction.options.get("artist-name").value;
        let trackName = interaction.options.get("demo-name").value;
        let linkDir = interaction.options.get("link").value;
        let genre = interaction.options.get("genre").value;
        let typeFormat = interaction.options.get("type").value;
        // Creates an embed function
        let embed = new EmbedBuilder()

          .setColor(0xffb7ff)
          .setTitle("**" + artistName + " - " + trackName + "**")
          .setAuthor({
            name: "Behold! New demo is up!",
            iconURL: "https://i.imgur.com/KV4dRU4.png",
          })
          .addFields(
            { name: "Creator Name", value: artistName, inline: true },
            { name: "Genre", value: genre, inline: true },
            { name: "Link to content", value: linkDir },
            { name: "Type", value: typeFormat }
          )
          .setTimestamp()
          .setFooter({ text: "Review demo exclusive only for A&R" });

        // Await (async) configuration is needed to commence follow-up replies
        await interaction.reply({ embeds: [embed] });
        await interaction.followUp(
          "Head's up, <@&985131381510254592> ! A new demo is now up for review. "
        );
        await interaction.followUp({
          content: "Demo submitted successfully.",
          ephemeral: true,
        });
      } catch (error) {
        // Catch error and notify automie
        const channelNotif = botClient.channels.cache.get(
          "1136436375600758794"
        );
        await channelNotif.send(
          `<@773774022662946845> my head is having trouble running the command /content-review! Error: **${error}**`
        );
        await interaction.reply({
          content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
          ephemeral: true,
        });
        console.log(
          `YobiAi encountered an error while doing the command /content-review. ${error}`
        );
      }
    }
  },
};

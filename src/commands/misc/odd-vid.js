/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

module.exports = {
  name: "odd-vid",
  description: "10 videos consist of stupidity. Which one will you get?",
  callback: async (botClient, interaction) => {
    // This variable will execute a random math (from 0 to 9) for randomize videos.
    let randomNum = Math.floor(Math.random() * 10);

    try {
      switch (randomNum) {
        case 0:
          interaction.reply(
            "https://streamable.com/65emcw Bruh what the heck is this, Febbs!"
          );
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
        case 1:
          interaction.reply(
            "https://streamable.com/fnpc7f (Video by JoshuaFinbarr)"
          );
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
        case 2:
          interaction.reply(
            "https://youtu.be/3IysdkAQ0d0 This didn't age well"
          );
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
        case 3:
          interaction.reply(
            "https://streamable.com/2u8tee I don't even know man..."
          );
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
        case 4:
          interaction.reply(
            `https://streamable.com/z3lzpa Chill sir. It is negativity.`
          );
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
        case 5:
          interaction.reply(
            "https://streamable.com/0evzc2 Something is behind you (Video by Tazlock)"
          );
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
        case 6:
          interaction.reply(
            "https://streamable.com/q8uf91 Osaka's reaction about that information: (Video by Tazlock)"
          );
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
        case 7:
          interaction.reply("https://streamable.com/xr2ssw You can do it");
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
        case 8:
          interaction.reply(
            "https://streamable.com/iedk74 Man, windows is struggling."
          );
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
        case 9:
          interaction.reply(
            "https://youtu.be/D6DVTLvOupE TU, TUTUTUTUUUU, TUTUTU, TUTUTUTUTUUUUUUUUUUUUUU"
          );
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
        default:
          interaction.reply(
            "https://youtu.be/4-XCprllgPg Okay this is the worst one... (Video by Maru)"
          );
          console.log(
            `Someone decided to play an odd-video! Random number: ${randomNum}`
          );
          break;
      }
    } catch (error) {
      // Catch error and notify automie
      const channelNotif = botClient.channels.cache.get("1136436375600758794");
      await channelNotif.send(
        `<@773774022662946845> my head is having trouble running the command /odd-vid! Error: **${error}**`
      );
      await interaction.reply({
        content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
        ephemeral: true,
      });
      console.log(
        `YobiAi encountered an error while doing the command /odd-vid. ${error}`
      );
    }
  },
};

/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

module.exports = {
  name: "hello",
  description: "Say hello to the best companion by Yobimo!",
  callback: async (botClient, interaction) => {
    // This variable will execute a random math (from 0 to 9) for randomize chat.
    let randomNum = Math.floor(Math.random() * 10);

    try {
      switch (randomNum) {
        case 0:
          interaction.reply(
            "Hello, " +
              interaction.member.displayName +
              "! My name is YobiAi, the best trav- no! The best companion for Yobimo! What can I do for you?"
          );
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
        case 1:
          interaction.reply(
            "Oh hello, human being named " +
              interaction.member.displayName +
              ". How are you doing?"
          );
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
        case 2:
          interaction.reply(
            "Yodayo! Hello, " +
              interaction.member.displayName +
              "! YobiAi desu~"
          );
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
        case 3:
          interaction.reply(
            "Hello, " +
              interaction.member.displayName +
              ". Do you know what you can do better than executing this command? Touching grass."
          );
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
        case 4:
          interaction.reply(
            `Oh, just so you know, you get a randomize number ${randomNum}. Oh wait, this is supposed to be a hello command. Hello, fellow~`
          );
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
        case 5:
          interaction.reply(
            "Yahallo! YobiAi is here to help you! What's your command, fellow?"
          );
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
        case 6:
          interaction.reply(
            "Hello, " +
              interaction.member.displayName +
              "! Can I tell you something? Sometimes I wonder... Why the new episodes of the AudioJam series is taking so long. Do you know why?"
          );
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
        case 7:
          interaction.reply(
            "Hey my dude " +
              interaction.member.displayName +
              "! What's up huh. Doin' good? Good for ya-"
          );
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
        case 8:
          interaction.reply(
            "Hey, fellow human being name " +
              interaction.member.displayName +
              ". Do you know what's better than saying hello to me? Watch some of our videos! Here's our channel: https://www.youtube.com/@Yobimo"
          );
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
        case 9:
          interaction.reply(
            "Bruh, how unlucky are you. Did you when I code this randomize reply message, this message is actually the last. How poor...--- WAIT! That's not me, it's automie! HELLO! " +
              interaction.member.displayName +
              "!"
          );
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
        default:
          interaction.reply("Hello! How's your day? My name is YobiAi!");
          console.log(
            `Someone said hello to YobiAi! Random number: ${randomNum}`
          );
          break;
      }
    } catch (error) {
      // Catch error and notify automie
      const channelNotif = botClient.channels.cache.get("1136436375600758794");
      await channelNotif.send(
        `<@773774022662946845> my head is having trouble running the command /hello! Error: **${error}**`
      );
      await interaction.reply({
        content: `YobiAi encountered an error in this command! automie has been informed about this error. Error: ${error}`,
        ephemeral: true,
      });
      console.log(
        `YobiAi encountered an error while doing the command /hello. ${error}`
      );
    }
  },
};

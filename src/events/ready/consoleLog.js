/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const { ActivityType } = require("discord.js");

// Check if YobiAi successfully opens/online
module.exports = (botClient) => {
  // Discord Presence Configuration
  botClient.user.setActivity({
    name: "Creators @ Yobimo",
    type: ActivityType.Listening,
  });
  console.log("YobiAi is now online! Yehey~ Now, what's your next command?");
};

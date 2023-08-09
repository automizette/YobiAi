/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

// Handling events when member executes a command.
module.exports = (botClient) => {
  // Finding events folder. Making configurations
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  // Sorter
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    // console.log(eventFiles); // This is only used for testing - Log testing

    // Windows 10, 11 has back slash configurations. This will turn them into forward slash.
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    botClient.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(botClient, arg);
      }
    });
  }
};

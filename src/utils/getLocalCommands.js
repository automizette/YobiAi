/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const path = require("path");
const getAllFiles = require("./getAllFiles");

// Acquiring data from the local commands folder (../../commands)
module.exports = (exceptions = []) => {
  let localCommands = [];

  const commandCat = getAllFiles(path.join(__dirname, "..", "commands"), true);

  for (const commandCategory of commandCat) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile);

      if (exceptions.includes(commandObject.name)) {
        continue;
      }

      console.log(commandObject);
      localCommands.push(commandObject);
    }
  }

  return localCommands;
};

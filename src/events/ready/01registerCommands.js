/*

Copyright (c) Yobimo Studios. Licensed under the MIT License
Project: YobiAi - Your best companion when it comes to commands! (Made exclusively for Yobimo - Community Server)
Developed using Node.js & Discord.js (JavaScript, json)

*/

const { server } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

// Check whether any commands (.js) make any changes, whether it is edited, created, or deleted.
module.exports = async (botClient) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(botClient, server);

    // Check if command exist
    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      // Check if command exists
      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(
            `Request accepted! YobiAi deletes the command - "${name}" as this command is set to 'true'`
          );
          continue;
        }

        // Check if command was edited
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(
            `Request accepted! YobiAi edits the command - "${name}" as she thinks that some fellow made some changes`
          );
        }
      } else {
        // Check if the command information called 'deleted' is set to 'true' || if set to 'true', command will be deleted on the bot locally
        if (localCommand.deleted) {
          console.log(
            `Woops! YobiAi found a positive deletion of command name - "${name}", will skip registering!`
          );
          continue;
        }

        // Check if any commands was created
        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(
          `You created a command! You didn't inform YobiAi about it... Anyways, YobiAi successfully created the command - "${name}"`
        );
      }
    }
  } catch (error) {
    // Catch any possible error
    console.log(`No! YobiAi encountered an error! ${error}`);
  }
};

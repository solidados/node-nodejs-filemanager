import * as constants from "node:constants";
import rl from "./readline.interface.js";
import commands from "../interface/commands.js";
import { messages } from "../helpers/index.js";

const readlineListener = () => {
  const originalPrompt = rl.getPrompt();
  console.log(originalPrompt);

  rl.on("line", async (data) => {
    const [command, ...args] = data.split(" ");
    const commandToExecute = commands[command];

    if (commandToExecute) {
      commandToExecute(...args);
    } else if (command === ".exit") {
      messages.goodbye(constants.username);
      rl.close();
    } else {
      messages.invalid();
    }
  });

  rl.on("SIGINT", () => {
    messages.goodbye(constants.username);
    rl.close();
  });

  rl.on("close", () => rl.setPrompt(originalPrompt));

  rl.prompt();
};

export default readlineListener;

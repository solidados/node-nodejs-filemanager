import { constants } from "../constants/index.js";
import rl from "./readline.interface.js";
import commands from "../interface/commands.js";
import { messages } from "../helpers/index.js";

const readlineListener = () => {
  const originalPrompt = rl.getPrompt();

  rl.on("line", async (data) => {
    const [command, ...args] = data.split(" ");
    const commandToExecute = commands[command];

    if (command === ".exit") {
      messages.goodbye(constants.username);
      rl.close();
      return;
    }

    if (commandToExecute) {
      await commandToExecute(...args);
    } else {
      messages.invalid();
    }

    rl.prompt();
  });

  rl.on("SIGINT", () => {
    messages.goodbye(constants.username);
    rl.close();
  });

  rl.on("close", () => rl.setPrompt(originalPrompt));

  rl.prompt();
};

export default readlineListener;

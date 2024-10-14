import { isPathExist, messages } from "./index.js";
import { askUser } from "./askUser.js";
import { rl } from "../cli/index.js";

export const confirmOverwrite = async (destPath, fileName) => {
  const fileExists = await isPathExist(destPath);
  if (fileExists) {
    rl.pause();
    const answer = await askUser(messages.rewrite(fileName));
    rl.resume();

    if (answer.toLowerCase() === "y") return true;
    if (answer.toLowerCase() === "n") return false;

    messages.failed("Invalid input. Please enter 'y' or 'n'.");
    return await confirmOverwrite(destPath, fileName);
  }
  return true;
};

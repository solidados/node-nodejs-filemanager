import { readdir, writeFile } from "node:fs/promises";
import { __absolute, messages } from "../helpers/index.js";

const add = async (dir, file) => {
  if (!file) {
    messages.invalidInput();
    return;
  }

  try {
    const dirContent = await readdir(dir);
    if (dirContent.includes(file)) {
      messages.fileExist();
      return;
    }

    await writeFile(__absolute(dir, file), "");
    messages.fileCreated();
  } catch (error) {
    messages.failed(error.message);
  }

  messages.location(dir);
};

export default add;

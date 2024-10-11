import { readdir, writeFile } from "node:fs/promises";
import { __absolute, messages } from "../helpers/index.js";

const add = async (dir, file) => {
  if (!file) return messages.invalidInput();

  try {
    const dirContent = await readdir(dir);
    if (dirContent.includes(file)) return messages.fileExist();

    await writeFile(__absolute(dir, file), "");
    messages.fileCreated(file);
  } catch (error) {
    messages.failed(error.message);
  } finally {
    messages.location(dir);
  }
};

export default add;

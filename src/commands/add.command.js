import { readdir, writeFile } from "node:fs/promises";
import { __absolute, messages, pathParser } from "../helpers/index.js";

const add = async (dir, file) => {
  const [parsedDir] = pathParser(dir);
  const [parsedFile] = pathParser(file);

  if (!parsedFile) return messages.invalidInput();

  try {
    const dirContent = await readdir(parsedDir);
    if (dirContent.includes(parsedFile)) return messages.fileExist();

    await writeFile(__absolute(parsedDir, parsedFile), "");
    messages.fileCreated(parsedFile);
  } catch (error) {
    messages.failed(error.message);
  } finally {
    messages.location(parsedDir);
  }
};

export default add;

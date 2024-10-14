import { rm, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { messages, pathParser } from "../helpers/index.js";

const removeRecursively = async (path) => {
  const pathStats = await stat(path);

  if (pathStats.isDirectory()) {
    const files = await readdir(path);
    for (const file of files) {
      const filePath = join(path, file);
      await removeRecursively(filePath);
    }
  }
  await rm(path);
};

const rmCommand = async (dir, filePath) => {
  const [parsedDir] = pathParser(dir);
  const [parsedFilePath] = pathParser(filePath);

  try {
    const fullPath = join(parsedDir, parsedFilePath);
    await removeRecursively(fullPath);
    messages.fileProcessed("Delete", parsedFilePath);
  } catch (error) {
    messages.failed(error.message);
  }
};

export default rmCommand;

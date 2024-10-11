import { readFile, stat } from "node:fs/promises";
import { parse } from "node:path";
import { __absolute, isPathExist, messages } from "./index.js";

const fileOperations = async (dir, filePath, file, operation) => {
  try {
    if (!filePath || !file) {
      messages.invalidInput();
      return dir;
    }

    let fileWithExtension = parse(filePath).base;
    const pathToSrcFileExist = await isPathExist(dir, filePath);
    const pathToDestFileExist = await isPathExist(dir, file);

    if (!pathToSrcFileExist || !pathToDestFileExist) {
      messages.invalidInput();
      return dir;
    } else {
      const stats = await stat(__absolute(dir, filePath));
      if (stats.isFile()) {
        const data = await readFile(__absolute(dir, filePath));
        await operation(__absolute(dir, file, fileWithExtension), data);
        messages.location(dir);
      } else {
        messages.invalidInput();
        return dir;
      }
    }
  } catch (error) {
    messages.failed(error.message);
  }
};

export default fileOperations;

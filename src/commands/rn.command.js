import { rename } from "node:fs/promises";
import { parse } from "node:path";
import { __absolute, isPathExist, messages } from "../helpers/index.js";

const rn = async (dir, filePath, newFileName) => {
  if (!filePath || !newFileName) {
    return messages.invalidInput();
  }

  const { dir: fileDir, base: oldFileName } = parse(filePath);
  const absoluteOldPath = __absolute(dir, fileDir, oldFileName);
  const absoluteNewPath = __absolute(dir, fileDir, newFileName);

  try {
    const exist = await isPathExist(absoluteOldPath);
    if (!exist) {
      throw new Error(`File ${oldFileName} does not exist`);
    }

    await rename(absoluteOldPath, absoluteNewPath);
    messages.fileRenamed(newFileName);
  } catch (error) {
    messages.failed(error.message);
    return;
  }
  messages.location(dir);
};

export default rn;

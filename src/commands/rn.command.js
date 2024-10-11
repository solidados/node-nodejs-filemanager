import { homedir as getHomeDir } from "node:os";
import { rename } from "node:fs/promises";
import { parse } from "node:path";
import { __absolute, isPathExist, messages } from "../helpers/index.js";

// let currentDir = getHomeDir();

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
    // if (!filePath || !file) {
    //   messages.invalidInput();
    //   return dir;
    // }

    // let newPath = parse(filePath).dir;
    // let oldPath = parse(filePath).base;

    // try {
    //   await isPathExist(__absolute(dir, newPath, oldPath));
    // } catch (error) {
    //   messages.failed(error.message);
    //   return dir;
    // }
    // await rename(
    //   __absolute(dir, newPath, oldPath),
    //   __absolute(dir, newPath, file),
    // );
    messages.fileRenamed(newFileName);
    //
    // currentDir = __absolute(dir, newPath);
    // messages.location(currentDir);

    // return currentDir;
  } catch (error) {
    messages.failed(error.message);
    return;
  }
  messages.location(dir);
};

export default rn;

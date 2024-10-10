import { homedir as getHomeDir } from "node:os";
import { dirname } from "node:path";
import { __absolute, isPathExist, messages } from "../helpers/index.js";

let currentDir = getHomeDir();

const cd = async (dir) => {
  if (!dir) {
    messages.invalid();
    return currentDir;
  }

  const newPath = __absolute(currentDir, dir);

  if (dir === "..") {
    const parentDir = dirname(currentDir);

    if (parentDir === currentDir) {
      messages.location(currentDir);
      return currentDir;
    }
  }

  try {
    const exist = await isPathExist(newPath);
    if (exist) {
      currentDir = newPath;
      messages.location(currentDir);
    } else {
      messages.failed(`: ${newPath} does not exist.`);
    }
  } catch (error) {
    messages.failed(`: ${newPath} does not exist.`);
  }

  return currentDir;
};

export default cd;

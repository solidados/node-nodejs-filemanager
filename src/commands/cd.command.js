import { homedir as getHomeDir } from "node:os";
import { dirname } from "node:path";
import {
  __absolute,
  isPathExist,
  pathParser,
  messages,
  formatPathColor,
  formatErrorColor,
} from "../helpers/index.js";

let currentDir = getHomeDir();

const cd = async (dir) => {
  const [parsedDir] = pathParser(dir);
  if (!parsedDir) {
    messages.invalid();
    return currentDir;
  }

  if (parsedDir === "..") {
    const parentDir = dirname(currentDir);
    if (parentDir !== currentDir) {
      currentDir = parentDir;
    }
    messages.location(currentDir);
    return currentDir;
  }

  const newPath = __absolute(currentDir, parsedDir);

  try {
    const exist = await isPathExist(newPath);
    if (!exist) {
      messages.failed(
        `${formatPathColor(newPath)} ${formatErrorColor(`does not exist.`)}`,
      );
      return currentDir;
    }

    currentDir = newPath;
    messages.location(currentDir);
  } catch (error) {
    messages.failed(
      `${formatPathColor(newPath)} ${formatErrorColor(`does not exist.`)}`,
    );
  }

  return currentDir;
};

export default cd;

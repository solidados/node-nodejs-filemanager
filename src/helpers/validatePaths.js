import { stat } from "node:fs/promises";
import { isPathExist, messages } from "./index.js";

export const validatePaths = async (srcPath, destDir) => {
  const srcExists = await isPathExist(srcPath);
  if (!srcExists) {
    messages.failed(`Source file ${srcPath} does not exist.`);
    return false;
  }

  const destExists = await isPathExist(destDir);
  if (!destExists) {
    messages.failed(`Destination directory ${destDir} does not exist.`);
    return false;
  }

  const stats = await stat(destDir);
  if (!stats.isDirectory()) {
    messages.failed(`${destDir} is not a directory`);
    return false;
  }

  return true;
};

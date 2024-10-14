import { stat } from "node:fs/promises";
import { isPathExist, messages } from "./index.js";
import pathParser from "./pathParser.js";

export const validatePaths = async (srcPathStr, destDirStr) => {
  const [srcPath] = pathParser(srcPathStr);
  const [destDir] = pathParser(destDirStr);

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

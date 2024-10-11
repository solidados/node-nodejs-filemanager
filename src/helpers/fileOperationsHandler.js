import { readFile, stat } from "node:fs/promises";
import { parse } from "node:path";
import { __absolute, isPathExist, messages } from "./index.js";

const validatePaths = async (srcPath, destPath) => {
  const srcExists = await isPathExist(srcPath);
  const destExists = await isPathExist(destPath);

  if (!srcExists || !destExists) {
    messages.invalidInput();
    return false;
  }
  return true;
};

const processFile = async (srcPath, destPath, operation) => {
  const stats = await stat(srcPath);
  if (!stats.isFile()) {
    return messages.invalidInput();
  }

  const data = await readFile(srcPath);
  await operation(destPath, data);
  messages.fileProcessed();
};

const fileOperations = async (dir, filePath, destFile, operation) => {
  try {
    const fullSrcPath = __absolute(dir, filePath);
    const fullDestPath = __absolute(dir, destFile, parse(filePath).base);

    const pathsValid = await validatePaths(fullSrcPath, fullDestPath);
    if (!pathsValid) return;

    await processFile(fullSrcPath, fullDestPath, operation);
    messages.location(dir);
  } catch (error) {
    messages.failed(error.message);
  }
};

export default fileOperations;

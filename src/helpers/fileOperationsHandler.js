import { stat } from "node:fs/promises";
import { parse, join } from "node:path";
import { __absolute, isPathExist, messages } from "./index.js";

const validatePaths = async (srcPath, destDir) => {
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

const processFile = async (srcPath, destDir, operation) => {
  const { base: fileName } = parse(srcPath);
  const destPath = join(destDir, fileName);

  try {
    await operation(srcPath, destPath);
    messages.fileProcessed(operation.name || "Operation", fileName);
  } catch (error) {
    messages.failed(`Failed to copy file: ${error.message}`);
  }
};

const fileOperationsHandler = async (
  dir,
  filePath,
  destDir,
  operation,
  { validateDest = true } = {},
) => {
  try {
    const fullSrcPath = __absolute(dir, filePath);
    const fullDestDir = __absolute(dir, destDir);

    if (validateDest) {
      const pathsValid = await validatePaths(fullSrcPath, fullDestDir);
      if (!pathsValid) return;
    }

    await processFile(fullSrcPath, fullDestDir, operation);

    messages.location(dir);
  } catch (error) {
    messages.failed(error.message);
  }
};

export default fileOperationsHandler;

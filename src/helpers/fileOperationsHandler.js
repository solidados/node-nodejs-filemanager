import { stat } from "node:fs/promises";
import { parse, join } from "node:path";
import { __absolute, isPathExist, messages } from "./index.js";
import { rl } from "../cli/index.js";

const askUser = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
};

const confirmOverwrite = async (destPath, fileName) => {
  const fileExists = await isPathExist(destPath);
  if (fileExists) {
    rl.pause();
    const answer = await askUser(messages.rewrite(fileName));
    rl.resume();
    if (answer.toLowerCase() === "y") {
      return true;
    } else if (answer.toLowerCase() === "n") {
      return false;
    } else {
      messages.failed("Invalid input. Please enter 'y' or 'n'.");
      return await confirmOverwrite(destPath, fileName);
    }
  }
  return true;
};

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

const fileOperationsHandler = async (
  dir,
  filePath,
  destDir,
  operation,
  options = { operationName: "Processed", validateDest: true },
) => {
  try {
    const fullSrcPath = __absolute(dir, filePath);
    const fullDestDir = __absolute(dir, destDir);
    const { base: fileName } = parse(filePath);
    const fullDestPath = join(fullDestDir, fileName);

    if (options.validateDest) {
      const pathsValid = await validatePaths(fullSrcPath, fullDestDir);
      if (!pathsValid) return;
    }

    const overwrite = await confirmOverwrite(fullDestPath, fileName);
    if (!overwrite) {
      console.log(`Operation cancelled. ${fileName} was not overwritten`);
      return;
    }

    await operation(fullSrcPath, fullDestPath);
    messages.fileProcessed(options.operationName, fileName);
    messages.location(dir);
  } catch (error) {
    messages.failed(error.message);
  }
};

export default fileOperationsHandler;

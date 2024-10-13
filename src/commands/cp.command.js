import { createReadStream, createWriteStream } from "node:fs";
import { fileOperationsHandler, messages } from "../helpers/index.js";

const copyFile = (srcPath, destPath) => {
  return new Promise((resolve, reject) => {
    const readable = createReadStream(srcPath);
    const writable = createWriteStream(destPath);

    readable.pipe(writable);

    writable.on("close", resolve);
    writable.on("error", (error) => {
      readable.destroy();
      reject(messages.failed(error.message));
    });

    readable.on("error", (error) => {
      writable.destroy();
      reject(messages.failed(error.message));
    });
  });
};

const cp = async (dir, filePath, destDir) => {
  try {
    await fileOperationsHandler(dir, filePath, destDir, copyFile);
  } catch (error) {
    console.error("Error copying file:", error.message);
  }
};

export default cp;

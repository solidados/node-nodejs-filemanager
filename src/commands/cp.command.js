import { createReadStream, createWriteStream } from "node:fs";
import { fileOperationsHandler } from "../helpers/index.js";

const copyFile = (srcPath, destPath) => {
  return new Promise((resolve, reject) => {
    const readable = createReadStream(srcPath);
    const writable = createWriteStream(destPath);

    readable.pipe(writable);

    writable.on("finish", resolve);
    writable.on("error", reject);
    readable.on("error", reject);
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

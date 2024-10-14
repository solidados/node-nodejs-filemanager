import { createReadStream, createWriteStream } from "node:fs";
import { unlink } from "node:fs/promises";
import { fileOperationsHandler, messages } from "../helpers/index.js";

const moveFile = (srcPath, destPath) => {
  return new Promise((resolve, reject) => {
    const readable = createReadStream(srcPath);
    const writable = createWriteStream(destPath);

    readable.pipe(writable);

    writable.on("close", async () => {
      try {
        await unlink(srcPath);
        resolve();
      } catch (error) {
        reject(error.message);
      }
    });

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

const mv = async (dir, filePath, destDir) => {
  try {
    await fileOperationsHandler(dir, filePath, destDir, moveFile, {
      operationName: "Move",
    });
  } catch (error) {
    messages.failed(error.message);
  }
};

export default mv;

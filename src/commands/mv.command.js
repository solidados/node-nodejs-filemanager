import { createReadStream, createWriteStream } from "node:fs";
import { unlink } from "node:fs/promises";
import { fileOperationsHandler, messages } from "../helpers/index.js";

const moveFile = (srcPath, destPath) => {
  return new Promise((resolve, reject) => {
    const readable = createReadStream(srcPath);
    const writable = createWriteStream(destPath);

    readable.pipe(writable);

    writable.on("finish", async () => {
      try {
        await unlink(srcPath);
        resolve();
      } catch (error) {
        reject(error.message);
      }
    });

    writable.on("error", (error) => {
      readable.destroy();
      writable.destroy();
      reject(error.message);
    });
    readable.on("error", (error) => {
      readable.destroy();
      writable.destroy();
      reject(error.message);
    });
  });
};

const mv = async (dir, filePath, destDir) => {
  try {
    await fileOperationsHandler(dir, filePath, destDir, moveFile, {
      operationName: "Moved",
    });
  } catch (error) {
    messages.failed(error.message);
  }
};

export default mv;

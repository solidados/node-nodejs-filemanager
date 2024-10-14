import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";
import { __absolute, isPathExist, messages } from "../helpers/index.js";

const compress = async (dir, filePath, destPath) => {
  try {
    if (!filePath || !destPath) return messages.invalidInput();

    const source = __absolute(dir, filePath);
    const target = __absolute(dir, destPath);

    if (!(await isPathExist(source))) return messages.invalidInput();

    const readStream = createReadStream(source);
    const writeStream = createWriteStream(`${target}_compressed.br`);
    const brotli = createBrotliCompress();

    await pipeline(readStream, brotli, writeStream);

    messages.fileProcessed("Compressed", source);
    messages.location(dir);
  } catch (error) {
    messages.failed(error.message);
  }
};

export default compress;

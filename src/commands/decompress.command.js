import { createReadStream, createWriteStream } from "node:fs";
import { parse } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";
import { __absolute, isPathExist, messages } from "../helpers/index.js";

const decompress = async (dir, filePath, destPath) => {
  if (!filePath || !destPath) return messages.invalidInput();

  try {
    const source = __absolute(dir, filePath);
    const target = __absolute(dir, destPath);
    const fileWithExt = parse(source).base;

    if (!(await isPathExist(source))) return messages.invalidInput();

    const readStream = createReadStream(source);
    const writeStream = createWriteStream(target);
    const brotli = createBrotliDecompress();

    await pipeline(readStream, brotli, writeStream);

    messages.fileProcessed("Decompressed", fileWithExt);
    messages.location(dir);
  } catch (error) {
    console.error(error.message);
  }
};

export default decompress;

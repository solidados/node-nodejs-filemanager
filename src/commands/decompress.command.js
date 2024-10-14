import { createReadStream, createWriteStream } from "node:fs";
import { parse } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";
import {
  __absolute,
  isPathExist,
  messages,
  pathParser,
} from "../helpers/index.js";

const decompress = async (dir, filePath, destPath) => {
  const [parsedDir] = pathParser(dir);
  const [parsedFilePath] = pathParser(filePath);
  const [parsedDestPath] = pathParser(destPath);

  if (!parsedFilePath || !parsedDestPath) return messages.invalidInput();

  try {
    const source = __absolute(parsedDir, parsedFilePath);
    const target = __absolute(parsedDir, parsedDestPath);
    const fileWithExt = parse(source).base;

    if (!(await isPathExist(source))) return messages.invalidInput();

    const readStream = createReadStream(source);
    const writeStream = createWriteStream(target);
    const brotli = createBrotliDecompress();

    await pipeline(readStream, brotli, writeStream);

    messages.fileProcessed("Decompress", fileWithExt);
    messages.location(parsedDir);
  } catch (error) {
    console.error(error.message);
  }
};

export default decompress;

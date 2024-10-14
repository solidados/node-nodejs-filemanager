import { createReadStream, createWriteStream } from "node:fs";
import { stat } from "node:fs/promises";
import { parse } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";
import {
  __absolute,
  isPathExist,
  messages,
  pathParser,
} from "../helpers/index.js";

const compress = async (dir, filePath, destPath) => {
  try {
    const [parsedDir] = pathParser(dir);
    const [parsedFilePath] = pathParser(filePath);
    const [parsedDestPath] = pathParser(destPath);

    if (!parsedFilePath || !parsedDestPath) return messages.invalidInput();

    const source = __absolute(parsedDir, parsedFilePath);
    const target = __absolute(parsedDir, parsedDestPath);
    const fileWithExt = parse(source).base;
    const compressedFile = `${target}.zip.br`;

    if (!(await isPathExist(source))) return messages.invalidInput();

    const { size: originalSize } = await stat(source);

    const readStream = createReadStream(source);
    const writeStream = createWriteStream(compressedFile);
    const brotli = createBrotliCompress();

    await pipeline(readStream, brotli, writeStream);

    const { size: compressedSize } = await stat(compressedFile);

    const compressionRatio = (
      ((originalSize - compressedSize) / originalSize) *
      100
    ).toFixed(2);

    messages.fileProcessed(
      `Compress (Ratio: ${compressionRatio}%)`,
      fileWithExt,
    );
    messages.location(parsedDir);
  } catch (error) {
    messages.failed(error.message);
  }
};

export default compress;

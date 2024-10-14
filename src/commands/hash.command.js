import { readFile } from "node:fs/promises";
import * as crypto from "node:crypto";
import { __absolute, messages, pathParser } from "../helpers/index.js";

const hash = async (dir, file) => {
  const [parsedDir] = pathParser(dir);
  const [parsedFile] = pathParser(file);

  if (!parsedFile) return messages.invalidInput();

  try {
    const filePath = __absolute(parsedDir, parsedFile);
    const data = await readFile(filePath);
    const hash = crypto.createHash("sha256").update(data).digest("hex");

    messages.userOutput(hash);
    messages.location(parsedDir);
  } catch (error) {
    messages.failed(error.message);
  }
};

export default hash;

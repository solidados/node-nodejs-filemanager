import { readFile } from "node:fs/promises";
import * as crypto from "node:crypto";
import { __absolute, messages } from "../helpers/index.js";

const hash = async (dir, file) => {
  if (!file) return messages.invalidInput();

  try {
    const filePath = __absolute(dir, file);
    const data = await readFile(filePath);
    const hash = crypto.createHash("sha256").update(data).digest("hex");

    messages.userOutput(hash);
    messages.location(dir);
  } catch (error) {
    messages.failed(error.message);
  }
};

export default hash;

import { stat, readFile } from "node:fs/promises";
import { EOL } from "node:os";
import { __absolute, messages, pathParser } from "../helpers/index.js";

const wrapText = (text, width) => {
  const regex = new RegExp(`(.{1,${width}})(\\s|$)|(.{1,${width}})`, "g");
  return text.match(regex) || [];
};

const cat = async (dir, file) => {
  const [parsedDir] = pathParser(dir);
  const [parsedFile] = pathParser(file);

  if (!parsedFile) return messages.invalidInput();

  const filePath = __absolute(parsedDir, parsedFile);

  try {
    const stats = await stat(filePath);
    if (!stats.isFile()) return messages.unable();

    const data = await readFile(filePath, { encoding: "utf-8", flag: "r" });
    const lines = data.split(EOL);
    const wrappedLines = lines.flatMap((line) => wrapText(line, 90));
    const dataFramed = `┌${"─".repeat(93)}┐\n${wrappedLines.map((row) => `│ ${row.padEnd(90)} │`).join(EOL)}\n└${"─".repeat(93)}┘`;
    console.log(dataFramed);
  } catch (error) {
    messages.failed(error.message);
  } finally {
    messages.location(parsedDir);
  }
};

export default cat;

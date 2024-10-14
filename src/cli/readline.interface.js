import * as readline from "node:readline";
import { constants } from "../constants/index.js";

const { colors } = constants;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${colors.purple}→${colors.reset} `,
});

export default rl;

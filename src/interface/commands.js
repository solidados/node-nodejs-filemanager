import { homedir as getHomeDir } from "node:os";
import { cd } from "../commands/index.js";

let currentDir = getHomeDir();

const commands = {
  up: async () => (currentDir = await cd("..")),
  cd: async (dir) => (currentDir = await cd(dir)),
};

export default commands;

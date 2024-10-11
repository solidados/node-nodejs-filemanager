import { homedir as getHomeDir } from "node:os";
import { cat, cd, ls } from "../commands/index.js";

let currentDir = getHomeDir();

const commands = {
  up: async () => (currentDir = await cd("..")),
  cd: async (dir) => (currentDir = await cd(dir)),
  ls: async () =>
    await ls(currentDir).catch((err) => console.error(err.message)),
  cat: async (file) =>
    cat(currentDir, file).catch((err) => console.error(err.message)),
};

export default commands;

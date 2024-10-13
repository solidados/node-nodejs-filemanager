import { homedir as getHomeDir } from "node:os";
import { add, cat, cd, cp, ls, mv, rmCommand, rn } from "../commands/index.js";

let currentDir = getHomeDir();

const commands = {
  up: async () => (currentDir = await cd("..")),
  cd: async (dir) => (currentDir = await cd(dir)),
  ls: async () =>
    await ls(currentDir).catch((err) => console.error(err.message)),
  cat: async (file) =>
    cat(currentDir, file).catch((err) => console.error(err.message)),
  add: async (file) =>
    add(currentDir, file).catch((err) => console.error(err.message)),
  rn: async (filePath, newFileName) =>
    await rn(currentDir, filePath, newFileName).catch((err) =>
      console.error(err.message),
    ),
  cp: async (filePath, file) =>
    await cp(currentDir, filePath, file).catch((err) =>
      console.error(err.message),
    ),
  mv: async (filePath, destDir) =>
    await mv(currentDir, filePath, destDir).catch((err) =>
      console.error(err.message),
    ),
  rm: async (filePath) =>
    await rmCommand(currentDir, filePath).catch((err) =>
      console.error(err.message),
    ),
};

export default commands;

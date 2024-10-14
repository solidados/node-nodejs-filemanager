import { fileURLToPath } from "node:url";
import { dirname, join, isAbsolute, resolve } from "node:path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const __absolute = (dir, ...filePath) => {
  const fullPath = join(...filePath);
  return isAbsolute(fullPath) ? fullPath : resolve(dir, fullPath);
};

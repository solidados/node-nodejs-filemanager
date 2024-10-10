import { fileURLToPath } from "node:url";
import { dirname, join, isAbsolute } from "node:path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const __absolute = (dir, ...file) =>
  isAbsolute(join(...file)) ? join(...file) : join(dir, join(...file));

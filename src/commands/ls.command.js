import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { formatSize, messages } from "../helpers/index.js";

const ls = async (dir) => {
  try {
    const contents = await readdir(dir);
    const statPromises = contents.map(async (content) => {
      try {
        const stats = await stat(join(dir, content));
        const type = stats.isDirectory() ? "folder" : "file";
        const formattedMtime = new Date(stats.mtime).toLocaleString();
        return {
          name: content,
          type,
          size: formatSize(stats.size),
          "last modified": formattedMtime,
        };
      } catch {
        return { name: content, type: "unknown" };
      }
    });

    const contentInfo = await Promise.all(statPromises);

    const sortedContent = contentInfo.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "folder" ? -1 : 1;
    });

    console.table(sortedContent, ["type", "name", "size", "last modified"]);
    messages.location(dir);
  } catch (error) {
    messages.failed();
  }
};

export default ls;

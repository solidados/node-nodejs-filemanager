import { parse, join } from "node:path";
import { __absolute, formatPathColor, messages } from "./index.js";
import { validatePaths } from "./validatePaths.js";
import { confirmOverwrite } from "./confirmOverwrite.js";

const fileOperationsHandler = async (
  dir,
  filePath,
  destDir,
  operation,
  options = { operationName: "Processed", validateDest: true },
) => {
  try {
    const fullSrcPath = __absolute(dir, filePath);
    const fullDestDir = __absolute(dir, destDir);
    const { base: fileName } = parse(filePath);
    const fullDestPath = join(fullDestDir, fileName);

    if (options.validateDest) {
      const pathsValid = await validatePaths(fullSrcPath, fullDestDir);
      if (!pathsValid) return;
    }

    const overwrite = await confirmOverwrite(fullDestPath, fileName);
    if (!overwrite) {
      console.log(
        `Operation cancelled. ${formatPathColor(fileName)} was not overwritten`,
      );
      messages.location(dir);
      return;
    }

    await operation(fullSrcPath, fullDestPath);
    messages.fileProcessed(options.operationName, fileName);
    messages.location(dir);
  } catch (error) {
    messages.failed(error.message);
  }
};

export default fileOperationsHandler;

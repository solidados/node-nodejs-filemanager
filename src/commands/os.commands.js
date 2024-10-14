import { EOL, cpus, userInfo, arch } from "node:os";
import { constants } from "../constants/index.js";
import {
  formatSuccessColor,
  formatWarningColor,
  messages,
  pathParser,
} from "../helpers/index.js";

const osOptions = {
  "--EOL": getEOL,
  "--cpus": getCPUS,
  "--homedir": getHomeDir,
  "--username": getUsername,
  "--architecture": getArchitecture,
};

function getEOL() {
  messages.userOutput(JSON.stringify(EOL));
}

function getCPUS() {
  const cpuInfo = cpus().map((cpu, index) => ({
    Core: index + 1,
    Model: cpu.model,
    "Clock Rate (GHz)": (cpu.speed / 1000).toFixed(2),
  }));
  console.log(
    `${formatSuccessColor(`Overall amount of CPUs:`)} ${formatWarningColor(cpuInfo.length)}`,
  );
  console.table(cpuInfo);
}

function getHomeDir() {
  const homeDir = constants.homedir;
  messages.userOutput(homeDir);
}

function getUsername() {
  const username = userInfo({ encoding: "utf-8" }).username;
  username
    ? messages.userOutput(`System User name: ${username}`)
    : messages.failed("Unable to retrieve username");
}

function getArchitecture() {
  const architecture = arch();
  messages.userOutput(`Node.js binary architecture: ${architecture}`);
}

async function osInfo(currentDir, file) {
  const [parsedFile] = pathParser(file);

  try {
    const operation = osOptions[parsedFile];
    if (operation) {
      await operation();
      messages.location(currentDir);
    } else {
      messages.invalidInput();
    }
  } catch (error) {
    messages.failed(error.message);
  }
}

export default osInfo;

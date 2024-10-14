import { homedir } from "node:os";

export const constants = {
  username: "Guest",
  homedir: homedir(),
  colors: {
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
    green: "\x1b[32m",
    purple: "\x1b[35m",
    red: "\x1b[31m",
    redLight: "\x1b[91m",
    reset: "\x1b[0m",
    white: "\x1b[37m",
    whiteBg: "\x1b[7m",
    yellow: "\x1b[33m",
  },
};

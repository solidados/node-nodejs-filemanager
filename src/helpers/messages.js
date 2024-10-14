import { EOL } from "node:os";
import {
  formatInverseColor,
  formatPathColor,
  formatErrorColor,
  formatSuccessColor,
  formatWarningColor,
} from "../helpers/index.js";

const messages = {
  failed: (msg) =>
    console.log(`${formatErrorColor(`Operation failed:`)} ${msg}${EOL}`),
  fileCreated: (file) =>
    console.log(
      `${formatSuccessColor(`File`)} ${formatPathColor(file)} ${formatSuccessColor(`created successfully`)}${EOL}`,
    ),
  fileExist: () =>
    console.log(`${formatWarningColor(`File already exist`)}${EOL}`),
  fileProcessed: (operation, file) =>
    console.log(
      `${formatSuccessColor(`${operation} on`)} ${formatPathColor(file)} ${formatSuccessColor(`was successful`)}`,
    ),
  fileRenamed: (file) =>
    console.log(
      `${formatSuccessColor(`File`)} ${formatPathColor(file)} ${formatSuccessColor(`renamed successfully`)}${EOL}`,
    ),
  goodbye: (username) =>
    console.log(
      `${EOL}Thank you for using File Manager, ${formatInverseColor(username)}, goodbye!`,
    ),
  greeting: (username) =>
    console.log(
      `${EOL}Welcome to the File Manager, ${formatInverseColor(username)}!`,
    ),
  invalid: () => console.log(formatErrorColor(`Invalid command`), EOL),
  invalidInput: () => console.log(formatErrorColor(`Invalid input`), EOL),
  location: (dir) =>
    console.log(`${EOL}You are currently in ${formatPathColor(dir)}`),
  rewrite: (fileName) =>
    `${formatPathColor(fileName)} ${formatWarningColor(`already exists. Would you like to overwrite it? (y/N): `)}`,
  success: (text) => console.log(formatSuccessColor(text)),
  unable: () =>
    console.log(formatWarningColor(`Unable to perform command`), EOL),
  userOutput: (option) => console.log(formatSuccessColor(option)),
};

export default messages;

import { EOL } from "node:os";

const messages = {
  failed: (msg) => console.log(`Operation failed${msg}${EOL}`),
  fileCreated: (file) => console.log(`File ${file} created successfully${EOL}`),
  fileExist: () => console.log(`File already exist${EOL}`),
  goodbye: (username) =>
    console.log(
      `${EOL}Thank you for using File Manager, ${username}, goodbye!`,
    ),
  greeting: (username) =>
    console.log(`${EOL}Welcome to the File Manager, ${username}!`),
  invalid: () => console.log(`Invalid command${EOL}`),
  invalidInput: () => console.log(`Invalid input${EOL}`),
  location: (dir) => console.log(`You are currently in ${dir}`),
  unable: () => console.log(`Unable to perform command${EOL}`),
};

export default messages;

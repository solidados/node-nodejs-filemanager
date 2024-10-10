import { EOL } from "node:os";

const messages = {
  failed: (msg) => console.log(`Operation failed${msg}${EOL}`),
  goodbye: (username) =>
    console.log(
      `${EOL}Thank you for using File Manager, ${username}, goodbye!`,
    ),
  greeting: (username) =>
    console.log(`${EOL}Welcome to the File Manager, ${username}!`),
  invalid: () => console.log(`Invalid command${EOL}`),
  location: (dir) => console.log(`You are currently in ${dir}`),
};

export default messages;

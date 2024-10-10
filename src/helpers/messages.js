import { EOL } from "node:os";

const messages = {
  goodbye: (username) =>
    console.log(
      `${EOL}Thank you for using File Manager, ${username}, goodbye!`,
    ),
  greeting: (username) =>
    console.log(`${EOL}Welcome to the File Manager, ${username}!`),
  invalid: () => console.log(`Invalid command${EOL}`),
  location: (dir) => console.log(`You are currently in ${dir}${EOL}`),
};

export default messages;

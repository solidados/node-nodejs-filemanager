import { EOL } from "node:os";

const messages = {
  greeting: (username) =>
    console.log(`${EOL}Welcome to the File Manager, ${username}!`),
  location: (dir) => console.log(`You are currently in ${dir}${EOL}`),
};

export default messages;

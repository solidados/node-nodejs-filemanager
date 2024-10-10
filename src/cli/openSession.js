import { messages } from "../helpers/index.js";
import { constants } from "../constants/index.js";

const openSession = () => {
  const HOME = constants.homedir;
  const args = process.argv.slice(2);

  args || args.join("").startsWith("--username=")
    ? (constants.username = args.join("").split("=")[1])
    : constants.username;

  messages.greeting(constants.username);
  messages.location(HOME);
};

export default openSession;

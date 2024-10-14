import { messages } from "../helpers/index.js";
import { constants } from "../constants/index.js";

const openSession = () => {
  const HOME = constants.homedir;
  const args = process.argv.slice(2);

  if (args.length > 0 && args[0].startsWith("--username=")) {
    constants.username = args[0].split("=")[1];
  }

  messages.greeting(constants.username);
  messages.location(HOME);
};

export default openSession;

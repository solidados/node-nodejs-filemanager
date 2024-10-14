import { openSession, readlineListener } from "./src/cli/index.js";

const App = () => {
  openSession();
  readlineListener();
};

App();

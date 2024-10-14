import process from "node:process";

export const parseArgs = () => {
  const args = process.argv.slice(2);
  const parsedArgs = {};
  args.forEach((arg) => {
    const [key, value] = arg.split("=");
    parsedArgs[key.replace("--", "")] = value;
  });

  return parsedArgs;
};

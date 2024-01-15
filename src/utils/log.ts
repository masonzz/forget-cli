import chalk from "chalk";

const Prefix = "【ForgetCli】";
export const Log = {
  debug: (...text: unknown[]) => {
    console.log(`${chalk.bgBlue(Prefix)} ${chalk.blue(text)}`);
  },
  info: (...text: unknown[]) => {
    console.log(`${chalk.bgGreen(Prefix)} ${chalk.green(text)}`);
  },
  warn: (...text: unknown[]) => {
    console.log(`${chalk.bgYellow(Prefix)} ${chalk.yellow(text)}`);
  },
  error: (...text: unknown[]) => {
    console.log(`${chalk.bgRed(Prefix)} ${chalk.red(text)}`);
  },
  default: (...text: unknown[]) => {
    console.log(text);
  },
};

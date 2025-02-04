import { spawn } from 'node:child_process';
import { access, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import inquirer from "inquirer";
import SearchList from 'inquirer-search-list';

import { Log } from "./log";

inquirer.registerPrompt('search-list', SearchList);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const separator = '丨';

export const runCli = async () => {
  // 使用 fs.readFileSync 读取文件
  try {
    await access("./package.json");
  } catch (e) {
    Log.error(
      `读取 package.json 文件失败, 请确认路径 ${resolve(
        __dirname,
        "./package.json"
      )} 是否正确`
    );
    process.exit(1);
  }
  const packageJson = await readFile("./package.json", "utf8");
  const parsedJson = JSON.parse(packageJson);
  const scripts = parsedJson.scripts;

  const scriptsFormatted = Object.entries(scripts).map(([key, value]) => {
    return `${key}${separator}${value}`;
  });
  if (scriptsFormatted.length === 0) {
    Log.error(
      `${resolve(__dirname, "./package.json")} 文件内无可执行的 scripts 脚本`
    );
    process.exit(1);
  }
  inquirer
    .prompt([
      {
        type: "search-list",
        name: "script",
        message: "请选择需要执行的命令",
        choices: scriptsFormatted,
        loop: false,
        searchable: true,
        pageSize: 10
      },
      {
        type: "input",
        name: "args",
        message: "请输入额外的参数（可选，直接回车跳过）",
      }
    ])
    .then((answers) => {
      const command = answers.script.split(`${separator}`)[0];
      const args = answers.args.trim();
      
      Log.info(`执行命令: npm run ${command}${args ? ' ' + args : ''}`);
      try {
        const npmArgs = ['run', command];
        if (args) {
          // 加 --，确保参数正确传递给脚本
          npmArgs.push('--');
          npmArgs.push(...args.split(' '));
        }
        spawn('npm', npmArgs, { stdio: 'inherit' });
      } catch(e) {
        Log.error("命令执行失败", e);
      }
    });
};

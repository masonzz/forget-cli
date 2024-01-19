# :sunny:	forget-cli

不用再为记不住项目的 npm scripts 苦恼了 :smile: 。

日常开发过程中，可能会遇到一些大型项目，项目内的 `npm scripts` 数量庞大，很难全部记住，经常需要去 `package.json` 内复制相应的 `script name` 然后执行。

本项目会自动读取项目内的 `npm scripts` 脚本，然后通过命令选择的形式来进行执行。

![示例](https://i2.100024.xyz/2024/01/16/1wn252.gif)

## 使用方式

```bash
# 安装
npm i -g forget-cli
# 在需要的项目内使用
forget
```

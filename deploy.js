// #!/usr/bin/env node
// import simpleGit from "simple-git";
// import inquirer from "inquirer";
// import { execSync } from "child_process";
// import fs from "fs-extra";
// import path from "path";

// const git = simpleGit();

// // 获取命令行参数的小工具
// function getArg(name) {
//   const prefix = `--${name}=`;
//   const arg = process.argv.find((a) => a.startsWith(prefix));
//   return arg ? arg.replace(prefix, "") : null;
// }

// async function run() {
//   console.log("让本喵看看远程 main 分支有没有更新☆...");

//   await git.fetch("origin", "main");
//   const status = await git.status();

//   if (status.behind > 0) {
//     console.error("本地 main 落后远程，请先拉取更新喵(>_<)");
//     process.exit(1);
//   }

//   // 读取命令行参数
//   const mainMsgArg = getArg("main");
//   const ghMsgArg = getArg("gh-msg");

//   // main commit message
//   let mainCommitMsg = mainMsgArg;
//   if (!mainCommitMsg) {
//     const ans = await inquirer.prompt({
//       type: "input",
//       name: "msg",
//       message: "√ 告诉本喵 main 分支的描述吧（￣︶￣）↗",
//       default: "更新 main 分支",
//     });
//     mainCommitMsg = ans.msg;
//   }

//   console.log(`本喵要 push main 分支了哟...`);
//   await git.add(".");
//   await git.commit(mainCommitMsg);
//   await git.push("origin", "main");
//   console.log("main 分支已经推送了喵(≧∇≦)ﾉ");

//   // 清空 dist
//   console.log("已经帮主人清空 dist 目录了喵");
//   fs.emptyDirSync("dist");

//   // 重新打包
//   execSync("npm run build", { stdio: "inherit" });

//   // 生成版本号
//   const version = `v-${Date.now()}`;
//   console.log(`这次的 dist 版本号是 ${version} 喵(｡◕ ‿◕｡)`);

//   // gh-pages commit message
//   const ghCommitMsg = ghMsgArg || "部署 dist 更新";

//   console.log(`本喵要部署 dist 到 gh-pages 分支了喵，主人的 commit 描述是 "${ghCommitMsg}" 喵`);

//   const tempBranch = "gh-pages-temp";
//   // 删除已有临时分支
//   try {
//     await git.deleteLocalBranch(tempBranch, true);
//     console.log(`临时分支 ${tempBranch} 已存在，本喵先删除它喵~`);
//   } catch {}

//   // 创建临时分支
//   await git.checkoutLocalBranch(tempBranch);

//   // 强制 add dist
//   await git.raw(["add", "-f", "dist"]);
//   await git.commit(ghCommitMsg);

//   // 推送到 gh-pages
//   await git.push("origin", `${tempBranch}:gh-pages`, ["--force"]);

//   // 回到 main 并删掉临时分支
//   await git.checkout("main");
//   await git.deleteLocalBranch(tempBranch, true);

//   console.log("部署完成喵!本喵厉害吧喵(/≧▽≦)/");
// }

// run().catch((err) => {
//   console.error("部署失败了喵(#_<-), 主人看这个知道怎么回事吗喵", err);
//   process.exit(1);
// });

import simpleGit from "simple-git";
import inquirer from "inquirer";
import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";

const git = simpleGit();
const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const versionPath = path.join(distDir, "version.txt");

async function run() {
    console.log("让本喵看看远程 main 分支有没有更新☆...");
    await git.fetch("origin", "main");
    const status = await git.status();

    if (status.behind > 0) {
        console.error("本地 main 落后远程，请先拉取更新喵(>_<)");
        process.exit(1);
    }

    // main commit
    const ans = await inquirer.prompt({
        type: "input",
        name: "msg",
        message: "√ 告诉本喵 main 分支的描述吧（￣︶￣）↗",
        default: "更新 main 分支",
    });
    const mainCommitMsg = ans.msg;

    console.log("本喵要 push main 分支了哟...");
    await git.add(".");
    await git.commit(mainCommitMsg);
    await git.push("origin", "main");
    console.log("main 分支已经推送了喵(≧∇≦)ﾉ");

    // 清空 dist
    console.log("已经帮主人清空 dist 目录了喵");
    fs.emptyDirSync(distDir);

    // 构建 vite
    execSync("npm run build", { stdio: "inherit" });

    // 生成版本号
    const version = `v-${Date.now()}`;
    console.log(`这次的 dist 版本号是 ${version} 喵(｡◕ ‿◕｡)`);

    // 更新 index.html 中的 js/css URL
    if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, "utf-8");
        html = html.replace(/(<script\s+.*src=".*?\.js)"/g, `$1?v=${version}"`);
        html = html.replace(/(<link\s+.*href=".*?\.css)"/g, `$1?v=${version}"`);
        fs.writeFileSync(indexPath, html, "utf-8");
        console.log("index.html 已更新 js/css URL，防止缓存喵~");
    }

    // 写入 version.txt
    const log = `${new Date().toISOString()} 版本号: ${version} 由 main 分支提交: "${mainCommitMsg}" 上传\n`;
    fs.appendFileSync(versionPath, log, "utf-8");
    console.log(`version.txt 已生成并记录本次上传日志喵`);

    // gh-pages 部署
    const ghCommitMsg = `部署 dist 更新 ${version}`;
    console.log(`本喵要部署 dist 到 gh-pages 分支了喵，commit 描述: "${ghCommitMsg}"`);

    const tempBranch = "gh-pages-temp";

    // 删除已有临时分支
    try {
        await git.deleteLocalBranch(tempBranch, true);
        console.log(`临时分支 ${tempBranch} 已存在，本喵先删除它喵~`);
    } catch {}

    await git.checkoutLocalBranch(tempBranch);
    await git.raw(["add", "-f", "dist"]);
    await git.commit(ghCommitMsg);
    await git.push("origin", `${tempBranch}:gh-pages`, ["--force"]);
    await git.checkout("main");
    await git.deleteLocalBranch(tempBranch, true);

    console.log("部署完成喵! 本喵厉害吧喵(/≧▽≦)/");
}

run().catch((err) => {
    console.error("部署失败了喵(#_<-), 主人看这个知道怎么回事吗喵", err);
    if (fs.existsSync(distDir)) {
        console.log(`部署失败了喵，本喵保留 dist 在 ${distDir} 了喵o(TヘTo)`);
    }
    process.exit(1);
});


// //使用方法
// // npm run deploy

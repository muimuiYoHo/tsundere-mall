import { execSync } from "child_process";
import prompts from "prompts";
import fs from "fs";
import path from "path";
import os from "os";

const distDir = path.resolve("dist");
const tmpDir = path.join(os.tmpdir(), "gh-pages-temp");

// 获取命令行参数
const args = process.argv.slice(2);
const ghMsgArg = args.find(arg => arg.startsWith('--gh-msg='));
const ghMsg = ghMsgArg ? ghMsgArg.split('=')[1] : '部署 dist 更新';
const mainMsgArg = args.find(arg => arg.startsWith('--main='));
const mainMsgParam = mainMsgArg ? mainMsgArg.split('=')[1] : null;

(async () => {
    try {
        // --- 拉取 main ---
        console.log("让本喵看看远程 main 分支有没有更新☆...");
        console.log("对了喵,如果主人是 SSH 记得等下输入密码/私钥口令啊喵（＾∀＾●）ﾉｼ");
        execSync(`git fetch origin`, { stdio: 'inherit' });
        const localMain = execSync(`git rev-parse main`).toString().trim();
        const remoteMain = execSync(`git rev-parse origin/main`).toString().trim();
        if (localMain !== remoteMain) {
            console.log("喂喂!远程 main 有更新喵，本喵会自己拉取并 rebase 的啦^3^...");
            execSync(`git pull --rebase origin main`, { stdio: 'inherit' });
            console.log("已经同步远程 main 分支了喵");
        } else {
            console.log("本地 main 就是最新的喵，与远程一致喵( •̀ .̫ •́ )✧");
        }

        // --- 检查本地改动 ---
        const status = execSync(`git status --porcelain`).toString().trim();
        if (status) {
            const mainMsg = mainMsgParam || (await prompts({
                type: 'text',
                name: 'msg',
                message: '告诉本喵 main 分支的描述吧（￣︶￣）↗ ',
            })).msg;
            if (!mainMsg) {
                console.log("取消操作...喵?没有输入 main commit 描述是不打算继续了喵(ﾟヮﾟ)?");
                process.exit(1);
            }
            execSync(`git add .`, { stdio: 'inherit' });
            execSync(`git commit -m "${mainMsg}"`, { stdio: 'inherit' });
            console.log("本喵要 push main 分支了哟，如果主人是 SSH 记得等下输入密码/私钥口令啊喵（＾∀＾●）ﾉｼ...");
            execSync(`git push origin main`, { stdio: 'inherit' });
        } else {
            console.log("main 分支没有改动喵，跳过提交了喵§(*￣▽￣*)§");
        }

        // --- 删除 dist ---
        if (fs.existsSync(distDir)) {
            fs.rmSync(distDir, { recursive: true, force: true });
            console.log("已经帮主人清空 dist 目录了喵");
        }

        // --- 构建 Vite ---
        execSync(`npm run build`, { stdio: 'inherit' });

        // --- dist 空目录检测 ---
        const distFiles = fs.readdirSync(distDir);
        if (distFiles.length === 0) {
            console.log("dist 目录没东西喵，部署 gh-pages 跳过了喵o(〃＾▽＾〃)o");
            process.exit(0);
        }

        // --- 生成 dist 版本号 ---
        const version = `v-${Date.now()}`;
        fs.writeFileSync(path.join(distDir, 'version.txt'), version);
        console.log(`这次的 dist 版本号是 ${version} 喵(｡◕ ‿◕｡)`);

        // --- 临时目录操作 gh-pages ---
        if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true });
        fs.mkdirSync(tmpDir);

        // 初始化 gh-pages 分支
        execSync(`git init`, { cwd: tmpDir });
        execSync(`git checkout -b gh-pages`, { cwd: tmpDir });

        // 拷贝 dist 内容到临时目录
        execSync(`xcopy "${distDir}" "${tmpDir}" /E /I /Y`, { shell: true });

        // 提交并推送
        execSync(`git add .`, { cwd: tmpDir });
        execSync(`git commit -m "${ghMsg}"`, { cwd: tmpDir });
        execSync(`git remote add origin "$(git config --get remote.origin.url)"`, { cwd: tmpDir });
        execSync(`git push -f origin gh-pages`, { cwd: tmpDir, stdio: 'inherit' });

        console.log("部署完成喵!本喵厉害吧喵(/≧▽≦)/");

    } catch (err) {
        console.error("部署失败了喵(#_<-),主人看这个知道怎么个事吗喵", err);
        if (fs.existsSync(distDir)) {
            console.log(`部署失败了喵，本喵保留 dist 目录在 ${distDir} 了喵o(TヘTo)`);
        }
        process.exit(1);
    }
})();



//使用方法
// npm run deploy -- --main="自定义描述" --gh-msg="自定义描述"

import { execSync } from "child_process";
import prompts from "prompts";
import fs from "fs";
import path from "path";
import simpleGit from "simple-git";

const distDir = path.resolve("dist");
const git = simpleGit();

// 获取命令行参数
const args = process.argv.slice(2);
const ghMsgArg = args.find(arg => arg.startsWith('--gh-msg='));
const ghMsg = ghMsgArg ? ghMsgArg.split('=')[1] : '部署 dist 更新';
const mainMsgArg = args.find(arg => arg.startsWith('--main='));
const mainMsgParam = mainMsgArg ? mainMsgArg.split('=')[1] : null;

(async () => {
    try {
        console.log("让本喵看看远程 main 分支有没有更新☆...");
        console.log("对了喵,如果主人是 SSH 记得等下输入密码/私钥口令啊喵（＾∀＾●）ﾉｼ");
        await git.fetch('origin', 'main');
        const localMain = (await git.revparse(['main'])).trim();
        const remoteMain = (await git.revparse(['origin/main'])).trim();
        if (localMain !== remoteMain) {
            console.log("喂喂!远程 main 有更新喵，本喵会自己拉取并 rebase 的啦^3^...");
            // 自动 stash 未提交改动再 rebase
            const status = await git.status();
            if (status.files.length > 0) {
                console.log("本地 main 有未提交改动，本喵会先 stash 喵~");
                await git.stash();
            }
            await git.pull('origin', 'main', {'--rebase': null});
            if (status.files.length > 0) {
                console.log("本喵把 stash 的改动 pop 回来了喵~");
                await git.stash(['pop']);
            }
            console.log("已经同步远程 main 分支了喵");
        } else {
            console.log("本地 main 就是最新的喵，与远程一致喵( •̀ .̫ •́ )✧");
        }

        // --- 检查是否有改动 ---
        const statusAfter = await git.status();
        if (statusAfter.files.length > 0) {
            const mainMsg = mainMsgParam || (await prompts({
                type: 'text',
                name: 'msg',
                message: '告诉本喵 main 分支的描述吧（￣︶￣）↗ ',
            })).msg;
            if (!mainMsg) {
                console.log("取消操作...喵?没有输入 main commit 描述是不打算继续了喵(ﾟヮﾟ)?");
                process.exit(1);
            }
            await git.add('.');
            await git.commit(mainMsg);
            console.log("本喵要 push main 分支了哟，如果主人是 SSH 记得等下输入密码/私钥口令啊喵（＾∀＾●）ﾉｼ...");
            await git.push('origin', 'main');
        } else {
            console.log("main 分支没有改动喵，跳过提交了喵§(*￣▽￣*)§");
        }

        // --- 清空 dist 目录 ---
        if (fs.existsSync(distDir)) {
            fs.rmSync(distDir, { recursive: true, force: true });
            console.log("已经帮主人清空 dist 目录了喵");
        }

        // --- 构建 vite dist ---
        execSync(`npm run build`, { stdio: 'inherit' });

        // --- dist 空目录检测 ---
        const distFiles = fs.readdirSync(distDir);
        if (distFiles.length === 0) {
            console.log("dist 目录没东西喵，gh-pages 上传跳过了喵o(〃＾▽＾〃)o");
            process.exit(0);
        }

        // --- 生成 dist hash / 版本号 ---
        const version = `v-${Date.now()}`;
        fs.writeFileSync(path.join(distDir, 'version.txt'), version);
        console.log(`这次的 dist 版本号是 ${version} 喵(｡◕ ‿◕｡)`);

        // --- 将 deploy.js 也拷贝到 dist ---
        const deploySrc = path.resolve('deploy.js');
        const deployDest = path.join(distDir, 'deploy.js');
        fs.copyFileSync(deploySrc, deployDest);

        // --- 上传 dist 到 gh-pages ---
        console.log(`本喵要部署 dist 到 gh-pages 分支了喵，主人的 commit 描述是 "${ghMsg}" 喵`);
        await git.checkoutLocalBranch('gh-pages-temp');
        await git.add(distDir + '/*');
        await git.add(path.join(distDir, 'deploy.js'));
        await git.commit(ghMsg);
        await git.push('origin', 'gh-pages', {'-f': null});
        await git.checkout('main');
        await git.branch(['-D', 'gh-pages-temp']);

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

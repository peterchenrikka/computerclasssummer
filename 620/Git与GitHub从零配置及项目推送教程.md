# Git 与 GitHub 从零配置、初始化和推送完整教程

> 适用环境：Windows 10/11、VS Code、PowerShell、GitHub。
>
> 示例账号：`peterchenrikka`
>
> 示例邮箱：`peterchenrikka@gmail.com`
>
> 示例项目：`computerclasssummer`
>
> 示例仓库：<https://github.com/peterchenrikka/computerclasssummer>

这份教程是给“换了一台新电脑，什么都没配过”的自己看的。不要怕命令行。绝大多数时候，你只需要把命令复制到 VS Code 的 PowerShell 终端，按回车，然后看有没有报错。

---

## 目录

1. [先理解 Git、GitHub 和几个常用词](#一先理解-gitgithub-和几个常用词)
2. [这次项目实际完成了什么](#二这次项目实际完成了什么)
3. [新电脑第一步：安装 Git](#三新电脑第一步安装-git)
4. [配置 Git 用户名、邮箱和默认行为](#四配置-git-用户名邮箱和默认行为)
5. [配置 GitHub SSH 登录](#五配置-github-ssh-登录推荐)
6. [把一个新项目初始化为 Git 仓库](#六把一个新项目初始化为-git-仓库)
7. [在 GitHub 创建远程仓库](#七在-github-创建远程仓库)
8. [连接远程仓库并首次推送](#八连接远程仓库并首次推送)
9. [以后每天怎么提交和推送](#九以后每天怎么提交和推送)
10. [换电脑后如何下载已有项目](#十换电脑后如何下载已有项目)
11. [本项目当前的真实配置](#十一本项目当前的真实配置)
12. [常见错误和解决办法](#十二常见错误和解决办法)
13. [安全注意事项](#十三安全注意事项)
14. [一页式速查表](#十四一页式速查表)
15. [本次失败过程复盘与最终解决方案](#十五本次失败过程复盘与最终解决方案)

---

## 一、先理解 Git、GitHub 和几个常用词

### 1. Git 是什么

Git 是安装在电脑上的“代码版本管理工具”。它能记录文件在不同时间的状态。

可以把 Git 想象成游戏存档：

- 修改代码：正在玩游戏。
- `git add`：选择本次要保存的内容。
- `git commit`：创建一个本地存档。
- `git push`：把本地存档上传到 GitHub。

Git 不等于 GitHub。没有网络时，Git 仍然可以在本地使用。

### 2. GitHub 是什么

GitHub 是一个放 Git 仓库的网站。它可以：

- 在云端备份代码；
- 在不同电脑之间同步代码；
- 查看历史提交；
- 和别人协作开发。

### 3. 仓库 repository 是什么

一个被 Git 管理的项目文件夹叫“仓库”，英文是 repository，常缩写为 repo。

项目根目录中会有一个隐藏的 `.git` 文件夹。它保存历史记录和仓库配置。

不要手动修改或删除 `.git` 文件夹。删除它不会删除代码，但会删除这个项目的 Git 历史和配置。

### 4. 本地仓库和远程仓库

- 本地仓库：电脑里的项目和提交历史。
- 远程仓库：GitHub 上的项目和提交历史。
- `origin`：远程仓库的常用别名。
- `main`：主分支的常用名称。

### 5. 工作区、暂存区和提交

Git 的过程可以理解成：

```text
修改文件 -> git add -> 暂存区 -> git commit -> 本地历史 -> git push -> GitHub
```

`git add` 和 `git commit` 都不会上传网络。只有 `git push` 才会把提交上传到远程仓库。

---

## 二、这次项目实际完成了什么

这次在 `D:\computerclasssummer` 项目中完成了下面这些事情：

1. 安装 Git `2.54.0.windows.1`。
2. 把 Git 加入 Windows 用户 `PATH`。
3. 配置全局 Git 身份：

   ```text
   用户名：peterchenrikka
   邮箱：peterchenrikka@gmail.com
   ```

4. 设置新仓库默认分支为 `main`。
5. 设置 Windows 换行处理 `core.autocrlf=true`。
6. 在项目根目录创建 `.gitignore`。
7. 使用 `git init -b main` 初始化仓库。
8. 创建第一次提交：

   ```text
   58255b7 Initial commit
   ```

9. 一开始尝试 HTTPS 推送，但当前网络不能连接 `github.com:443`。
10. 改用 GitHub SSH 的 443 端口。
11. 创建专用 SSH 密钥 `id_ed25519_github`。
12. 把公钥添加到 GitHub 账号。
13. 把远程仓库地址切换为：

    ```text
    ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
    ```

14. 成功把 `main` 分支推送到 GitHub。
15. 建立本地 `main` 与远程 `origin/main` 的跟踪关系。

这次最终成功使用的是“Git + SSH 密钥 + SSH 443 端口”方案。这个方案不需要每次输入 GitHub 密码，也不需要把令牌写进项目。

---

## 三、新电脑第一步：安装 Git

### 方法 A：使用官方安装程序，最适合新手

1. 打开 Git 官方 Windows 下载页：<https://git-scm.com/install/windows>
2. 下载 64 位 Windows 安装程序。
3. 双击安装。
4. 如果你不知道某一页应该选什么，就保留默认选项并点 `Next`。
5. 安装结束后，完全退出并重新打开 VS Code。

为什么要重启 VS Code？因为安装程序会修改 Windows 的 `PATH`。已经打开的 VS Code 可能还不知道 Git 在哪里。

### 方法 B：使用 winget

如果新电脑已经有 `winget`，可以在 PowerShell 中运行：

```powershell
winget install --id Git.Git -e --source winget
```

安装结束后，完全退出并重新打开 VS Code。

### 检查 Git 是否安装成功

在 VS Code 中点击：

```text
顶部菜单 Terminal（终端） -> New Terminal（新建终端）
```

确保右下角或终端标签显示的是 PowerShell，然后输入：

```powershell
git --version
```

正常结果类似：

```text
git version 2.54.0.windows.1
```

版本号以后可能不同，这是正常的。

如果提示“无法将 git 识别为命令”：

1. 完全关闭所有 VS Code 窗口；
2. 重新打开 VS Code；
3. 再运行 `git --version`；
4. 仍然失败就重新安装 Git，并确认安装时选择了把 Git 加入命令行环境。

---

## 四、配置 Git 用户名、邮箱和默认行为

这些命令通常每台新电脑只需要运行一次。

### 1. 配置用户名

```powershell
git config --global user.name "peterchenrikka"
```

### 2. 配置邮箱

```powershell
git config --global user.email "peterchenrikka@gmail.com"
```

用户名和邮箱会写进以后创建的提交记录。邮箱最好使用 GitHub 账号绑定的邮箱。

### 3. 设置默认分支为 main

```powershell
git config --global init.defaultBranch main
```

### 4. 设置 Windows 换行处理

```powershell
git config --global core.autocrlf true
```

Windows 常用 CRLF 换行，Linux 和 Git 仓库常用 LF。这个设置能减少换行格式问题。

### 5. 检查配置

分别运行：

```powershell
git config --global --get user.name
git config --global --get user.email
git config --global --get init.defaultBranch
git config --global --get core.autocrlf
```

应该依次看到：

```text
peterchenrikka
peterchenrikka@gmail.com
main
true
```

也可以一次查看所有全局配置：

```powershell
git config --global --list
```

---

## 五、配置 GitHub SSH 登录（推荐）

### 1. 为什么需要 SSH 密钥

GitHub 不允许用账号密码直接执行 Git 推送。SSH 密钥相当于“这台电脑的专用通行证”。

SSH 密钥通常有两个文件：

- 私钥：没有 `.pub` 后缀，只能保存在自己的电脑上。
- 公钥：有 `.pub` 后缀，可以添加到 GitHub。

千万不要把私钥发给别人，也不要把私钥上传到仓库。

### 2. 检查是否已经有密钥

在 PowerShell 中运行：

```powershell
Get-ChildItem "$HOME\.ssh"
```

如果提示路径不存在，说明还没有 `.ssh` 文件夹，可以继续生成。

如果已经有密钥，不要随便覆盖。可以创建一个名字不同的 GitHub 专用密钥。

### 3. 创建 GitHub 专用 SSH 密钥

运行：

```powershell
ssh-keygen -t ed25519 -C "peterchenrikka@gmail.com" -f "$HOME\.ssh\id_ed25519_github"
```

接下来终端会询问 passphrase，也就是密钥密码。

- 想简单一点：直接按两次回车，表示不设置密码。
- 更重视安全：输入一个自己记得住的密码，再输入一次确认。

成功后会生成：

```text
C:\Users\你的Windows用户名\.ssh\id_ed25519_github
C:\Users\你的Windows用户名\.ssh\id_ed25519_github.pub
```

第一个是私钥，第二个是公钥。

### 4. 复制公钥

运行：

```powershell
(Get-Content -Raw "$HOME\.ssh\id_ed25519_github.pub").Trim() | Set-Clipboard
```

这条命令会把公钥复制到剪贴板。

公钥应该是一整行，开头类似：

```text
ssh-ed25519 AAAAC3...
```

不要复制私钥。私钥文件内容通常以 `-----BEGIN OPENSSH PRIVATE KEY-----` 开头，那不是应该粘贴到 GitHub 的内容。

### 5. 把公钥添加到 GitHub

1. 登录 GitHub。
2. 打开：<https://github.com/settings/ssh/new>
3. `Title` 填一个能认出电脑的名字，例如：

   ```text
   Lenovo computer
   ```

4. `Key type` 保持 `Authentication Key`。
5. 在 `Key` 输入框中按 `Ctrl+V`。
6. 点击 `Add SSH key`。
7. 如果 GitHub 要求验证密码或两步验证码，按页面提示完成。

如果出现：

```text
Key is invalid. You must supply a key in OpenSSH public key format
```

说明粘贴的内容不是正确公钥。重新执行复制命令，并确认粘贴的是以 `ssh-ed25519` 开头的一整行。

### 6. 测试标准 SSH 连接

先尝试 GitHub 标准 SSH 端口 22：

```powershell
ssh -i "$HOME\.ssh\id_ed25519_github" -o IdentitiesOnly=yes -T git@github.com
```

第一次连接可能看到：

```text
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

输入：

```text
yes
```

成功时会看到类似：

```text
Hi peterchenrikka! You've successfully authenticated, but GitHub does not provide shell access.
```

这句话虽然包含“不提供 shell access”，但前半句已经说明认证成功，所以这是正常成功结果。

### 7. 如果端口 22 不通，使用 SSH 443 端口

学校、公司或某些网络可能屏蔽 SSH 的 22 端口。可以测试 GitHub SSH 的 443 端口：

```powershell
ssh -i "$HOME\.ssh\id_ed25519_github" -o IdentitiesOnly=yes -T -p 443 git@ssh.github.com
```

如果看到下面这句话，就说明 SSH 443 可用：

```text
Hi peterchenrikka! You've successfully authenticated, but GitHub does not provide shell access.
```

本项目就是因为 HTTPS 的 `github.com:443` 无法连接，最后使用 SSH 443 推送成功。

### 8. 推荐为新电脑配置 SSH 443

运行：

```powershell
notepad "$HOME\.ssh\config"
```

如果记事本询问是否创建新文件，选择“是”。粘贴下面内容：

```text
Host github.com
    HostName ssh.github.com
    User git
    Port 443
    IdentityFile ~/.ssh/id_ed25519_github
    IdentitiesOnly yes
```

保存并关闭记事本。

以后使用 `git@github.com:用户名/仓库名.git` 时，SSH 会自动通过 `ssh.github.com:443` 连接，并使用这把专用密钥。

再次测试：

```powershell
ssh -T git@github.com
```

---

## 六、把一个新项目初始化为 Git 仓库

下面以本项目路径为例：

```text
D:\computerclasssummer
```

### 1. 在 VS Code 中打开项目根目录

注意：应该打开 `computerclasssummer` 文件夹，而不是只打开其中一个 Python 文件。

### 2. 进入项目根目录

在 PowerShell 中运行：

```powershell
cd D:\computerclasssummer
```

查看当前位置：

```powershell
Get-Location
```

应该看到：

```text
D:\computerclasssummer
```

### 3. 创建 `.gitignore`

`.gitignore` 用来告诉 Git 哪些文件不应该提交。

本项目当前内容是：

```gitignore
__pycache__/
*.py[cod]
.venv/
venv/
.idea/
.vscode/
.agents/
.git-tools/
```

这些规则主要忽略：

- Python 缓存；
- Python 虚拟环境；
- PyCharm 和 VS Code 的本地设置；
- 本地代理和临时工具目录。

不要把密码、令牌、私钥或 `.env` 上传。项目如果使用 `.env`，应该再加：

```gitignore
.env
.env.*
```

### 4. 初始化仓库

运行：

```powershell
git init -b main
```

它会在当前目录创建隐藏的 `.git` 文件夹，并使用 `main` 作为初始分支。

检查状态：

```powershell
git status
```

### 5. 把文件放入暂存区

```powershell
git add --all
```

`--all` 表示把当前仓库中的新增、修改和删除都放入暂存区。

再次检查：

```powershell
git status
```

准备提交的文件通常会显示为绿色。

### 6. 创建第一次提交

```powershell
git commit -m "Initial commit"
```

`Initial commit` 的意思是“初始提交”。

检查提交：

```powershell
git log --oneline
```

本项目第一次提交是：

```text
58255b7 Initial commit
```

注意：提交编号在不同仓库里会不同，不要要求新项目也必须出现 `58255b7`。

---

## 七、在 GitHub 创建远程仓库

1. 登录 GitHub。
2. 打开：<https://github.com/new>
3. `Owner` 选择 `peterchenrikka`。
4. `Repository name` 填：

   ```text
   computerclasssummer
   ```

5. 选择 `Private` 或 `Public`：

   - `Private`：只有自己和被邀请的人能看。
   - `Public`：所有人都能看。

6. 如果本地已经执行过 `git init` 和第一次提交，那么不要勾选：

   - Add a README file
   - Add .gitignore
   - Choose a license

7. 点击 `Create repository`。

为什么建议创建空仓库？因为本地和远程如果各自有不同的第一次提交，第一次推送时更容易发生历史冲突。

---

## 八、连接远程仓库并首次推送

### 方案 A：已经配置了 SSH config

添加远程地址：

```powershell
git remote add origin git@github.com:peterchenrikka/computerclasssummer.git
```

查看远程地址：

```powershell
git remote -v
```

首次推送：

```powershell
git push -u origin main
```

`-u` 会建立跟踪关系。以后只需要运行：

```powershell
git push
```

### 方案 B：直接在远程地址中指定 SSH 443

这是本项目目前实际使用的方式：

```powershell
git remote add origin ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
```

指定这个项目使用的密钥：

```powershell
git config core.sshCommand "ssh -i C:/Users/你的Windows用户名/.ssh/id_ed25519_github -o IdentitiesOnly=yes"
```

注意把 `你的Windows用户名` 改成新电脑实际用户名。

首次推送：

```powershell
git push -u origin main
```

成功结果类似：

```text
branch 'main' set up to track 'origin/main'.
To ssh://ssh.github.com:443/peterchenrikka/computerclasssummer.git
 * [new branch]      main -> main
```

### 检查本地和远程是否同步

```powershell
git status --short --branch
```

同步时类似：

```text
## main...origin/main
```

也可以比较提交编号：

```powershell
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

本地 `HEAD` 和远程 `main` 的长提交编号相同，就说明推送成功。

---

## 九、以后每天怎么提交和推送

日常工作基本只需要下面几个步骤。

### 1. 开始工作前拉取远程更新

如果只有自己在一台电脑上开发，这一步有时没有新内容，但执行一下更稳：

```powershell
git pull --rebase
```

### 2. 修改并保存文件

在 VS Code 中正常写代码，记得按 `Ctrl+S` 保存。

### 3. 查看修改

```powershell
git status
```

查看具体修改内容：

```powershell
git diff
```

### 4. 暂存修改

暂存全部修改：

```powershell
git add --all
```

只暂存一个文件：

```powershell
git add 620/helloword.py
```

### 5. 创建提交

```powershell
git commit -m "说明这次改了什么"
```

例子：

```powershell
git commit -m "Add hello world output"
```

好的提交信息应该简单说明“这次做了什么”。不要每次都写 `update`、`111` 或 `随便改改`。

### 6. 推送到 GitHub

```powershell
git push
```

### 7. 最后检查

```powershell
git status
```

理想结果是：

```text
nothing to commit, working tree clean
```

完整的日常命令可以记成：

```powershell
git status
git add --all
git commit -m "Describe the change"
git push
```

---

## 十、换电脑后如何下载已有项目

如果 GitHub 上已经有仓库，新电脑通常不需要再次 `git init`。正确做法是 `git clone`。

### 1. 在新电脑完成前置配置

先完成：

1. 安装 Git；
2. 配置用户名和邮箱；
3. 创建新的 SSH 密钥；
4. 把新公钥添加到 GitHub；
5. 测试 SSH 登录。

建议每台电脑生成自己的密钥。这样以后丢失某台电脑时，只需要在 GitHub 删除那台电脑对应的公钥。

### 2. 选择保存项目的位置

例如想放在 `D:\projects`：

```powershell
New-Item -ItemType Directory -Force D:\projects
cd D:\projects
```

### 3. 克隆项目

如果已经配置 SSH config：

```powershell
git clone git@github.com:peterchenrikka/computerclasssummer.git
```

如果要直接使用 SSH 443：

```powershell
git clone ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
```

### 4. 进入项目

```powershell
cd computerclasssummer
```

### 5. 用 VS Code 打开

```powershell
code .
```

`.` 表示当前文件夹。

### 6. 检查

```powershell
git status
git remote -v
git log --oneline -5
```

### 7. 不要这样做

如果是从 GitHub 克隆已有项目，不要再次运行：

```powershell
git init
```

`git clone` 已经会自动下载 `.git` 历史并设置 `origin`。

---

## 十一、本项目当前的真实配置

截至本教程创建时，本项目配置如下。

### 项目根目录

```text
D:\computerclasssummer
```

### GitHub 仓库

```text
https://github.com/peterchenrikka/computerclasssummer
```

### 当前分支

```text
main
```

### 当前远程地址

```text
ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
```

### 当前项目专用 SSH 命令

```text
ssh -i C:/Users/Lenovo/.ssh/id_ed25519_github -o IdentitiesOnly=yes
```

### 当前 SSH 密钥位置

```text
私钥：C:\Users\Lenovo\.ssh\id_ed25519_github
公钥：C:\Users\Lenovo\.ssh\id_ed25519_github.pub
```

### 当前首次提交

```text
58255b7 Initial commit
```

### 查看这些配置的命令

```powershell
git status --short --branch
git remote -v
git config --get core.sshCommand
git config --global --get user.name
git config --global --get user.email
git log --oneline --decorate -5
```

---

## 十二、常见错误和解决办法

### 错误 1：无法将 git 识别为命令

错误类似：

```text
git : 无法将“git”项识别为 cmdlet、函数、脚本文件或可运行程序的名称
```

原因：Git 没安装，或者安装后 VS Code 还没有读取新的 PATH。

解决：

1. 安装 Git；
2. 完全关闭 VS Code；
3. 重新打开 VS Code；
4. 运行 `git --version`。

### 错误 2：Author identity unknown

原因：没有配置提交用户名和邮箱。

解决：

```powershell
git config --global user.name "peterchenrikka"
git config --global user.email "peterchenrikka@gmail.com"
```

### 错误 3：not a git repository

错误类似：

```text
fatal: not a git repository (or any of the parent directories): .git
```

可能原因：

- 终端不在项目目录；
- 项目还没执行 `git init`；
- `.git` 被删除或损坏。

先检查位置：

```powershell
Get-Location
Get-ChildItem -Force
```

如果是全新的本地项目，进入正确目录后运行：

```powershell
git init -b main
```

### 错误 4：remote origin already exists

错误：

```text
error: remote origin already exists.
```

原因：已经有名为 `origin` 的远程地址。

先查看：

```powershell
git remote -v
```

如果地址错误，修改：

```powershell
git remote set-url origin ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
```

不要重复运行 `git remote add origin ...`。

### 错误 5：src refspec main does not match any

原因通常是还没有任何提交，或者当前分支不是 `main`。

检查：

```powershell
git status
git branch
git log --oneline
```

如果还没有提交：

```powershell
git add --all
git commit -m "Initial commit"
git push -u origin main
```

### 错误 6：Failed to connect to github.com port 443

本项目实际遇到过：

```text
fatal: unable to access 'https://github.com/...':
Failed to connect to github.com port 443
```

原因：当前网络无法访问 GitHub 的 HTTPS 地址。

本项目采用的解决办法是使用 GitHub SSH 443：

```powershell
git remote set-url origin ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
git config core.sshCommand "ssh -i C:/Users/你的Windows用户名/.ssh/id_ed25519_github -o IdentitiesOnly=yes"
git push -u origin main
```

前提是已经把对应的 `.pub` 公钥添加到 GitHub。

### 错误 7：Permission denied (publickey)

错误：

```text
git@ssh.github.com: Permission denied (publickey).
```

可能原因：

- 公钥没有添加到 GitHub；
- 使用了错误的私钥；
- GitHub 账号不是仓库拥有者；
- `core.sshCommand` 中的路径写错。

检查公钥：

```powershell
Get-Content "$HOME\.ssh\id_ed25519_github.pub"
```

测试认证：

```powershell
ssh -i "$HOME\.ssh\id_ed25519_github" -o IdentitiesOnly=yes -T -p 443 git@ssh.github.com
```

检查项目 SSH 配置：

```powershell
git config --get core.sshCommand
```

### 错误 8：Repository not found

可能原因：

- GitHub 仓库还没创建；
- 用户名或仓库名拼错；
- 仓库是私有的，而当前密钥没有权限；
- 远程地址指向别人的仓库。

查看地址：

```powershell
git remote -v
```

浏览器检查：

```text
https://github.com/peterchenrikka/computerclasssummer
```

### 错误 9：Key is invalid

GitHub 页面提示：

```text
Key is invalid. You must supply a key in OpenSSH public key format
```

解决：

```powershell
$pub = (Get-Content -Raw "$HOME\.ssh\id_ed25519_github.pub").Trim()
$pub | Set-Clipboard
$pub
```

确认输出以 `ssh-ed25519` 开头，然后删除网页输入框原内容，重新粘贴完整的一整行。

### 错误 10：non-fast-forward

错误通常包含：

```text
rejected
non-fast-forward
```

原因：远程仓库有本地没有的新提交。

先拉取并把本地提交接到远程提交之后：

```powershell
git pull --rebase origin main
```

没有冲突后再推送：

```powershell
git push
```

不要一看到这个错误就使用 `git push --force`。强制推送可能覆盖远程历史。

### 错误 11：LF will be replaced by CRLF

警告类似：

```text
warning: LF will be replaced by CRLF
```

这是 Windows 换行提示，通常不是失败。提交仍然可以成功。

本机已经配置：

```powershell
git config --global core.autocrlf true
```

### 错误 12：nothing to commit

提示：

```text
nothing to commit, working tree clean
```

这不是错误。它表示没有新的已保存修改需要提交。

如果你明明改了文件：

1. 确认在 VS Code 中按了 `Ctrl+S`；
2. 确认终端位于正确仓库；
3. 检查文件是否被 `.gitignore` 忽略。

检查某个文件为什么被忽略：

```powershell
git check-ignore -v 文件路径
```

---

## 十三、安全注意事项

### 1. 永远不要提交这些内容

- GitHub Personal Access Token；
- SSH 私钥；
- 密码；
- 数据库连接密码；
- 云服务密钥；
- `.env` 中的秘密；
- 身份证、银行卡等隐私信息。

### 2. 公钥可以公开，私钥绝对不能公开

可以添加到 GitHub 的是：

```text
id_ed25519_github.pub
```

不能发送、不能上传的是：

```text
id_ed25519_github
```

### 3. 不要把令牌发到聊天里

如果需要 GitHub Token，只在自己电脑的安全输入框中粘贴。令牌一旦泄露，应立刻去 GitHub 设置中撤销。

### 4. 丢失电脑后的处理

登录 GitHub，进入：

```text
Settings -> SSH and GPG keys
```

删除丢失电脑对应的 SSH Key。其他电脑的 Key 不需要删除。

### 5. 推送前检查内容

```powershell
git status
git diff
git diff --cached
```

- `git diff`：查看还没暂存的修改。
- `git diff --cached`：查看即将提交的修改。

---

## 十四、一页式速查表

### 新电脑只做一次

```powershell
# 检查 Git
git --version

# 配置身份
git config --global user.name "peterchenrikka"
git config --global user.email "peterchenrikka@gmail.com"
git config --global init.defaultBranch main
git config --global core.autocrlf true

# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "peterchenrikka@gmail.com" -f "$HOME\.ssh\id_ed25519_github"

# 复制公钥，然后添加到 https://github.com/settings/ssh/new
(Get-Content -Raw "$HOME\.ssh\id_ed25519_github.pub").Trim() | Set-Clipboard

# 测试 SSH 443
ssh -i "$HOME\.ssh\id_ed25519_github" -o IdentitiesOnly=yes -T -p 443 git@ssh.github.com
```

### 新项目第一次上传

```powershell
cd D:\computerclasssummer
git init -b main
git add --all
git commit -m "Initial commit"
git remote add origin ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
git config core.sshCommand "ssh -i C:/Users/你的Windows用户名/.ssh/id_ed25519_github -o IdentitiesOnly=yes"
git push -u origin main
```

### 日常提交

```powershell
git status
git add --all
git commit -m "说明这次改了什么"
git push
```

### 新电脑下载已有项目

```powershell
cd D:\projects
git clone ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
cd computerclasssummer
code .
```

### 随时检查

```powershell
git status --short --branch
git remote -v
git log --oneline --decorate -5
```

---

## 十五、本次失败过程复盘与最终解决方案

这一章专门记录本项目从“电脑没有可用 Git”到“成功推送 GitHub”的完整失败过程。

这部分非常重要，因为实际操作通常不会像标准教程那样一次成功。以后换电脑时，如果再次遇到类似问题，可以先对照本章判断：到底是代码问题、Git 配置问题、登录问题，还是网络问题。

### 1. 最终结论先说

本次失败的主要原因不是 Python 文件，也不是 Git 提交内容，而是下面三个环境问题叠加：

1. 最开始电脑没有可直接调用的 Git 和 GitHub CLI。
2. 安装 Git 后，已经打开的 VS Code 没有立刻读取新的 `PATH`。
3. 当前网络不能正常连接 HTTPS 的 `github.com:443`，导致 GitHub 登录和 HTTPS 推送超时。

最后成功的方案是：

```text
安装 Git
    ↓
配置 Git 用户名和邮箱
    ↓
初始化本地仓库并创建 Initial commit
    ↓
创建 GitHub 仓库
    ↓
生成 SSH 密钥并把公钥添加到 GitHub
    ↓
放弃无法连接的 HTTPS 地址
    ↓
改用 ssh.github.com 的 SSH 443 端口
    ↓
成功推送 main 分支
```

最终使用的远程地址：

```text
ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
```

最终使用的项目 SSH 配置：

```text
ssh -i C:/Users/Lenovo/.ssh/id_ed25519_github -o IdentitiesOnly=yes
```

### 2. 失败过程总表

| 阶段 | 看到的现象或错误 | 真正原因 | 最后怎么处理 |
| --- | --- | --- | --- |
| 检查环境 | `git` 无法识别 | Git 没安装或不在 PATH | 安装便携版 Git 并加入用户 PATH |
| 检查 GitHub 工具 | `gh` 无法识别 | GitHub CLI 没安装 | 下载并安装 GitHub CLI |
| 下载 Git | 官方 GitHub 下载超时 | 当前网络连接 GitHub 下载地址很慢 | 改用国内镜像下载 Git for Windows |
| 安装后使用 | 当前终端仍找不到 Git | VS Code 是安装前启动的，没有读取新 PATH | 完全退出并重新打开 VS Code |
| 初始化仓库 | 看见 `.git`，但提示 `not a git repository` | `.git` 只是失败操作留下的空目录，不是完整仓库 | 删除空目录并重新执行 `git init -b main` |
| GitHub CLI 登录 | `gh auth status` 显示未登录 | 令牌或网页授权没有成功保存 | 不再依赖 GitHub CLI 登录，改用 SSH |
| 网页设备授权 | 请求 `github.com/login/device/code` 超时 | 当前网络无法稳定连接 `github.com:443` | 放弃设备登录流程 |
| HTTPS 推送 | `Failed to connect to github.com port 443` | 网络问题，不是用户名、提交或仓库地址格式问题 | 改用 SSH 443 通道 |
| 第一次 SSH 测试 | `Permission denied (publickey)` | 电脑还没有可被 GitHub 识别的 SSH 密钥 | 生成 Ed25519 密钥并添加公钥 |
| 添加 SSH Key | `Key is invalid` | 剪贴板内容不完整或包含了错误内容 | 重新读取 `.pub` 文件、去掉首尾空白并复制整行 |
| 最后推送 | 出现 `main -> main` | SSH 认证、远程地址和提交都正确 | 推送成功 |

### 3. 第一次失败：电脑找不到 git 和 gh

最开始运行：

```powershell
git --version
gh --version
```

终端提示无法识别 `git` 和 `gh`。

这表示命令行根本找不到这两个程序。此时继续执行 `git init`、`git commit` 或 `git push` 都不会成功。

#### 当时的处理

Git 被安装到：

```text
C:\Users\Lenovo\AppData\Local\Programs\MinGit
```

Git 的命令目录被加入用户 PATH：

```text
C:\Users\Lenovo\AppData\Local\Programs\MinGit\cmd
```

然后验证：

```powershell
git --version
```

成功输出：

```text
git version 2.54.0.windows.1
```

#### 学到的经验

安装软件不代表已经打开的终端马上能使用它。PATH 改变后，最稳妥的操作是完全退出 VS Code，再重新打开。

### 4. 第二次失败：官方 GitHub 下载超时

最开始尝试从 GitHub 官方 Release 下载便携版 Git 和 GitHub CLI，但下载长时间没有完成，最终超时。

这不是安装包损坏，而是当前网络访问 GitHub Release 不稳定。

#### 当时的处理

Git for Windows 改用国内镜像下载，速度恢复正常。GitHub CLI 后来从官方发布地址下载完成，只是速度较慢。

#### 以后怎么做

在新电脑上，优先使用：

```powershell
winget install --id Git.Git -e --source winget
```

或者直接打开 Git 官方安装页：

```text
https://git-scm.com/install/windows
```

这样比手动处理便携版更适合普通使用。

### 5. 第三次失败：有 `.git` 文件夹，却不是 Git 仓库

项目中一度出现了一个空的 `.git` 目录，但运行：

```powershell
git status
```

仍然提示：

```text
fatal: not a git repository (or any of the parent directories): .git
```

#### 真正原因

一个有效的 `.git` 目录里面应该有 `HEAD`、`config`、`objects`、`refs` 等内容。只有一个空目录，不代表仓库初始化成功。

#### 当时的处理

确认 `.git` 是失败操作留下的空目录后，将它清理，然后重新运行：

```powershell
git init -b main
```

接着运行：

```powershell
git add --all
git commit -m "Initial commit"
```

最终创建了第一次提交：

```text
58255b7 Initial commit
```

#### 重要提醒

以后不要看到 `.git` 有问题就直接删除。只有在百分之百确认它是空目录或无用的失败残留时才能清理。正常项目中的 `.git` 保存全部版本历史，删掉会造成严重损失。

### 6. 第四次失败：GitHub CLI 一直没有登录成功

安装 GitHub CLI 后运行：

```powershell
gh auth status
```

仍然显示：

```text
You are not logged into any GitHub hosts.
```

后来尝试网页设备授权，GitHub CLI 需要访问：

```text
https://github.com/login/device/code
```

但请求超时。

#### 真正原因

问题不在账号密码，而是终端无法稳定连接 `github.com:443`。设备授权的第一步就无法完成，所以授权信息当然不会保存。

#### 为什么没有继续折腾 Token

Token 必须谨慎保管，不能粘贴到聊天或提交进仓库。既然 SSH 443 可以连接，就没有必要继续让 Token 登录流程变得更复杂。

最后选择 SSH，是更适合当前网络的方案。

### 7. 第五次失败：HTTPS push 超时

当时远程地址是：

```text
https://github.com/peterchenrikka/computerclasssummer.git
```

运行：

```powershell
git push -u origin main
```

出现错误：

```text
fatal: unable to access 'https://github.com/peterchenrikka/computerclasssummer.git/':
Failed to connect to github.com port 443 after 21093 ms:
Could not connect to server
```

#### 如何判断这不是代码问题

错误发生在“连接服务器”阶段，关键词是：

```text
Failed to connect
port 443
Could not connect to server
```

它没有说提交冲突、分支不存在或仓库权限不足。因此：

- `helloword.py` 没问题；
- `git commit` 没问题；
- `main` 分支没问题；
- 失败点在网络连接。

修改 Python 代码、重新 `git add` 或重新 `git commit` 都解决不了这个错误。

### 8. 寻找替代通道：测试 SSH 443

GitHub 除了 HTTPS，还提供 SSH。标准 SSH 使用 22 端口，但 GitHub 也支持通过 `ssh.github.com` 的 443 端口连接。

测试命令：

```powershell
ssh -T -p 443 git@ssh.github.com
```

当时服务器可以连接，但返回：

```text
Permission denied (publickey).
```

这个错误反而是一个有用的进展：

- 能收到 GitHub SSH 服务器的回复，说明网络通道是通的；
- `publickey` 失败只表示还没有正确配置 SSH 密钥。

所以接下来的任务从“解决网络”变成了“配置密钥”。

### 9. 第六次失败：GitHub 说 SSH Key 无效

创建密钥后，第一次往 GitHub 的 SSH Key 页面粘贴内容时，网页提示：

```text
Key is invalid. You must supply a key in OpenSSH public key format
```

#### 真正原因

GitHub 要求粘贴 `.pub` 公钥文件的一整行。第一次剪贴板可能没有正确同步，或者内容中混入了多余字符。

#### 最终正确的复制方法

```powershell
$pub = (Get-Content -Raw "$HOME\.ssh\id_ed25519_github.pub").Trim()
$pub | Set-Clipboard
$pub
```

然后检查输出：

- 必须以 `ssh-ed25519` 开头；
- 中间是一段 Base64 字符；
- 最后可以带邮箱备注；
- 整个公钥是一行；
- 不能粘贴没有 `.pub` 后缀的私钥。

重新复制正确公钥后，GitHub 接受了这把密钥。

### 10. 最终解决方案：SSH 密钥加 SSH 443

#### 第一步：生成专用 SSH 密钥

```powershell
ssh-keygen -t ed25519 -C "peterchenrikka@gmail.com" -f "$HOME\.ssh\id_ed25519_github"
```

生成的文件：

```text
C:\Users\Lenovo\.ssh\id_ed25519_github
C:\Users\Lenovo\.ssh\id_ed25519_github.pub
```

#### 第二步：复制并添加公钥

```powershell
(Get-Content -Raw "$HOME\.ssh\id_ed25519_github.pub").Trim() | Set-Clipboard
```

添加页面：

```text
https://github.com/settings/ssh/new
```

#### 第三步：验证 GitHub SSH 身份

```powershell
ssh -i "$HOME\.ssh\id_ed25519_github" -o IdentitiesOnly=yes -T -p 443 git@ssh.github.com
```

成功输出：

```text
Hi peterchenrikka! You've successfully authenticated, but GitHub does not provide shell access.
```

注意：`ssh -T` 在这个场景中可能返回退出码 1，但只要明确出现 `successfully authenticated`，身份验证就是成功的。GitHub 返回非零退出码，是因为它不提供普通 SSH Shell，并不代表密钥失败。

#### 第四步：把远程地址从 HTTPS 改成 SSH 443

```powershell
git remote set-url origin ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
```

#### 第五步：强制本项目使用正确私钥

```powershell
git config core.sshCommand "ssh -i C:/Users/Lenovo/.ssh/id_ed25519_github -o IdentitiesOnly=yes"
```

#### 第六步：检查配置

```powershell
git remote -v
git config --get core.sshCommand
```

应该看到：

```text
origin  ssh://git@ssh.github.com:443/peterchenrikka/computerclasssummer.git
ssh -i C:/Users/Lenovo/.ssh/id_ed25519_github -o IdentitiesOnly=yes
```

#### 第七步：再次推送

```powershell
git push -u origin main
```

最终成功输出包含：

```text
branch 'main' set up to track 'origin/main'.
To ssh://ssh.github.com:443/peterchenrikka/computerclasssummer.git
 * [new branch]      main -> main
```

#### 第八步：比较本地与远程提交

```powershell
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

当时两边都是：

```text
58255b7d85c5e5b5d7e42e353e1207e5c62c46fd
```

这证明 GitHub 上的 `main` 和本地 `main` 指向同一个提交，项目确实推送成功，而不是只在本地显示成功。

### 11. 为什么最后这个方案能成功

HTTPS 方案连接的是：

```text
github.com:443
```

最终 SSH 方案连接的是：

```text
ssh.github.com:443
```

它们虽然都使用 443 端口，但使用的主机和协议不同。当前网络到第一个地址失败，到第二个地址成功，因此更换通道解决了网络阻塞。

SSH 密钥又解决了身份认证问题：

```text
网络通道：ssh.github.com:443
身份凭据：id_ed25519_github 私钥
GitHub 账号：保存了对应公钥
仓库地址：peterchenrikka/computerclasssummer
```

这四项全部正确，`git push` 才最终成功。

### 12. 以后再次遇到 push 失败，按这个顺序排查

不要看到失败就反复执行 `git push`。按下面顺序检查，能更快找到问题。

#### 第一步：确认本地仓库正常

```powershell
git status
git log -1 --oneline
```

#### 第二步：确认远程地址

```powershell
git remote -v
```

#### 第三步：确认 SSH 密钥文件存在

```powershell
Test-Path "$HOME\.ssh\id_ed25519_github"
Test-Path "$HOME\.ssh\id_ed25519_github.pub"
```

两条都应该输出：

```text
True
```

#### 第四步：单独测试 GitHub 身份认证

```powershell
ssh -i "$HOME\.ssh\id_ed25519_github" -o IdentitiesOnly=yes -T -p 443 git@ssh.github.com
```

#### 第五步：检查项目使用哪把密钥

```powershell
git config --get core.sshCommand
```

#### 第六步：确认远程仓库可以读取

```powershell
git ls-remote origin
```

#### 第七步：最后再推送

```powershell
git push
```

### 13. 本次最重要的经验

1. 安装 Git 后要重启 VS Code，让 PATH 生效。
2. `.git` 空目录不等于有效 Git 仓库。
3. `git commit` 成功只代表本地保存成功，不代表已经上传 GitHub。
4. `Failed to connect` 是网络问题，不要通过乱改代码解决。
5. `Permission denied (publickey)` 说明 SSH 服务器能连接，但身份认证失败。
6. GitHub SSH Key 页面只能添加 `.pub` 公钥，不能添加私钥。
7. HTTPS 443 不通时，可以测试 `ssh.github.com:443`。
8. `successfully authenticated` 才是 SSH 身份验证成功的关键提示。
9. 首次推送用 `git push -u origin main`，以后只需要 `git push`。
10. 不要把 Token 或 SSH 私钥写进教程、聊天记录或 Git 仓库。

---

## 官方参考资料

- Git for Windows：<https://git-scm.com/install/windows>
- Git 官方文档：<https://git-scm.com/docs>
- GitHub SSH 连接说明：<https://docs.github.com/en/authentication/connecting-to-github-with-ssh>
- GitHub 添加 SSH Key：<https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account>
- GitHub 创建仓库：<https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository>
- GitHub 管理远程仓库：<https://docs.github.com/en/get-started/git-basics/managing-remote-repositories>

---

## 最后记住一句话

平时写完代码后，最核心的流程只有四步：

```powershell
git status
git add --all
git commit -m "写清楚改了什么"
git push
```

如果失败，不要乱删 `.git`，不要随便强制推送。先读错误信息，再到本教程的“常见错误”中查对应解决办法。

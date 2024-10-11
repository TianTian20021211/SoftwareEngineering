<<<<<<< HEAD
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
# 感觉可能会用到的东西

## git相关的

### 如何在本地版本回退

- `git log`命令可以展示所有的版本和版本号，按q即可退出页面
- 使用 `git reset --soft <版本号>` 可以撤销提交并保留本地更改
- 把 `soft`改成 `hard`就是不保留本地更改
- 理论上，执行 `git push origin <分支名> --force`可以强制提交指定版本

  - 可以通过 `git branch`查看本地分支是什么
  - `git branch -a`可以查看远端分支
- 但是由于master分支是被保护的，提交不上去
- 不知道如果把master分支取消保护是不是一个正确的做法
- 信息来源：[(15条消息) Gitlab 回滚到某个commit-CSDN博客](https://blog.csdn.net/AlbenXie/article/details/125038678)

### 如何提交commit

- git add .
- git commit -m "内容"
- git push

### 如何只commit一个文件

- git commit 文件名 -m ""

### 如何在上传时忽略某些文件

- 在问现所属于的文件夹中创建 `.gitignore`文件
- 在这个文件中使用特定语法说明你想上传或者不上传哪些文件
- 语法如下
  - `文件夹的路径/`表示不上传这个文件夹
    - 例：`node_modules/`
  - `*.后缀名`表示不上传这种后缀的文件
    - 例：`*.zip`
  - `文件名.后缀`表示不上传这个文件
    - 例：`index.html`
- 信息来源：[(15条消息) git上传忽略node_modules_git忽略node modules_懂懂kkw的博客-CSDN博客](https://blog.csdn.net/jiandan1127/article/details/81205530)

### 如何修改之前commit的内容

- 注意修改相当于重新提交一遍
- 用 `git status`命令可以查看本地和仓库差了几条commit
- 使用 `git commit --amend`可以调出修改上一条commit的vim界面
- 信息来源：[(15条消息) git-修改commit信息_Muscleape的博客-CSDN博客](https://blog.csdn.net/Muscleape/article/details/105637401)

### 如何检查自己在某次commit后修改了多少行

git diff --shortstat 那次commit的hash码

## react相关的

### 各个文件的作用

- `/public`：存放静态资源文件
- `index.html`：实现页面的示例代码
- `package.json`：记录项目的配置信息和依赖信息
- `package-lock.json`：记录项目依赖的精确版本信息
- `.gitignore`：选择上传的文件
- `/src`：想要实现文件夹目录，但是更改 `index.js`路径会报错

  - `index.js`：初始页面
  - `reportWebVitals.js`：收集和报告网页性能指标

    - 不知道有什么用，但是删掉之后程序会挂掉
  - `setupTests.js`：用来配置Jest测试（单元测试）框架
>>>>>>> e9a9ac370019255d8736ac40b2c7560a4cc425be

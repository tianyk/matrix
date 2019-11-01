## 简介

这是项目包含一个 ppt 制作后台，一个 PPT 市场前台。

## 后台

- 支持用户注册和登录
- 支持用户创建 MD 文件
- 支持 MD 文件预览为 PPT
- 支持 PPT 创建、编辑、删除、开发

## 前台

- 列出开放的所有 PPT
- 显示 PPT 的浏览量

## 愿景

reveal 这个 HTML 呈现框架可以很好的制作幻灯片。但是使用比较繁琐还需要部署。此项目让创建、部署、分享 ppt 变的简单。

fork 月影的 matrix。加入了用户注册和浏览率记录。同时 thinkjs 升级到了 3.0
希望此项目可以帮助公司建立自己内部的 ppt 分享平台

Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

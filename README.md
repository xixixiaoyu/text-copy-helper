# 划词复制助手 (Text Copy Helper)

[![Chrome Web Store](https://img.shields.io/badge/Chrome-v1.0-blue)](https://chrome.google.com/webstore)
[![Edge Add-on](https://img.shields.io/badge/Edge-v1.0-blue)](https://microsoftedge.microsoft.com/addons)

一个轻量级浏览器扩展，让文本复制更加便捷。当你在网页中选中任意文本时，会自动显示一个悬浮复制按钮，点击即可复制内容到剪贴板。

![划词复制助手演示](https://via.placeholder.com/640x400.png?text=划词复制助手演示)

## ✨ 功能特点

- 🚀 选中文本时立即显示复制按钮
- 🖱️ 一键复制选中内容
- 👍 复制成功时的视觉反馈
- 🔄 兼容Chrome和Edge浏览器
- 🛡️ 不收集任何用户数据
- 💻 适用于所有网页

## 📥 安装方法

### 从应用商店安装（即将上线）

- [Chrome Web Store](https://chrome.google.com/webstore)
- [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons)

### 开发者模式安装

1. 下载此项目源代码并解压
2. 打开浏览器的扩展管理页面：
   - Chrome: 访问 `chrome://extensions/`
   - Edge: 访问 `edge://extensions/`
3. 开启"开发者模式"（右上角切换开关）
4. 点击"加载已解压的扩展程序"按钮
5. 选择解压后的文件夹

## 🚀 使用方法

1. 安装插件后，打开任意网页
2. 选中你想复制的文本
3. 选中后会在附近出现蓝色"复制"按钮
4. 点击该按钮即可复制选中内容
5. 复制成功时按钮会变绿并显示"已复制"提示

## 🔧 技术实现

本插件使用以下技术实现：

- **HTML/CSS/JavaScript**: 核心开发语言
- **Chrome Extensions API**: 浏览器扩展API
- **Window Selection API**: 用于获取用户选中文本

## 📁 文件结构

```
text-copy-helper/
├── manifest.json      // 扩展清单文件
├── content.js         // 内容脚本
├── styles.css         // 样式表
├── README.md          // 项目说明
└── icons/             // 图标文件夹
    ├── icon16.png     // 16x16 图标
    ├── icon48.png     // 48x48 图标
    └── icon128.png    // 128x128 图标
```

## ⚙️ 自定义与配置

### 修改按钮样式

如果你想自定义按钮的外观，可以编辑 `styles.css` 文件：

- 修改颜色：更改 `background-color` 和 `color` 属性
- 调整大小：修改 `padding`、`font-size` 属性
- 更改动画效果：调整 `transition` 属性

### 创建自定义图标

你可以通过以下方式获取或创建图标：

1. 使用在线工具如 [Favicon.io](https://favicon.io/) 或 [Canva](https://www.canva.com/)
2. 从图标库如 [Flaticon](https://www.flaticon.com/) 或 [IconFinder](https://www.iconfinder.com/) 下载
3. 使用图像编辑软件创建16×16、48×48和128×128像素的PNG图标

## ❓ 常见问题

### Q: 为什么有些网页上插件不工作？
**A:** 某些网站可能使用了特定的安全策略，或者使用了复杂的JavaScript框架，可能会影响插件的功能。

### Q: 复制按钮会遮挡网页内容吗？
**A:** 复制按钮只在选中文本时临时显示，且会在点击其他区域或滚动页面时自动隐藏。

### Q: 插件是否会收集我的数据？
**A:** 不会。此插件完全在本地运行，不会收集或传输任何用户数据。

## 📄 许可证

MIT License © 2025

---

欢迎贡献代码、报告问题或提出功能建议！
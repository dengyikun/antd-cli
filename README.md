### 使用说明

``` bash
# 运行环境：node 6.0+ npm 3.0+

# 项目初始化安装
npm install

# 不同服务器的后端地址请在 webpack.*.js 中修改 WEBPACK_HOST
# dev 测试服务器
# local 开发服务器
# pro 产品服务器

# 热重载开发，对应 windows 与 mac 环境
npm run win
npm run mac

# 构建命令，根目录下生成 build_dev 与 build_pro 文件夹，对应测试服务器与产品服务器
# 部署时取相应目录文件到服务器即可
npm run build
```
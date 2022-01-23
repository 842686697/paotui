# 失物招领小程序

### 简介

>该项目是基于微信小程序和云开发所写出的微信小程序

### 功能

* 发布失物/拾物功能，信息编辑功能
* 与发布人联系并在小程序内聊天的功能

### 安装运行

    git clone https://github.com/842686697/paotui.git
    cd paotui
    npm run serve
	
	如果clone报错,就输入
    git init
    git config http.sslVerify "false"
	
### 注意事项

	1.请将app.js中env修改为自己的云开发环境ID
	2.请手动在云开发的数据库中创建message、list这两个集合

### 更新信息

>已将登陆api更新至微信小程序官方于2021年04月15日发布的最新api
>详见[微信小程序官方2021年04月15日公告](https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801)

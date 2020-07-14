# NKU-EAMIS_MiniApp
南开教务助手-微信小程序

----

2018.11.12 更新说明：

由于南开教务系统总是关闭外网访问，小程序的核心 API 接口无法与中间服务器对接，因此「只要外网不能访问教务系统，该小程序就无法使用」。想到的解决方案是加入南开大学的[代理服务](http://vpn.nankai.edu.cn)，这样便能让服务器远程爬取教务信息；或者等南开大学的域名支持 HTTPS ，便能符合微信小程序的要求，无需中间服务器直接进行访问。

**由于本人即将毕业，无力维护此项目，故停止更新。**

## 简介
一款便于使用教务系统的微信小程序

## 部署
由于教务系统没有使用HTTPS协议，不满足微信小程序的审核要求，无法通过小程序直连教务系统，因此需要额外使用中间服务器来进行数据抓取工作

服务端代码见[NKU-EAMIS_Server](https://github.com/zawnpn/NKU-EAMIS_Server)

## Demo
 - 登录页面
<img width="320" src="./pic/login.jpg"/>

 - 课表页面
<img width="320" src="./pic/table.jpg"/>

 - 此外，还有成绩查询、学分绩计算等功能

## 使用
 - 扫描小程序码：
<img width="240" src="./pic/minicode.jpg"/>

 - 或者：直接在微信小程序中搜索“南开教务助手”
 
## 详细信息
见 [NKU-EAMIS_MiniApp(南开大学教务助手小程序)](https://www.zhangwp.com/share/eamis-miniapp/)

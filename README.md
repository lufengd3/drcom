drcom
=====

Uestc沙河校区教育网拨号器

Windows客户端  http://pan.baidu.com/s/1dD3WAWx
Mac客户端 http://pan.baidu.com/s/1gdsxnyz

---
暑假刚搬到沙河，最初因为开vpn几分钟就掉线，抓包发现开vpn后机器连不上服务器了，所以掉线，这个帖子提供了解决方法  http://tieba.baidu.com/p/2890999039
```
@echo off
for /F "tokens=3" %%* in ('route print ^| findstr "\<0.0.0.0\>"') do set "gw=%%*"

ipconfig /flushdns
route add 202.115.254.0 mask 255.255.255.0 %gw% metric 25
pause
```

####It works.

##something

最终在万能的河畔搜到学长以前写的chrome插件，直接通过web方式登录，年久失修，正好听说node-webkit写可以写客户端软件，参考了前辈的代码，其实就是**往服务器发个请求，将登录数据post过去**，不清楚那个数据格式是谁分析出来的，(那个chrome插件被人指认抄袭代码...不清楚原作者是谁)。

由于node-webkit实际上相当于将网页打包在chromuim中，所以最终打包好的软件比较大，40M左右，为了不至于让他显得如此臃肿，本想再添加功能掩饰一下，最近比较忙，一直没时间弄就搁置下了，看到河畔上经常有同学在问沙河网络的问题，就先发出来吧。

---

##路由器wifi使用
由于使用web登录方式，登录后可直接关掉拨号器，通过在路由器设置静态ip可以不再掉线，即使断电也没关系，设置方法 http://chinafuck.xyz/routerset.html

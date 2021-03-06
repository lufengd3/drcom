drcom
=====

Uestc沙河校区教育网拨号器

下载地址:[https://lufengd3.github.io/drcom](https://lufengd3.github.io/drcom/index.html)

拨号器与学校官方提供的拨号方式不同，这个使用的是web方式登录，与之前有人提供的chrome插件类似，此软件使用node-webkit打包成了各个平台的桌面软件。

###11-22号更新说明:
此次更新只适用于12栋，登录方式没有变，路由器设置静态ip可能会掉线，由于目前属于过渡阶段，可能很快这种登录方式被替换，如果设置静态ip不行的话就每次路由器重启登录一下吧，等登录方式确定下来再看。

---

[路由器wifi设置方法](#)

---

Node-webkit 应用打包说明：

推荐使用npm包[node-webkit-builder](https://github.com/mllrsohn/node-webkit-builder).

安装好后在任意目录下输入命令`nwbuild -p win,osx,linux64,linux32 文件夹路径`

这样便可以打包出各个平台下的应用程序(具体命令参数请参照官方说明)。

此时在当前路径下会生成一个`build`文件夹，文件夹下是以应用程序名称命名的子文件夹，下一层目录则是对应各个平台的应用程序。

对于Windows，生成的目录下除.exe应用执行文件外还含有一些dll文件，如果你想将整个应用仅打包成一个.exe文件，可以下载[Enigma Virtual Box](http://enigmaprotector.com/cn/aboutvb.html)

Enigma virtual box 使用说明

1. 下载安装软件
2. 运行 `Enigma Virtual Box`
3. `Broswer`输入框选择上一步使用`nwbuild`打包出来的`build/win/*.exe`文件
4	拖动(或点击`Add`按钮选择添加)`build/win/`目录下的替他`*.dll`文件及`nw.pak`文件到``Files`空白处
5.  点击`File options`，选择`压缩文件`压缩应用程序，这一步不是必须的，但建议压缩一下，应为打包需要将node-webkit包含进去，体积较大会有70M左右
6.  点击`Process`开始打包
7.  打包结束后你会在之前的`build/win/*.exe`文件夹下看到一个*_boxed.exe文件，这个文件可单独执行，不依赖其他任何文件，此时可以直接分发或者压缩为压缩文件分发应用程序。

关于`build/win/`下文件说明：
- `nw.pak`文件包含了javasxript类库文件，`icudt.dll`是重要的网络库文件，这两个文件绝对不可删除。
- `ffmpegsumo.dll`是媒体类库文件, 如果你的应用程序使用到`<video>`和`<audio>`标签, 或者其他多媒体特性，不可删除此`dll`文件
- `libEGL.dll`，`libGLESv2.dll`，`D3DCompiler_43.dll`和`d3dx9_43.dll`是`WebGL`相关支持的文件。

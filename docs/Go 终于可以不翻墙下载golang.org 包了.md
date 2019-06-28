# Go 终于可以不翻墙下载golang.org 包了

## golang 包下载一直存在的问题

相信困扰大部分刚入门go语言新手的问题就是想下载golang.org 包，却因为google被强了，导致golang也被墙了。 而网上也给出了一些解决的方法，其中包括

### 1.手动将golang的包在github上clone 下来，再自己安装，这个方法很蠢

### 2. 用gopm，通过在国内的CDN分发来下载golang包，但是就无法使用 go get ./… 这么强大的直接下载项目依赖的命令

### 3. 终极大杀器，我接下要介绍的，就是在GO1.11中推出的官方自带包管理工具中的一个特性



### GOPROXY 环境变量

终于到了本文的终极大杀器 —— **GOPROXY**。

我们知道从 `Go 1.11` 版本开始，官方支持了 `go module` 包依赖管理工具。

其实还新增了 `GOPROXY` 环境变量。如果设置了该变量，下载源代码时将会通过这个环境变量设置的代理地址，而不再是以前的直接从代码库下载。这无疑对我等无法科学上网的开发良民来说是最大的福音。

更可喜的是，[goproxy.io](https://github.com/goproxyio/goproxy) 这个开源项目帮我们实现好了我们想要的。该项目允许开发者一键构建自己的 `GOPROXY` 代理服务。同时，也提供了公用的代理服务 `https://goproxy.io`，我们只需设置该环境变量即可正常下载被墙的源码包了：

```sh
export GOPROXY=https://goproxy.io
```

不过，**需要依赖于 go module 功能**。可通过 `export GO111MODULE=on` 开启 MODULE。

如果项目不在 `GOPATH` 中，则无法使用 `go get ...`，但可以使用 `go mod ...` 相关命令。

也可以通过置空这个环境变量来关闭，`export GOPROXY=`。

对于 Windows 用户，可以在 `PowerShell` 中设置：

```sh
$env:GOPROXY = "https://goproxy.io"
```
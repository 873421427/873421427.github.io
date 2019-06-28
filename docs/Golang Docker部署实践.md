# Golang Docker部署实践


## 此教程面向Docker新手
容器技术为服务的可扩展和部署提供了很大便利。
比如使用nginx就可以根据流量的大小帮你自动的增加或者减少容器
对于部署来说，您不必再对每一种语言配置您的环境变量，只要pull 下来docker，即可运行，容器中本身已经有了别人配置好的环境变量

下面就以我们项目中用到的golang语言为例制作一个自己go语言项目的镜像，让你的前端小伙伴不用自己配置go语言环境，只要有docker就可以了

关于下载docker的方法请自行搜索

## 编写Dockerfile
1. 首先要明确的一个概念是一个空的docker容器就是一个linux系统，你想要在这个系统里面配置自己的环境，就和你在电脑上操作是一样的，都是通过敲入命令行，下载相应的软件，运行环境， 更改各种配置等等。 那么我们怎么做到这些呢，答案就是Dockerfle。 Dockerfile就是一个配置文件，名字就叫Docerfile， 要注意Dokerfile的位置，这和你进行拷贝等文件操作时的路径有关。 我的项目Dockerfile就放在项目的根目录下面

2. 我们自己的Dockerfile如下
```
FROM golang:latest  #表示拉取golang的基础镜像，也就是有golang环境的linux系统


WORKDIR $GOPATH/src/github.com/earnsparemoney/backend #设置你的工作目录

COPY . . #将当前目录下的所有文件拷贝进你的镜像中，就是你在本机上的文件
RUN go get -d -v ./...  #获取项目的所有依赖，这个命令会自动查找你的项目依赖
RUN go install -v ./... #安装依赖


EXPOSE 443 #暴露容器端口443


CMD go run main.go #运行程序
```
## 生成镜像
这里需要特别说明的是，由于go会用到golang的包，而golang被墙了，我试了很多方法，都没有成功下载到golang的包，最后我在美国的服务器上才成功构建了镜像，如果你有更好的方法，欢迎告诉我。873421427@qq.com

在你的Dockerfile目录下面，运行如下命令
```
docker build -t godocker .  
```
表示构建镜像 -t tag的缩写，表示给镜像个名字


## 上传镜像到Dockerhub
如何把你的镜像分享给别人呢，正如可以在github上分享代码一样，也有dockhub帮助你分享你的镜像，在上面我们已经成功的构建了镜像，接下来就是要上传自己的镜像
1. 首先在dockerhub上注册一个自己的账号
2. 在网站上创建一个仓库存放你的镜像， 取名为godocker，你可以自己取名字
3. 登陆，在本机的终端里面，输入命令
```
docker login
```
4. 将之前制作好的镜像改一下tag，符合docker hub的上传格式
```
docker tag godocker zzt/godocker:version1.0
```
zzt 是我的docker hub账户名， 后面的odocker指的是docker hub的仓库的名字， 前面的指的是刚才构建的image的名字，不要搞混, version1.0 指的是这个镜像的版本号,你可以自己起名字
5. 上传image
```
docker push zzt/godocker
```


## 从DockerHub下载镜像
```
docker pull zzt/godocker:version1.0
```

## 运行镜像
```
docker run -d -p 443:443 zzt/godocker:version1.0
```
-d 指的是后台运行， -p指的是暴露本机的443端口， 对应container的443端口

大功告成！！！！ 我透
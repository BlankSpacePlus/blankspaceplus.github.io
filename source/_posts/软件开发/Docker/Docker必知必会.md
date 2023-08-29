---
title: Docker必知必会
date: 2023-08-29 19:31:32
summary: 本文分享Docker的基础概念和基本用法。
tags:
- Docker
categories:
- 开发技术
---

# Docker

![](../../../images/软件开发/Docker/Docker必知必会/1.png)

推荐阅读：[容器技术](https://blankspace.blog.csdn.net/article/details/103087082)

Docker核心概念：
- 镜像（Image）：用于创建Docker容器的模板，相当于一个root文件系统。
- 容器（Container）：容器是独立运行的一个或一组应用，是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
- 仓库（Registry）：仓库可看成一个代码控制中心，用来保存镜像。
- 客户端（Client）：通过命令行或者其他工具使用DockerSDK与Docker的守护进程通信。
- 主机（Host）：用于执行Docker守护进程和容器的物理机或虚拟机。

![](../../../images/软件开发/Docker/Docker必知必会/2.png)

# Docker命令帮助

```shell
docker
```

```text
Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/home/yikunchen/.docker")
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST
                           env var and default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/home/yikunchen/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/home/yikunchen/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/home/yikunchen/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  builder     Manage builds
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/
```

查看子命令帮助：
```shell
docker stats --help
```

```shell
Usage:  docker stats [OPTIONS] [CONTAINER...]

Display a live stream of container(s) resource usage statistics

Options:
  -a, --all             Show all containers (default shows just running)
      --format string   Pretty-print images using a Go template
      --no-stream       Disable streaming stats and only pull the first result
      --no-trunc        Do not truncate output
```

# Docker容器管理

## 启动停止容器

启动容器输出HelloWorld：
```shell
docker run ubuntu:15.10 /bin/echo "Hello World"
```

该命令参数解析：
- `docker`：Docker的二进制执行文件。
- `run`：与前面的Docker组合来运行一个容器。
- `ubuntu:15.10`：指定要运行的镜像，Docker首先从本地主机上查找镜像是否存在，如果不存在，Docker就会从镜像仓库DockerHub下载公共镜像。
- `/bin/echo "Hello world"`：在启动的容器里执行的命令。

启动容器并与之交互：
```shell
docker run -it ubuntu /bin/bash
```

该命令参数解析：
- `-t`：在新容器内指定一个伪终端或终端。
- `-i`：允许你对容器内的标准输入(stdio)进行交互。

说明：用`exit`命令或者`CTRL+D`组合键可以退出容器终端交互。

启动一个已停止的容器：
```shell
docker start <container_id>
```

停止一个已运行的容器：
```shell
docker stop <container_id>
```

重启一个已停止的容器：
```shell
docker restart <container_id>
```

启动一个后台运行的容器：
```shell
docker run -itd --name ubuntu-test ubuntu /bin/bash
```

进入一个后台运行的容器（如果从这个容器退出，会导致容器的停止）：
```shell
docker attach <container_id>
```

进入一个后台运行的容器（如果从这个容器退出，不会导致容器的停止，较推荐）：
```shell
docker exec -it <container_id> /bin/bash
```

## 查看本地容器

查看运行的容器：
```shell
docker ps
```

查看所有的容器：
```shell
docker ps -a
```

该命令输出格式：
```text
CONTAINER ID	IMAGE	COMMAND	CREATED	STATUS	PORTS	NAMES
```

该命令输出的信息的含义是：
- `CONTAINER ID`：容器ID
- `IMAGE`：使用的镜像
- `COMMAND`：启动容器时运行的命令
- `CREATED`：容器的创建时间
- `STATUS`：容器状态
    - `created`：已创建
    - `restarting`：重启中
    - `running`：运行中
    - `removing`：迁移中
    - `paused`：暂停
    - `exited`：停止
    - `dead`：死亡
- `PORTS`：容器的端口信息和使用的连接类型(TCP/UDP)
- `NAMES`：自动分配的容器名称

## 清理删除容器

删除一个容器：
```shell
docker rm -f <container_id>
```

清理所有已停止的容器：
```shell
docker container prune
```

如此，会提示：
```text
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
Deleted Containers:
...
Total reclaimed space: ...
```

## 导入导出容器

导出本地容器：
```shell
docker export <container_id> > <filename>.tar
```

本地导入容器快照：
```shell
cat <filename>.tar | docker import - <docker_user_name>/<docker_repo_name>:<docker_repo_tag>
```

网络导入容器快照：
```shell
docker import <url> <docker_repo_name>
```

# Docker镜像管理

## 搜索远程镜像

搜索远程镜像：
```shell
docker search ubuntu
```

## 载入远程镜像

推荐阅读：[Docker国内镜像](https://www.runoob.com/docker/docker-mirror-acceleration.html)
- 中科大镜像：[https://docker.mirrors.ustc.edu.cn](https://docker.mirrors.ustc.edu.cn)
- 网易镜像：[https://hub-mirror.c.163.com](https://hub-mirror.c.163.com)
- 阿里云镜像：[https://<你的ID>.mirror.aliyuncs.com](https://<你的ID>.mirror.aliyuncs.com)
- 七牛云镜像：[https://reg-mirror.qiniu.com](https://reg-mirror.qiniu.com)

载入镜像：
```shell
docker pull ubuntu
```

该命令输出格式：
```text
NAME	DESCRIPTION	STARS	OFFICIAL	AUTOMATED
```

该命令输出的信息的含义是：
- `NAME`：镜像仓库源的名称
- `DESCRIPTION`：镜像的描述
- `STARS`：收藏/点赞数
- `OFFICIAL`：是否由Docker官方发布
- `AUTOMATED`：自动构建

## 查看本地镜像

列出本地镜像：
```shell
docker images
```

该命令输出格式：
```text
REPOSITORY	TAG	IMAGE ID	CREATED	SIZE
```

该命令输出的信息的含义是：
- `REPOSITORY`：表示镜像的仓库源
- `TAG`：镜像的标签
- `IMAGE ID`：镜像ID
- `CREATED`：镜像创建时间
- `SIZE`：镜像大小

## 删除本地镜像

删除本地镜像：
```shell
docker rmi ubuntu
```

## 更新本地镜像

更新本地镜像：
```shell
docker commit -m="COMMIT信息" -a="用户名" <container_id> <docker_user_name>/<docker_repo_name>:<docker_repo_tag>
```

## 构建本地镜像

构建本地镜像：
```shell
docker build -t <docker_user_name>/<docker_repo_name>:<docker_repo_tag> <dockerfile_path>
```

## 设置镜像标签

设置镜像标签：
```shell
docker tag <container_id> <docker_user_name>/<docker_repo_name>:<docker_repo_tag>
```

# Docker仓库管理

DockerHub网址：[https://hub.docker.com](https://hub.docker.com)

登录DockerHub账号：
```shell
docker login
```

退出DockerHub账号：
```shell
docker logout
```

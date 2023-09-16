---
title: Linux远程拷贝Python开发环境
date: 2023-09-12 21:12:30
summary: 本文介绍Linux远程拷贝Python开发环境的方法。
tags:
- Linux
- Python
- Anaconda
categories:
- 开发技术
---

# 问题情景

服务器2不能创建conda虚拟环境，但可以较好地跑模型；服务器1可以创建conda虚拟环境，但不能较好地跑模型。

现需要从服务器1上创建虚拟环境，迁移至服务器2开箱即用。

# 操作流程

下载安装Miniconda3：
```shell
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm -rf ~/miniconda3/miniconda.sh
```

初始化conda命令：
```shell
~/miniconda3/bin/conda init bash
~/miniconda3/bin/conda init zsh
```

查看服务器1当前所有虚拟环境：
```shell
conda env list
```

服务器1创建名为`<env_name>`的虚拟环境，并进入：
```shell
conda create --name <env_name> python==3.11
conda activate <env_name>
```

服务器1的`<env_name>`虚拟环境安装所需Python库`<lib_name>`：
```shell
pip install <lib_name>
```

服务器1打包虚拟环境`<env_name>`至`<env_name>.tar.gz`：
```shell
conda pack <env_name>
```

服务器1打包虚拟环境`<env_name>`至`<pkg_name>.tar.gz`：
```shell
conda pack <env_name> -o <pkg_name>.tar.gz
```

服务器1退出名为`<env_name>`的虚拟环境：
```shell
conda deactivate
```

从服务器1传输`<env_name>.tar.gz`至服务器2：
```shell
scp <env_name>.tar.gz <username>@<host_ip>:<host_path>
```

在服务器2安装`<env_name>`虚拟环境：
```shell
mkdir <env_name>
tar -xzf <env_name>.tar.gz -C <env_name>
mv <env_name> ~/miniconda3/envs/
```

查看服务器2当前所有虚拟环境：
```shell
conda env list
```

在服务器2启动名为`<env_name>`的虚拟环境：
```shell
conda activate <env_name>
```

服务器2退出名为`<env_name>`的虚拟环境：
```shell
conda deactivate
```

---
title: Kubernetes安装配置方法 
date: 2023-10-17 13:22:30
summary: 本文分享Kubernetes的安装配置方法。
tags:
- Kubernetes
categories:
- 开发技术
---

# 更新安装环境

更新安装环境：
```shell
sudo apt update
```

# 永久关闭swap

检查swap：
```shell
sudo swapon --show
```

关闭swap：
```shell
sudo swapoff -a
```

删除swap分区文件：
```shell
sudo rm /swap.img
```

注释或删除`/etc/fstab`：
```shell
/swap.img none swap sw 0 0
```

# 关闭防火墙

查看当前的防火墙状态：
```shell
sudo ufw status
```

关闭防火墙：
```shell
sudo ufw disable
```

# 允许iptables检查桥接流量

加载`overlay`和`br_netfilter`两个内核模块：
```shell
sudo modprobe overlay && sudo modprobe br_netfilter
```

持久化加载上述两个模块，避免重启失效：
```shell
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF
```

验证`br_netfilter`模块是否已加载：
```shell
lsmod | grep br_netfilter
```

验证`overlay`模块是否已加载：
```shell
lsmod | grep overlay
```

修改内核参数，确保二层的网桥在转发包时也会被iptables的FORWARD规则所过滤：
```shell
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward = 1
EOF
```

应用`sysctl`参数而不重新启动：
```shell
sudo sysctl --system
```

# 安装Docker

设置Docker的apt存储库：
```shell
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

将存储库添加到apt源：
```shell
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

安装Docker Engine、Containerd、Docker Compose：
```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

用hello-world容器校验Docker：
```shell
sudo docker run hello-world
```

# 安装Kubernetes

下载相关安装包：
```shell
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
```

下载谷歌云公共签名密钥并配置：
```shell
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-archive-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

下载阿里云公共签名密钥并配置：
```shell
curl -fsSL https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-archive-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

安装`kubelet`、`kubeadm`、`kubectl`：
```shell
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

安装指定版本的`kubelet`、`kubeadm`、`kubectl`：
```shell
apt-get install kubelet=1.23.6-00
apt-get install kubeadm=1.23.6-00
apt-get install kubectl=1.23.6-00
```

查看`kubelet`、`kubeadm`、`kubectl`的版本：
```shell
kubectl version --client && kubeadm version && kubelet --version
```

配置`kubelet`开机启动：
```shell
systemctl enable kubelet
```

# 修改运行时containerd配置

生成containerd的默认配置文件：
```shell
containerd config default | sudo tee /etc/containerd/config.toml
```

修改`/etc/containerd/config.toml`：
1. 找到`containerd.runtimes.runc.options`修改`SystemdCgroup = true`，启用`systemd`：
    ```shell
    [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
    Root = ""
    ShimCgroup = ""
    SystemdCgroup = true
    ```
2. 修改`sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.9"`，将远程下载地址从谷歌云改为阿里云：
    ```shell
    [plugins."io.containerd.grpc.v1.cri"]
    restrict_oom_score_adj = false
    sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.9"
    selinux_category_range = 1024
    ```

将`containerd`设置为开机启动：
```shell
sudo systemctl restart containerd
sudo systemctl enable containerd
```

查看镜像版本号：
```shell
kubeadm config images list
```

# 初始化master节点

生成初始化配置信息：
```shell
kubeadm config print init-defaults > kubeadm.conf
```

查看本机IP地址：
```shell
hostname -I
```

修改`kubeadm.conf`配置：
```shell
vim kubeadm.conf
```

```shell
criSocket: unix:///var/run/containerd/containerd.sock
  imagePullPolicy: IfNotPresent
  name: <node_name> # 修改为master节点的主机名
  taints: null
---
apiServer:
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta3
certifiapiVersion: kubeadm.k8s.io/v1beta3
bootstrapTokens:
- groups:
  - system:bootstrappers:kubeadm:default-node-token
  token: abcdef.0123456789abcdef
  ttl: 24h0m0s
  usages:
  - signing
  - authentication
kind: InitConfiguration
localAPIEndpoint:
  advertiseAddress: <ip_address> #修改为master机器的IP地址
  bindPort: 6443
nodeRegistration:
  catesDir: /etc/kubernetes/pki
clusterName: kubernetes
controllerManager: {}
dns: {}
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: registry.aliyuncs.com/google_containers #修改为阿里云镜像源
kind: ClusterConfiguration
kubernetesVersion: 1.27.0
networking:
  dnsDomain: cluster.local
  serviceSubnet: 10.96.0.0/12
scheduler: {}
```

初始化主节点master：
```shell
sudo kubeadm init --config=kubeadm.conf
```

配置kubectl：
```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

# master配置网络

在master节点，添加网络插件fannel：
```shell
​kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
```

如果下载失败，则：
```shell
wget https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
kubectl apply -f kube-flannel.yml
```

# 引入worker节点

```shell
kubeadm token create --print-join-command
sudo kubeadm join <ip_address>:<ip_port> --token <token> --discovery-token-ca-cert-hash sha256:<sha256_hash>
```

将master节点中的`/etc/kubernetes/admin.conf`文件拷贝到从节点相同目录下，再在从节点执行如下命令：
```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

# 访问pod内部

获取所有namespace下的运行的所有pod：
```shell
kubectl get pod --all-namespaces
```

获取指定namespace下运行的的所有pod：
```shell
kubectl get pod -n <namespace>
```

访问指定名称的pod内部：
```shell
kubectl exec -it <pod_name> bash -n <namespace>
```

拷贝pod内部的文件至本地：
```shell
kubectl cp <namespace>/<pod_name>:<source_path> <destination_path>
```

# kubectl常用命令

获取所有namespace下的运行的所有pod：
```shell
kubectl get pod --all-namespaces
```

获取所有namespace下的运行的所有pod的标签：
```shell
kubectl get pod --show-labels
```

获取该节点的所有namespace：
```shell
kubectl get namespace
```

查看节点：
```shell
kubectl get nodes
```

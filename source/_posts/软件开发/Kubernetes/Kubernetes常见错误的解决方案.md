---
title: Kubernetes常见错误的解决方案 
date: 2023-10-16 23:44:44
summary: 本文分享一些Kubernetes常见错误的解决方案。
tags:
- Kubernetes
categories:
- 开发技术
---

# detected that the sandbox image "registry.aliyuncs.com/google_containers/pause:3.6" of the container runtime is inconsistent with that used by kubeadm.

`kubeadm`初始化master的时候有如下错误：
<font color="red">
detected that the sandbox image "registry.aliyuncs.com/google_containers/pause:3.6" of the container runtime is inconsistent with that used by kubeadm. It is recommended that using "registry.aliyuncs.com/google_containers/pause:3.9" as the CRI sandbox image.
</font>

解决方法：<br>
修改运行时containerd配置文件`/etc/containerd/config.toml`，把`sandbox_image = "registry.k8s.io/pause:3.6"`改成`sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.9"`。

```shell
[plugins."io.containerd.grpc.v1.cri"]
restrict_oom_score_adj = false
sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.9"
selinux_category_range = 1024
```

# [ERROR FileAvailable--etc-kubernetes-manifests-kube-apiserver.yaml]: /etc/kubernetes/manifests/kube-apiserver.yaml already exists

<font color="red">
[ERROR FileAvailable--etc-kubernetes-manifests-kube-apiserver.yaml]: /etc/kubernetes/manifests/kube-apiserver.yaml already exists
[ERROR FileAvailable--etc-kubernetes-manifests-kube-controller-manager.yaml]: /etc/kubernetes/manifests/kube-controller-manager.yaml already exists
[ERROR FileAvailable--etc-kubernetes-manifests-kube-scheduler.yaml]: /etc/kubernetes/manifests/kube-scheduler.yaml already exists
[ERROR FileAvailable--etc-kubernetes-manifests-etcd.yaml]: /etc/kubernetes/manifests/etcd.yaml already exists
[ERROR Port-10250]: Port 10250 is in use
[ERROR Port-2379]: Port 2379 is in use
[ERROR Port-2380]: Port 2380 is in use
[ERROR DirAvailable--var-lib-etcd]: /var/lib/etcd is not empty
</font>

解决方法：
```shell
kubeadm reset
```

# [WARNING Swap]: swap is enabled; production deployments should disable swap unless testing the NodeSwap feature gate of the kubelet

禁用Linux上的swap：
```shell
swapoff -a
```

---
title: PyTorch运行错误的解决方法
date: 2020-12-17 23:59:48
summary: 本文分享一些PyTorch常见运行错误的解决方法。
tags:
- Python
- PyTorch
- 异常修复
categories:
- Python
---

# CUDA

- 检测CUDA是否可用：`torch.cuda.is_available()`
- 查看GPU数量：`torch.cuda.device_count()`
- 查看GPU设备名：`torch.cuda.get_device_name()`
- 查看当前GPU编号：`torch.cuda.current_device()`
- 查看GPU容量：`torch.cuda.get_device_capability()`
- 指定使用的显卡设备：`torch.cuda.set_device()`
    - 单卡：`torch.cuda.set_device(gpu_id)`
    - 多卡：`torch.cuda.set_device('cuda:'+str(gpu_ids))`
- 指定模型和数据加载到对应的GPU：`.cuda()`
- 限制程序所能看到的可用GPU设备列表，从而确保程序只使用指定的GPU设备：
    - 单卡：`os.environ['CUDA_VISIBLE_DEVICES'] = '0'`
    - 多卡：`os.environ['CUDA_VISIBLE_DEVICES'] = '0,1,2'`
- 为GPU设置随机种子：
    - 单卡：`torch.cuda.manual_seed()`
    - 多卡：`torch.cuda.manual_seed_all()`

# torch.cuda.OutOfMemoryError: CUDA out of memory.

微调练CodeBERT模型时遇到：<font color="red">torch.cuda.OutOfMemoryError: CUDA out of memory. Tried to allocate 16.00 MiB (GPU 0; ...</font>

使用`nvidia-smi`查看显卡，发现总空间大约是4×10GB=40GB，但已占用大半；而CodeBERT要求2张NVIDIA Tesla P100，大约是2×16GB=32GB。

因此，只有占四张卡并行跑，才能跑下来。

另外的策略是：调低batch_size，尝试能否抗住第一次反向传播时的显存要求。

# After first epoch model was saved, the code failed

训练模型完成1epoch遇到：<font color="red">After first epoch model was saved, the code failed</font>

遇到此问题的原因是磁盘剩余空间不足，不够保存模型ckpt。

解决方法：采用`df -h`检查系统磁盘空间，释放不必要的空间占用。

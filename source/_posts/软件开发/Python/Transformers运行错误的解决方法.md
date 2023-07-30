---
title: Transformers运行错误的解决方法
date: 2023-02-14 01:39:04
summary: 本文分享Transformers加载BERT模型的系列问题解决，错误围绕着from_pretrained()展开。
tags:
- Python
- Transformers
- 深度学习
- BERT
categories:
- Python
---

本文记录Transformers加载BERT模型from_pretrained()问题的解决方法。

# 开发环境搭建

Ubuntu服务器上安装Miniconda，通过VSCode或PyCharm或Gateway连接远程开发。

推荐阅读：[VSCode通过虚拟环境运行Python程序](https://blankspace.blog.csdn.net/article/details/127766482)

安装PyTorch、Scikit-Learn、Transformers等库。

推荐阅读：[Conda安装TensorFlow和PyTorch的GPU支持包](https://blankspace.blog.csdn.net/article/details/126534763)

说明：安装Scikit-Learn的时候不要`pip install sklearn`，应该`pip install scikit-learn`。

# OSError: Can‘t load config for 'xxxxxx'. If you were trying

遇到报错：
<font color="red">OSError: Can‘t load config for 'xxxxxx'. If you were trying</font>

根据[这篇博客](https://blog.csdn.net/qsx123432/article/details/126159843)，试着手动下载了`bert-base-uncased`的相关文件，但还是不能成功。

# UnicodeDecodeError: 'utf-8' codec can't decode byte 0x80 in position 0: invalid start byte

遇到报错：
<font color="red">UnicodeDecodeError: 'utf-8' codec can't decode byte 0x80 in position 0: invalid start byte</font>

根据网上的文章，该错误的产生原因大致是以错误的编码格式和读取方式读取了二进制文件，在此工程中无法处理。

# Can't load the configuration of 'xxxxxx'.

<font color="red">Can't load the configuration of 'xxxxxx'. If you were trying to load it from 'https://huggingface.co/models', make sure you don't have a local directory with the same name. Otherwise, make sure 'xxxxxx' is the correct path to a directory containing a config.json file</font>

引入如下脚本，先将`bert-base-uncased`模型从Huggingface的仓库中download到本地：
```python
from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")
tokenizer.save_pretrained('./bert/')
model.save_pretrained('./bert/')
```

# Loading model from pytorch_pretrained_bert into transformers library

查看Huggingface官方Discussion帖子[Loading model from pytorch_pretrained_bert into transformers library](https://discuss.huggingface.co/t/loading-model-from-pytorch-pretrained-bert-into-transformers-library/6124)，有这样一段话：
> Hi. This is probably caused by the transformer verison. You might downgrade your transformer version from 4.4 to 2.8 with pip install transformers==2.8.0

因此尝试将transformers版本降到2.8.0。

首先查看transformers版本：
<font color="darkorange">pip show transformers</font>

输出信息显示版本为4.26.1：
<font color="blue">Name: transformers
Version: 4.26.1
Summary: State-of-the-art Machine Learning for JAX, PyTorch and TensorFlow
Home-page: https://github.com/huggingface/transformers
Author: The Hugging Face team (past and future) with the help of all our contributors (https://github.com/huggingface/transformers/graphs/contributors)
Author-email: transformers@huggingface.co
License: Apache
Location: xxxxxxxxxxxxxxxxxxxxxxx
Requires: filelock, huggingface-hub, importlib-metadata, numpy, packaging, pyyaml, regex, requests, tokenizers, tqdm
Required-by: </font>

直接安装transformers的2.8.0版本：
<font color="darkorange">pip install transformers==2.8.0</font>

遇到一串错误，其中一行是：
<font color="red">During handling of the above exception, another exception occurred:</font>

卸载transformers：
<font color="darkorange">pip uninstall transformers</font>

随后安装：
<font color="darkorange">pip install transformers==2.8.0</font>

遇到错误：
<font color="red">ERROR: Could not find a version that satisfies the requirement boto3 (from transformers) (from versions: none)
ERROR: No matching distribution found for boto3</font>

# ERROR: No matching distribution found for boto3

为了解决上面的问题，参考[StackOverflow](https://stackoverflow.com/questions/66649044/python-installing-boto3-could-not-find-a-version-even-though-pypi-shows-th-ind)，安装boto3库。

首先查看是否已安装boto3：
<font color="darkorange">pip show boto3</font>

输出结果：
<font color="gold">WARNING: Package(s) not found: boto3</font>

显然，没有安装过。

然后正式安装boto3：
<font color="darkorange">pip install boto3</font>

随后安装2.8.0版本的transformers库：
<font color="darkorange">pip install transformers==2.8.0</font>

# Missing key(s) in state_dict: "bert.embeddings.position_ids".

安装2.8.0版本的transformers库后，运行程序报错：
<font color="red">Missing key(s) in state_dict: "bert.embeddings.position_ids".</font>

参考[这篇博客](https://www.cnblogs.com/zhengbiqing/p/10434704.html)稍加改造后，加入以下代码：
```python
cudnn.benchmark = True
```

仍然报错：
<font color="red">TypeError: 'BertTokenizer' object is not callable</font>

检索到GitHub的一个相关Issue：[TypeError: 'BertTokenizer' object is not callable #53](https://github.com/GlobalMaksimum/sadedegel/issues/53)，该Issue的回复指出：
> Transformers fails "TypeError: 'BertTokenizer' object is not callable" if the installed version is <v3.0.0 . In the requirements file, transformers should be "transformers>=3.0.0"

因此决定将版本升到3.0.0：
<font color="darkorange">pip install transformers==3.0.0</font>

成功，部分输出如下：
<font color="blue">Installing collected packages: tokenizers, transformers
  Attempting uninstall: tokenizers
    Found existing installation: tokenizers 0.5.2
    Uninstalling tokenizers-0.5.2:
      Successfully uninstalled tokenizers-0.5.2
  Attempting uninstall: transformers
    Found existing installation: transformers 2.8.0
    Uninstalling transformers-2.8.0:
      Successfully uninstalled transformers-2.8.0
Successfully installed tokenizers-0.8.0rc4 transformers-3.0.0</font>

运行程序，可以得到结果，伴随着输出如下内容：
<font color="red">Some weights of the model checkpoint at ./bert/ were not used when initializing BertModel: ['embeddings.position_ids']
\- This IS expected if you are initializing BertModel from the checkpoint of a model trained on another task or with another architecture (e.g. initializing a BertForSequenceClassification model from a BertForPretraining model).
\- This IS NOT expected if you are initializing BertModel from the checkpoint of a model that you expect to be exactly identical (initializing a BertForSequenceClassification model from a BertForSequenceClassification model).</font>

---
title: NLTK文本处理
date: 2023-10-21 17:45:33
summary: 本文分享一些基于NLTK处理文本的经典案例。
tags:
- Python
- NLTK
categories:
- Python
---

# 删除停止词

```python
from nltk.corpus import stopwords

# 创建单词序列
tokenized_words = ['i', 'am', 'going', 'to', 'go', 'to', 'the', 'store', 'and', 'park']

# 暂停加载词
stop_words = stopwords.words('english')

# 删除停止词
print([word for word in tokenized_words if word not in stop_words])

# 查看停止词
print(stop_words[:5])
```

# 按单词的重要性加权

```python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

# 创建文本
text_data = np.array(['I love China, China!', 'Sweden is best', 'Germany beats both'])

# 创建TF-IDF特征矩阵
tfidf = TfidfVectorizer()
feature_matrix = tfidf.fit_transform(text_data)

# 查看TF-IDF的稀疏特征矩阵
print(feature_matrix)

# 查看TF-IDF特征矩阵的稠密矩阵的形式
print(feature_matrix.toarray())

# 查看特征的名字
print(tfidf.vocabulary_)
```

# 提取词干

```python
from nltk.stem import PorterStemmer

# 创建单词序列
tokenized_words = ['i', 'am', 'humbled', 'by', 'this', 'traditional', 'meeting']

# 创建词干转换器
porter = PorterStemmer()

# 应用词干转换器
print([porter.stem(word) for word in tokenized_words])
```

# 文本分词

```python
from nltk.tokenize import word_tokenize
from nltk.tokenize import sent_tokenize

# 创建文本
string = "Like we used to do"

# 分词
print(word_tokenize(string))

string = "We don't talk anymore. We don't talk anymore. We don't talk anymore. Like we used to do."

# 切分成句子
print(sent_tokenize(string))
```

# 文本编码为词袋

```python
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer

# 创建文本
text_data = np.array(['I love Sam. Sam!', 'Sam is best', 'Oh nice'])

# 创建一个词袋特征矩阵
count = CountVectorizer()
# 得到的是稀疏矩阵
bag_of_words = count.fit_transform(text_data)
print(bag_of_words.toarray())

# 查看特征名
print(count.get_feature_names())

# 创建一个只包含Sam的词袋特征矩阵
count_2gram = CountVectorizer(ngram_range=(1, 2), stop_words="english", vocabulary=['sam'])
bag = count_2gram.fit_transform(text_data)

# 查看特征矩阵
print(bag.toarray())

# 查看一元模型和二元模型
print(count_2gram.vocabulary_)
```

# 标注词性

```python
from nltk import pos_tag
from nltk import word_tokenize
from sklearn.preprocessing import MultiLabelBinarizer

# 创建文本
text_data = "Chris loved outdoor running"

# 使用预训练的词性标注器
text_tagged = pos_tag(word_tokenize(text_data))

# 查看词性
print(text_tagged)

'''
NNP：单数专有名词
NN：单数或复数的名词
RB：副词
VBD：过去式的动词
VBG：动名词或动词的现在分词形式
JJ：形容词
PRP：人称代词
'''
print([word for word, tag in text_tagged if tag in ['NN', 'NNS', 'NNP', 'NNPS']])

# 创建文本
tweets = ["I am eating a burrito for breakfast", "Political science is an amazing field",
          "San Francisco is an amazing city"]

# 创建列表
tagged_tweets = []

# 为每条推文中的每个单词加标签
for tweet in tweets:
    tweet_tag = pos_tag(word_tokenize(tweet))
    tagged_tweets.append([tag for word, tag in tweet_tag])

# 使用ine-hot编码将标签扎UN哈UN成特征
one_hot_muti = MultiLabelBinarizer()
print(one_hot_muti.fit_transform(tagged_tweets))

# 使用classes_查看词名能发现每个特征都是一个词性标签
print(one_hot_muti.classes_)
```

# 文本清洗

```python
import re

# 创建文本
text_data = ["    Loving him is like driving a new Maserati down a dead end street.    ",
             "Faster than the wind, passionate as sin, ending so suddenly.",
             "    Loving him is like trying change to your mind once you're already flying through the free fall.  "]

# 去除文本两端的空格
strip_whitespace = [string.strip() for string in text_data]

# 查看文本
print(strip_whitespace)

# 删除句点
remove_periods = [string.replace(".", "") for string in strip_whitespace]

# 查看文本
print(remove_periods)


# 创建函数
def capitalizer(string: str) -> str:
    return string.upper()


# 应用函数
iter1 = iter(capitalizer(string) for string in remove_periods)
for i in iter1:
    print(i, end="\n")


# 创建正则表达式函数
def replace_letters_with_X(string: str) -> str:
    return re.sub(r"[a-zA-Z]]", "X", string)


# 应用函数
iter2 = iter(replace_letters_with_X(string) for string in remove_periods)
for i in iter2:
    print(i, end="\n")
```

# 标注词性

```python
from nltk.corpus import brown
from nltk.tag import UnigramTagger, BigramTagger, TrigramTagger

# 从布朗语料库中获取文本数据，切分成句子
sentences = brown.tagged_sents(categories='news')

# 将4000个句子用作训练，623个句子用作测试
train = sentences[:4000]
test = sentences[4000:]

# 创建回退标注器
unigram = UnigramTagger(train)
bigram = BigramTagger(train, backoff=unigram)
trigram = TrigramTagger(train, backoff=bigram)

# 查看准确率
print(trigram.evaluate(test))
```

# 移除标点

```python
import unicodedata
import sys

# 创建文本
text_data = ['Hi!!!!!I. Love. This  Song....,;;', '100000  Agree%%&*%!!! #LoveI T', 'Right?!?!?!']

# 创建字典
punctuation = dict.fromkeys(i for i in range(sys.maxunicode) if unicodedata.category(chr(i)).startswith('P'))

# 移除每个字符串中的标点
print([string.translate(punctuation) for string in text_data])
```

# 解析清洗HTML

```python
from bs4 import BeautifulSoup

string = ""

with open('test.html', 'r', encoding='UTF-8') as f:
    lines = f.readlines()
    for i in lines:
        string = '%s %s' % (string, i)

# 解析HTML
soup = BeautifulSoup(string, "lxml")

# 查找id为"b_id"的div标签，并查看文本
print(soup.find("div", {"id": "b_id"}).text)
```

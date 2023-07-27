---
title: HTTP状态码与RESTful返回码
date: 2019-11-29 01:28:07
summary: 本文分享HTTP状态码与RESTful返回码的相关内容。
tags:
- 程序设计
categories:
- 程序设计
---

# HTTP状态码

HTTP本身提供了很多的StateCode来表示各种状态，而HTTP状态码大致可分为以下几个区间：
 - 2XX：请求正常处理并返回。
 - 3XX：重定向，请求资源的位置发生了变化。
 - 4XX：客户端发送的请求有错误。
 - 5XX：服务器端有错误。

常用的HTTP状态码：
 - 200：表示请求已经成功。
 - 301：资源已经永久迁移到新地址，新的URL会在响应头中返回。
 - 302：资源临时被迁移到新地址，新的URL会在响应头中返回。
 - 304：表明资源未改变。主要配合请求头中的If-None-Match和If-Modified-Since使用。
 - 400：请求错误，表示请求中有语法错误。
 - 401：请求的资源需要认证，请求没有提供认证信息或者认证信息错误。
 - 403：资源被禁止访问。
 - 404：资源不存在。
 - 502：错误的网关，通常指作为代理的服务器无法收到远端服务器的正常响应。
 - 503：服务不可用。

# Java对HTTP状态码的定义

java.net.HttpURLConnection类中定义了大量的public常量，与HTTP状态码一一对应。

| 常量名 | 状态码 | 状态码含义(中文) | 状态码含义(英文) |
|:----:|:----:|:----:|:----:|
| HTTP_OK | 200 | 确定 | OK |
| HTTP_CREATED | 201 | 已创建 | Created |
| HTTP_ACCEPTED | 202 | 已接受 | Accepted |
| HTTP_NOT_AUTHORITATIVE | 203 | 非权威信息 | Non-Authoritative Information |
| HTTP_NO_CONTENT | 204 | 无内容 | No Content |
| HTTP_RESET | 205 | 重置内容 | Reset Content |
| HTTP_PARTIAL | 206 | 部分内容 | Partial Content |
| HTTP_MULT_CHOICE | 300 | 多选 | Multiple Choices |
| HTTP_MOVED_PERM | 301 | 已永久移动 | Moved Permanently |
| HTTP_MOVED_TEMP | 302 | 临时重定向 | Temporary Redirect |
| HTTP_SEE_OTHER | 303 | 请参阅其他 | See Other |
| HTTP_NOT_MODIFIED | 304 | 未修改 | Not Modified |
| HTTP_USE_PROXY | 305 | 使用代理 | Use Proxy |
| HTTP_BAD_REQUEST | 400 | 错误请求 | Bad Request |
| HTTP_UNAUTHORIZED | 401 | 未授权 | Unauthorized |
| HTTP_PAYMENT_REQUIRED | 402 | 需要付款 | Payment Required |
| HTTP_FORBIDDEN | 403 | 禁止 | Forbidden |
| HTTP_NOT_FOUND | 404 | 未找到 | Not Found |
| HTTP_BAD_METHOD | 405 | 不允许使用方法 | Method Not Allowed |
| HTTP_NOT_ACCEPTABLE | 406 | 不可接受 | Not Acceptable |
| HTTP_PROXY_AUTH | 407 | 需要代理身份验证 | Proxy Authentication Required |
| HTTP_CLIENT_TIMEOUT | 408 | 请求超时 | Request Time-Out |
| HTTP_CONFLICT | 409 | 冲突 | Conflict |
| HTTP_GONE | 410 | 已消失 | Gone |
| HTTP_LENGTH_REQUIRED | 411 | 需要长度 | Length Required |
| HTTP_PRECON_FAILED | 412 | 预处理失败 | Precondition Failed |
| HTTP_ENTITY_TOO_LARGE | 413 | 请求实体太大 | Request Entity Too Large |
| HTTP_REQ_TOO_LONG | 414 | 请求URI太大 | Request-URI Too Large |
| HTTP_UNSUPPORTED_TYPE | 415 | 不支持的媒体类型 | Unsupported Media Type |
| HTTP_SERVER_ERROR | 500 | 内部服务器错误 | Internal Server Error |
| HTTP_NOT_IMPLEMENTED | 501 | 未实现 | Not Implemented |
| HTTP_BAD_GATEWAY | 502 | 网关错误 | Bad Gateway |
| HTTP_UNAVAILABLE | 503 | 服务不可用 | Service Unavailable |
| HTTP_GATEWAY_TIMEOUT | 504 | 网关超时 | Gateway Timeout |
| HTTP_VERSION | 505 | 不支持HTTP版本 | HTTP Version Not Supported |

# RESTful返回码的设计

RESTful接口需要遵循HTTP的定义，返回合适的状态码和数据。

当然，如果内部使用，统一返回200，在返回数据里自定义一套状态码也是可以的。

自己设计RESTful返回码的时候，最好也遵循HTTP状态码分布的区间范围来设定。

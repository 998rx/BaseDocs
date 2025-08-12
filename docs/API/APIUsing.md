---
title: api使用
createTime: 2025/08/08 15:46:32
permalink: /article/clh691ix/
---
# API调用

获取用户信息

```http
GET /api/user
```

参数：

- `id`：用户ID

返回值：

- `name`：用户名
- `age`：用户年龄
- `email`：用户邮箱
- `phone`：用户手机号
- `address`：用户地址
- `createTime`：用户创建时间
- `updateTime`：用户更新时间
- `deleteTime`：用户删除时间

获取用户列表

```http
GET /api/user/list
```

参数：

- `pageNum`：页码
- `pageSize`：每页数量
- `name`：用户名
- `age`：用户年龄
- `email`：用户邮箱
- `phone`：用户手机号
- `address`：用户地址
- `createTime`：用户创建时间
- `updateTime`：用户更新时间
- `deleteTime`：用户删除时间
返回：
- `total`：总记录数
- `list`：用户列表
    - `id`：用户ID
    - `name`：用户名
    - `age`：用户年龄
    - `email`：用户邮箱
    - `phone`：用户手机号
    - `address`：用户地址
    - `createTime`：用户创建时间
    - `updateTime`：用户更新时间
    - `deleteTime`：用户删除时间
    - `createBy`：创建人
    - `updateBy`：更新人
    - `deleteBy`：删除人
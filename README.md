# 介绍
这是一个基于 React 的 CRUD(增删改查) 应用，适用于 Dva 和 Umi 初学者，搭配专用后端接口，实现用户列表的真实增删改查操作。
### 技术栈: Dva + Umi + antd + antdPro
## 开始

#### 安装  
建议使用 yarn 进行本项目的安装依赖及运行程序，可添加国内源以获得安装依赖加速  
[环境准备]: (https://umijs.org/zh-CN/docs/getting-started)

```bash
$ yarn
```

#### 启动项目

```bash
$ yarn start
```
## 后端接口
BaseURI: http://public-api-v1.aspirantzhang.com  

![](https://user-gold-cdn.xitu.io/2020/7/22/17375d468247f979?w=1059&h=388&f=png&s=44358)

### User List Format
```json
{
  "data": [
    {
      "id": 41,
      "name": "zhang2",
      "email": "zhang2@yahoo.com",
      "create_time": "2020-04-13T14:17:47Z",
      "update_time": "2020-04-13T14:17:47Z",
      "status": 1
    },
    {
      "id": 38,
      "name": "zhang1",
      "email": "zhang1@test.com",
      "create_time": "2020-04-13T13:58:08Z",
      "update_time": "2020-04-13T13:58:08Z",
      "status": 1
    }
  ],
  "meta": {
    "total": 2,
    "per_page": 10,
    "page": 1
  }
}
```

### User Detail Format
```json
{
  "id": 38,
  "name": "zhang1",
  "email": "zhang1@test.com",
  "create_time": "2020-04-13T13:58:08Z",
  "update_time": "2020-04-13T13:58:08Z",
  "status": 1
}
```

### PS: 
这个 Api 经常会挂，经常请求不到数据，是为了反馈请求失败的情况，遇到服务器错误的提示，多刷新几次就好了
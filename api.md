# Synchro Gomoku API

## 服务器类型

WebSocket

## 服务器地址

`wss://gomoku.cc:4000`

## 目录

- [棋盘数据](#棋盘数据)
- [数据格式](#数据格式)
- [响应格式](#响应格式)
- [操作模式](#操作模式)
  - [获取服务器版本](#version)
  - [心跳包](#heart)
  - [登录](#login)
  - [加入房间](#join)
  - [落子](#place)
  - [重置房间](#reset)
  - [离开房间](#leave)
- [服务器消息](#服务器消息)
  - [玩家加入](#player-joined)
  - [对方落子](#another-placed)
  - [碰撞事件](#strike)
  - [对方落子](#placed)
  - [棋盘拓展](#extend)
  - [游戏结束](#over)


## 棋盘数据

棋盘数据为一个二位数组就像:

```json
[
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1]
]
```

其中的数值有以下几种类型

| 数值 | 释义         |
| ---- | ------------ |
| `-1` | 未落子       |
| `0`  | 玩家 P1 落子 |
| `1`  | 玩家 P2 落子 |
| `4`  | 碰撞落子     |

## 数据格式

```json
{
    "mode": "your mode",
    "handler": ""
}
```

| 键      | 解释     | nullable |
| ------- | -------- | -------- |
| mode    | 操作模式 | false    |
| handler | 句柄     | true     |

所有 **需得到响应** 的请求基本都会将 `handler` 如实发送回客户端，该键用于将 WebSocket 消息与发送时构成一一对应

## 响应格式

```json
{
    "code": 200,
    "handler": 0
    "message": "messages"
}
```

| 键      | 类型     | 解释                                    |
| ------- | -------- | --------------------------------------- |
| code    | `number` | 响应码，一般情况下 200 为成功           |
| handler | `number` | 句柄，请求时如果有 `handler` 则如实返回 |
| message | `string` | 响应消息，通常为语言文件的键值          |

## 操作模式

**由于 `handler` 只是将请求中的 `handler` 如实返回，故下方文档将省略 `handler` 键**

### version

请求服务器版本号，通常用于确认服务器是否为 Synchro Gomoku Server

#### 请求

```json
{
    "mode": "version"
}
```

#### 响应

```json
{
    "code": 200,
    "message": "Synchro Gomoku Server Version 0.1"
}
```

### heart

发送心跳包，证明该 WebSocket 依然存活

**注意: 若登录后 ~30s 不发送心跳包则本次链接将会被断开**

#### 请求

```json
{
    "mode": "heart"
}
```

#### 响应

```json
{
    "code": 200,
    "message": ""
}
```

### login

用于登录请求，**核心功能之一**，登录成功后会同步很多重要信息

#### 请求

```json
{
    "mode": "login",
    "name": "TestUser"
}
```

| 键   | 类型     | 解释       | nullable |
| ---- | -------- | ---------- | -------- |
| name | `string` | 登录用户名 | false    |

#### 响应

```json
{
    "code": 200,
    "message": "123456",
    "name": "TestUser",
    "status": [
        "TestUser"
    ],
    "chess": [
        [-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1]
    ],
    "started": false,
    "placed": [],
    "passes": [
        0
    ],
    "another_placed": false
}
```

| 键              | 类型         | 解释                                                         |
| --------------- | ------------ | ------------------------------------------------------------ |
| message         | `string`     | 当前房间号，一般情况下新登录的用户会随机分配一个房间号       |
| name            | `string`     | 为用户名，通常情况下将会在用户名后面追加 `_` 和识别码        |
| status          | `string[]`   | 当前房间内所有玩家，长度最高为 2 最低为 0                    |
| chess           | `number[][]` | 当前[棋局数据](#棋盘数据)，新登录的用户会返回一个 `5*5` 的二维数组 |
| started         | `boolean`    | 当前玩家是否已经开始游戏，当有另一个玩家加入后默认为`true`   |
| placed          | `number[]`   | 当前玩家已经放置的 `pre_place` 坐标，为 `chess` 中的坐标     |
| passes          | `number[]`   | 双方玩家的 `pass` 次数，若另一个玩家不存在则长度为 1         |
| andother_placed | `boolean`    | 对方是否已落子                                               |

### join

加入一个房间

#### 请求

```json
{
    "mode": "join",
    "room": "123456"
}
```

| 键   | 类型     | 解释     |
| ---- | -------- | -------- |
| mode | `string` | 操作模式 |
| room | `string` | 房间号   |

### 响应

```json
{
    "code": 200,
    "message": "",
    "status": [
        "TestUser1",
        "TestUser2"
    ]
}
```

| 键      | 类型       | 解释                                           | nullable |
| ------- | ---------- | ---------------------------------------------- | -------- |
| code    | `string`   | 响应码，如果不是`200`则`message`中将是错误信息 | false    |
| message | `string`   | 消息，`200`时为空，否则为错误信息              | false    |
| status  | `string[]` | 加入后玩家列表                                 | true     |

### place

落子请求

#### 请求

```json
{
    "mode": "place",
    "x": 1,
    "y": 1
}
```

| 键   | 类型     | 解释          |
| ---- | -------- | ------------- |
| x    | `number` | 棋盘 `x` 位置 |
| y    | `number` | 棋盘 `y` 位置 |

**当需要 `pass` 请求时，将 `x` 和 `y` 设置为 `-1` 即可**

#### 响应

```json
{
    "code": 200,
    "message": ""
}
```

| 键      | 类型     | 解释                                |
| ------- | -------- | ----------------------------------- |
| message | `string` | 当 `code` 不是 `200` 时将是错误信息 |

### reset

重置房间，需要有另一名玩家才能使用，将会重置棋盘和双方落子状态

#### 请求

```json
{
    "mode": "reset"
}
```

#### 响应

```json
{
    "code": 200,
    "message": ""
}
```

### leave

离开房间，需要有另一名玩家才能使用，将会离开当前房间并随机生成一个房间并加入

#### 请求

```json
{
    "mode": "leave"
}
```

#### 响应

```json
{
    "code": 200,
    "message": ""
}
```



## 服务器消息

**当 `handler` 为 `-1` 时，代表该条消息为服务器消息**

### player-joined

玩家加入消息

```json
{
    "message": "",
    "handler": -1,
    "mode": "player-joined",
    "name": "TestUser1",
    "status": [
        "TestUser1",
        "TestUser2"
    ]
}
```

| 键      | 类型       | 解释                                           |
| ------- | ---------- | ---------------------------------------------- |
| message | `string`   | 消息，在服务器消息时几乎为空                   |
| mode    | `string`   | 消息类型                                       |
| name    | `string`   | 加入的玩家名称                                 |
| status  | `string[]` | 当前房间玩家列表，注意有先后顺序，第`0`位为 P1 |

### another-placed

另一位玩家已经落子事件

```json
{
    "message": "",
    "handler": -1,
    "mode": "another-placed"
}
```

### strike

碰撞事件

```json
{
    "message": "",
    "handler": -1,
    "mode": "strike",
    "count": 1
}
```

| 键    | 类型     | 解释           |
| ----- | -------- | -------------- |
| count | `number` | 当前总碰撞次数 |

### placed

该回合已落子事件

```json
{
    "message": "",
    "handler": -1,
    "mode": "placed",
    "x": 1,
    "y": 1,
    "pass": false
}
```

| 键   | 类型      | 解释              |
| ---- | --------- | ----------------- |
| x    | `number`  | 对方落子 `x` 坐标 |
| y    | `number`  | 对方落子 `y` 坐标 |
| pass | `boolean` | 对方是否 `pass`   |

### extend

棋盘拓展事件

```json
{
    "message": "",
    "handler": -1,
    "mode": "extend",
    "size": 7
}
```

| 键   | 类型     | 解释         |
| ---- | -------- | ------------ |
| size | `number` | 当前棋盘大小 |

### over

游戏结束事件

```json
{
    "message": "",
    "handler": -1,
    "mode": "over",
    "winner": 1
}
```

| 键     | 类型     | 解释                                                    |
| ------ | -------- | ------------------------------------------------------- |
| winner | `number` | 获胜者，为 `status` 中的玩家下标，为 `3` 或 `4`时则平局 |

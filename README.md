<div align="center">

# ⭐ Synchro Gomoku ⭐

_⚫ 网页小游戏 ⚪_

</div>

### 简介

游戏名：同步五子棋 (Synchro Gomoku)

正如其名字一样，玩家双方同时落子

[直接游玩](https://gomoku.cc/) | [API](./api.md)

### 游戏规则
- 游戏玩法类似五子棋，但**双方同时落子**，在落子前无法得知对方落子位置
- 单独一方练成五子则为胜利
- 当双方落子位置相同，则视为「碰撞」
- 「碰撞」后的位置此后将无法落子
- 玩家可以选择 PASS 跳过本次落子，但若双方同时 PASS，则也视为一次「碰撞」
- 棋盘初始大小为 5 × 5，当**双方棋子均落于棋盘边缘过**，则棋盘向外扩展一圈，最大为 15 × 15
- 第一手禁止落于棋盘中心位置

### 平局判定

当达成以下任意一种情况，且没有玩家单独连成五子时，将会根据 PASS 次数判定胜负，若 PASS 次数相同则判定为平局：

- 发生 10 次「碰撞」时
- 棋盘无可落子位置时
- 双方同时连成五子时

### 界面操作

#### 进入游戏
打开网页后等待连接服务器，连接成功后会出现 "Welcome" 弹窗后输入游戏名后按下 "→" 按钮即可

##### 关于后缀
本网站昵称系统类似于 HackChat，在直接输入玩家名后会自动添加 `识别码`

如果需要一个固定的识别码，你可能需要用到 `#` 来固定你的识别码

用法类似于在玩家名后面添加 `#` 和一串固定的内容，就像：`TestUser#test`

但需要确保你后面固定的内容不会被他人冒用，它就像一个密码一样

#### 如何开始
需要另一个玩家进入后自动开始游戏，你可以随时落下你的棋子或选择 PASS

在双方均已落子后才会判定为一个回合的结束

##### 关于玩家状态指示器
玩家棋色指示器右下方会有一个小球，即为 `玩家状态指示器`，它有四个状态：
- 蓝色: 自己
- 粉色: 对方
- 绿色: 已落子
- 灰色: 无玩家

#### 何为 PASS
PASS 顾名思义，即为该回合不落子，并增加 PASS 次数

##### 如何 PASS
在未进行落子的情况下，按下棋盘上方的 `PASS` 按钮，此时你的状态会变为 `已落子`


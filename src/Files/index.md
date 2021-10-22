---
title: Qiji of React
order: 1
---

## Qiji of React

qiji 是基于 Ant Design 设计体系的 React UI 组件库，主要从业务中提取的组件，来提高日常开发效率。

## 兼容性

- 现代浏览器和 IE11（需要 polyfills）。

## 版本

- 最新版：npm V0.0.2

## 安装

#### 使用 npm 或 yarn 安装

推荐使用 npm 或 yarn 的方式进行开发

```
$ npm install qiji --save
```

```
yarn add qiji
```

## 示例

```js
import React from 'react';
import { Remark } from 'qiji';

export default () => (
  <Remark
    text="实践证明，习近平慧眼识珠。多年后，他在《忆大山》一文中这么评价贾大山的工作：“上任伊始，他就下基层、访群众、查问题、定制度，几个月下来，便把原来比较混乱的文化系统整治得井井有条。在任期间，大山为正定文化事业的发展和古文物的研究、保护、维修、发掘、抢救，竭尽了自己的全力。常山影剧院、新华书店、电影院等文化设施的兴建和修复，隆兴寺大悲阁、天宁寺凌霄塔、开元寺钟楼、临济寺澄灵塔、广惠寺华塔、县文庙大成殿的修复，无不浸透着他辛劳奔走的汗水。"
    spamWords={{ high: ['更改'] }}
    onChange={val => {
      console.log(val);
    }}
  />
);
```

## 按需加载

`qiji`的 JS 代码默认支持基于 ES modules 的 tree shaking

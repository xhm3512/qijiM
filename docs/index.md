---
hero:
  title: qiji
  desc: qiji example
  actions:
    - text: Getting Started
      link: /files
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 高效
    desc: 高效
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: 便捷
    desc: 便捷
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: 速度
    desc: 速度
footer: Open-source MIT Licensed | Copyright © 2021<br />Powered by xhm
---

## 轻松上手

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

---
title: Button 按钮
group:
  title: 通用
  order: 1
---

## default

Demo:

```tsx
import React from 'react';
import { Button } from 'qiji';

export default () => <Button onClick={() => alert('onClick')}>default</Button>;
```

## primary

Demo:

```tsx
import React from 'react';
import { Button } from 'qiji';

export default () => <Button type="primary">primary</Button>;
```

## secondary

Demo:

```tsx
import React from 'react';
import { Button } from 'qiji';

export default () => <Button type="secondary">secondary</Button>;
```

## disabled

Demo:

```tsx
import React from 'react';
import { Button } from 'qiji';

export default () => <Button disabled>disabled</Button>;
```

## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> shape -> size -> loading -> disabled。

按钮的属性说明如下：

| 属性     |       说明       |                     类型                      | 默认值  | 版本 |
| -------- | :--------------: | :-------------------------------------------: | :-----: | ---: |
| type     |   设置按钮类型   | `primary、ghost、dashed、link、text、default` | default |      |
| onClick  | 点击按钮时的回调 |               `(event) => void`               |    -    |      |
| disabled |   按钮失效状态   |                    boolean                    |  false  |      |

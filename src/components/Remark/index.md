---
title: Remark 标注
group:
  title: 其他
  order: 10
---

## default

Demo:

```tsx
import React from 'react';
import { Remark } from 'qiji';

export default () => (
  <Remark
    machineWords={{
      high: ['标题'],
      low: ['初始化'],
    }}
    manSpamWords={{
      risk: ['create-dumi-lib'],
    }}
    onSubmitHtml={val => console.log(123, val)}
    text="span  data-check通过官网的 npx @umijs/create-dumi-lib 初始化一个项目之后发现了几个坑记录一下 1.标题按照官网示例操作 vscode 提示找不到正在开发的组件类型 解决方法 1.查看项目中的 package.json 文件 typings 属性路径指向的 index.d.ts..."
  ></Remark>
);
```

---
title: Loadable 组件懒加载
group:
  title: 其他
  order: 8
---

## Loadable 组件懒加载

react 路由懒加载

Demo:

```tsx
import React from 'react';
import { Loadable } from 'qiji';

const Home = Loadable(() =>
  import(/* webpackChunkName: "home" */ '@/components/Remark'),
);
export default () => <Home />;
```

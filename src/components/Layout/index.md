---
title: Layout 布局
group:
  title: 布局
  order: 8
---

## Layout 布局

协助进行页面级整体布局，主要功能经典布局效果（头部和侧边栏 fixed,内容较少时，底部固定在页面最底部；内容超过页面高度时，底部跟随在页面内容后面）。

Demo:

```tsx
import React from 'react';
import { Layout } from 'qiji';
const { Content, Header, Footer, Sider } = Layout;
import './index.less';
export default () => (
  <Layout className="layout-box">
    <Header className="header">Header</Header>
    <Layout className="layout-content-box">
      <Sider width={190} breakpoint="xl" className="sider-box">
        Sider
      </Sider>
      <Content className="content-box">Content</Content>
    </Layout>
    <Footer class="footer">Footer</Footer>
  </Layout>
);
```

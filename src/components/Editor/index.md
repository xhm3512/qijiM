---
title: Editor 富文本编辑器
group:
  title: 其他
  order: 9
---

## BraftEditorCustom 富文本编辑框

基于 braft-editor 二次封装。来适合我们的业务
Demo:

```tsx
import React from 'react';
import { Editor } from 'qiji';

export default () => {
  const onChange = val => {};
  return (
    <Editor
      // id='description'
      // prohibitedWords={'脚手架,空目录'}
      contentStyle={{ height: 132 }}
      placeholder="作品介绍不能为空或者不能多于300字"
      // maxLength={300}
      onChange={onChange}
      value="为了方便使用，dumi 提供了两种不同的脚手架。我们需要先找个地方建个空目录，然后再使用脚手架："
    />
  );
};
```

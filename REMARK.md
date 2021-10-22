# 如何使用 dumi 和 father-build 创建组件库

- 组件搭建参考文档：https://zhuanlan.zhihu.com/p/196758730
- 可视化平台地址：https://qiji.netlify.app/
- 静态网站部署平台：https://app.netlify.com/teams/xhm3512/overview
- demo:https://github.com/qld-cf/dumi-tpl/blob/main/.fatherrc.ts
- father:https://github.com/umijs/father
- 热更新有点慢，试试新出的 MFSU 方案，让热更新回到 500ms 内，详见 https://github.com/umijs/umi/issues/6766
- 配置多个按需引入：https://github.com/ElementUI/babel-plugin-component/pull/52/files
- Invalid hook call. Hooks can only be called inside 解决方案：https://zhuanlan.zhihu.com/p/363288266
- 打包后组建没有引入组件自己的样式解决办法：https://github.com/umijs/dumi/issues/225
- jest:https://www.jestjs.cn/docs/getting-started
- umi-test:https://gitee.com/wxialexiatian/umi-test-demo/blob/master/src/components/Header/index.test.tsx
- enzyme:https://madewith.cn/566 https://enzymejs.github.io/enzyme/ api:https://blog.csdn.net/qq_21895821/article/details/106768635
- 组件脑图：https://blog.csdn.net/weixin_36340672/article/details/112735378

在这个文章中，将会简单的介绍如何使用 dumi 和 father-build 来创建组件库和维护组件库。最终我们会演示如何组织组件库的代码。还有输出一个简单的组件。

## 脚手架初始化

新建一个空文件夹，然后使用脚手架初始化项目。

```bash
mkdir myapp && cd myapp
npx @umijs/create-dumi-lib
# or
yarn create @umijs/dumi-lib
```

值得注意的是，项目中会有两个配置文件。

### .umirc.ts

作为 umi 项目的配置文件，因为 dumi 其实是 umi 在组件库开发这个领域的一个最佳实践。但它本质上还是一个 umi 插件，这意味着，在 umi 上可用的插件，在 dumi 中仅可正常使用，但是是否能够对开发的组件库，产生影响，就需要看对应的插件，是否在这方面进行支持了

### .fatherrc.ts

作为 father-build 的配置文件，这里将会配置，组件库被如何编译和编译产物的类型。一般我们都是针对组件库使用场景，进行简单的声明即可。也就是说，一般设置 `esm: 'rollup',` 就够用了。

## 启动项目

```bash
yarn
yarn start
```

## dumi 的 Demo 理念

> dumi 只有一个理念——**开发者应该像用户一样写 Demo**。

官网上是这么描述的，但是我比较喜欢从开发者的角度去阐述它，**像写业务一样写组件**。
也就是官网上提到的“易于维护”，因为在开发者工具上，比如 VS Code，他的格式化工具，通常都是默认读取文件的后缀名来启用的，也就是说，你在文档的 md 文件中，编写代码，就没有很好的格式化和代码联想功能。（最新的 VS Code，当你标记代码段时，可以使用相对应的代码片段，我这里只是一个举例。）

所以 dumi 支持，直接从其他文件中引入代码的功，这样可以依旧保持编译器的能力。

```bash
<code src="/path/to/Demo.tsx" />
```

### 自动 link

dumi 项目会自动使用别名来对应当前的包名，效果很像是自动 link，就是说，你可以在文档中编写 `import { Foo } from 'dumi-oni';`，然后读者可以直接复制你的代码段，到真实的项目环境中，直接运行，而无需修改引入路径。比如在某些知名的组件库方案中的引入是 `import { Foo } from './index';`。用户复制代码段之后，还要修改 from 的路径。

### 默认文档目录

dumi 会默认使用 `src` 和 `docs` 目录下的 `md` 文件生成对应的文档。

## 创建自己的组件

我们参考 antd 的代码组织方式，来编写一个 button 组件

```ts | prue
// src/Button/index
import React, { FC } from 'react';
import './index.less';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
}
const prefixCls = 'dumi-oni-btn';
const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = 'default',
  disabled,
}) => {
  const className = `${prefixCls} ${prefixCls}-button ${prefixCls}-${type}`;
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
```

对应的样式编写，如下。我们这里使用和 antd 一样的方式来实现。

```less
@btn-prefix-cls: ~'dumi-oni-btn';

.@{btn-prefix-cls} {
  &-button {
    padding: 6px 16px;
    font-size: 12px;
    min-width: 64px;
  }

  &-button[disabled] {
    color: rgba(0, 0, 0, 0.26);
    background-color: rgba(0, 0, 0, 0.12);
  }

  &-default {
  }
  &-primary {
    color: #fff;
    background-color: #1976d2;
  }

  &-secondary {
    color: #fff;
    background-color: #dc004e;
  }
}
```

## 为组件编写用例

```ts | prue
// src/Button/index.md
import React from 'react';
import { Button } from 'qiji';

export default () => <Button onClick={() => alert('onClick')}>default</Button>;
```

dumi 会默认取文档的第一个标题作为菜单栏的名称，你也可以通过注视手动编写名称，如

```bash
---
title: 按钮
---
```

### 运行查看效果

```bash
$ npm start
```

访问开发服务 `http://localhost:8000`。

![demo

## 打包编译

```bash
npm run build
```

编译使用的是 `father-build`，有一个特别需要注意的地方，如果组件中使用到第三方的库，那么需要这些库在 package.json 中的 `dependencies` 或者 `preDependencies` 中，一般的打包出错问题，几乎都是这个原因引起的。注意 `dependencies` 或者 `preDependencies` 中的包是我们需要的依赖，注意将组件库不需要的依赖，移到 `devDependencies` 中，如脚手架创建的项目，最终修改为

```json
"dependencies": {
    "react": "^16.12.0"
  },
  "devDependencies": {
    "@umijs/preset-react": "1.x",
    "@umijs/test": "^3.0.5",
    "dumi": "^1.0.5",
    "father-build": "^1.17.2",
    "lint-staged": "^10.0.7",
    "prettier": "^1.19.1",
    "yorkie": "^2.0.0"
  }
```

## 发布组件库

确定组件库名称，并确定名称未被其他人使用。如这里修改为 `dumi-oni`。然后执行 `npm publish` 将组件库发布到 npm 上。

## 使用组件库

```bash
yarn add dumi-oni
```

在页面中使用

```js
import React from 'react';
import { Button } from 'qiji';

export default () => <Button type="secondary">secondary</Button>;
```

不难发现，其实在项目中使用，和我们 demo 中编写的方式是一致的，这也是我们前面提到的 dumi 的 demo 理念。

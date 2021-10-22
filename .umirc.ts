import { defineConfig } from 'dumi';

// export default defineConfig({
//   title: 'Library Name',
//   // more config: https://d.umijs.org/config
// });
export default defineConfig({
  title: 'qiji',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    {
      title: '文档',
      path: '/files',
    },
    {
      title: '组件',
      path: '/components',
    },
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lean',
        camel2DashComponentName: false,
        customStyleName: name => {
          return `./style/index.less`; // 注意：这里 ./ 不可省略
        },
      },
      'lean',
    ],
  ],
  // more config: https://d.umijs.org/config
});

// 操作快捷键设置（https://www.cnblogs.com/starksoft/p/5844551.html）
const shortCutKeySet = (
  e: { ctrlKey: any; shiftKey: any; keyCode: any },
  callback: any,
) => {
  let keyType = {};
  if (e.ctrlKey && e.shiftKey) {
    // 设置 ctrl+shift
    const keycode = e.keyCode;
    keyType = {
      72: {
        // h
        type: 'high',
        func: 'setFontColor',
        color: '#D9001B',
      },
      83: {
        // s
        type: 'middle',
        func: 'setFontColor',
        color: '#F59A23',
      },
      76: {
        // l
        type: 'low',
        func: 'setFontColor',
        color: '#70B603',
      },
      68: {
        // d
        type: 'risk',
        func: 'setFontColor',
        color: '#8400FF',
      },
      78: {
        // n
        type: 'line',
        func: 'strikeThrough',
      },
      88: {
        // x
        type: 'clear',
        func: 'removeFormat',
      },
    };
    if (keyType[+keycode]) callback(keyType[+keycode]);
  }
};

export default shortCutKeySet;

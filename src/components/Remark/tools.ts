import { colorRgbHight } from './constants';
const clearSelection = () => {
  document.getSelection()?.empty();
};
// 获取鼠标在页面的位置
const getMouseLOcal = (_e: any) => {
  const e = _e || window.event;
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

/**
 *
 * @param {*} obj  当前操作dom
 * @param {*} attr  当前后去属性
 * @returns
 */
function getStyle(obj: any, attr: any) {
  if (obj.currentStyle) {
    // 兼容IE
    return obj.currentStyle[attr];
  }
  return getComputedStyle(obj, null)[attr];
}

/**
 * 获得style样式
 * @param {*} item  dom
 * @returns  样式
 */
const getDomBgColor = item => {
  const styleBack =
    item.nodeName &&
    item.nodeName !== '#text' &&
    (item.getAttribute('style') || item.nodeName === 'STRIKE');
  if (styleBack) {
    return {
      backColor: colorRgbHight[getStyle(item, 'background-color')],
      styleLineThrough:
        getStyle(item, 'text-decoration-line') === 'line-through' ||
        item.nodeName === 'STRIKE'
          ? 'STRIKE'
          : '',
    };
  }
  return {};
};

const domRecursion = (item, tempArr) => {
  const { backColor, styleLineThrough } = getDomBgColor(item);
  const { offsetLeft, offsetWidth, innerText, offsetTop } = item;
  const tempPush = {
    offsetLeft,
    offsetWidth,
    innerText,
    offsetTop,
  };
  if (backColor) {
    tempArr.push({
      ...tempPush,
      type: backColor,
    });
  }
  if (styleLineThrough) {
    tempArr.push({
      ...tempPush,
      type: styleLineThrough,
    });
  }
};
/**
 *  // 过滤数据，活得人审数据
 * @param {*} dom :获取到的所有标签
 * @returns
 */
const filterDomFunc = (dom: any) => {
  const tempArr = [];
  try {
    [].slice.call(dom).forEach((item: any) => {
      const dataCheck = item.getAttribute('data-check');
      const { backColor, styleLineThrough } = getDomBgColor(item);
      // 过滤标注节点
      if (
        item.nodeName !== 'P' &&
        dataCheck !== '1' &&
        (backColor ||
          item.nodeName === 'STRIKE' ||
          styleLineThrough === 'line-through')
      ) {
        domRecursion(item, tempArr);
      }
    });
  } catch (error) {
    console.log('filterDomFunc异常', error);
  }
  return tempArr;
};
// 兼容性处理
function selectDetail() {
  if (window.getSelection) {
    // 一般浏览器
    return window.getSelection();
  }
  const _docment: any = document;
  if (_docment.selection) {
    // IE浏览器、Opera
    return _docment.selection.createRange();
  }
  return null;
}

/**
 * // 是否包含特殊字符,有特殊字符的敏感词就不会展示高亮
 * @param {*} i  当前操作的标注类型
 * @param {*} string  当前需要匹配的字符串
 * @returns
 */
const isContainSpecial = (i: string, string: string | RegExp) => {
  const colorAll = {
    high: 'rgb(217, 0, 27)',
    middle: 'rgb(245, 154, 35)',
    low: 'rgb(112, 182, 3)',
    risk: 'rgb(132, 0, 255)',
  };
  const color = colorAll[i];
  const regOne = `<font color="#ffffff" style=""><span style="background-color: ${color};"></span></font>`;
  const regTwo = `<span style="background-color: ${color};"><font color="#ffffff">.*<\\/font></span>`;
  const regThree = `<font color="#ffffff" style="background-color: ${color};"><font</font>|<span</span></font>`;
  const regFour = `<font style="background-color: ${color};" color="#ffffff"><font</font>|<span</span></font>`;
  const regFive = '<p></p>';
  const regSix = '<strike></strike>';
  if (
    regOne.match(string) ||
    regTwo.match(string) ||
    regThree.match(string) ||
    regFour.match(string) ||
    regFive.match(string) ||
    regSix.match(string)
  ) {
    return false;
  }
  return true;
};
export {
  clearSelection,
  getMouseLOcal,
  filterDomFunc,
  getStyle,
  selectDetail,
  isContainSpecial,
};

import React, { useEffect, useState, useRef } from 'react';
import shortCutKeySet from './shortCutKeySet';
import { colorHight, colorHight16, colorRgbHight } from './constants';
import './style/index.less';
import {
  clearSelection,
  getMouseLOcal,
  filterDomFunc,
  selectDetail,
  isContainSpecial,
} from './tools';
interface PropsRoot {
  text: string;
  manSpamWords?: {
    high?: Array<string>;
    middle?: Array<string>;
    low?: Array<string>;
    risk?: Array<string>;
    line?: Array<string>;
  };
  machineWords?: {
    high?: Array<string>;
    middle?: Array<string>;
    low?: Array<string>;
    risk?: Array<string>;
    line?: Array<string>;
  };
  onSubmitHtml?: Function;
  manSpamHtml?: string;
}
const RemarkText = (props: PropsRoot) => {
  const { text, manSpamWords, machineWords, onSubmitHtml, manSpamHtml } = props;
  const highlighRef = useRef<HTMLDivElement>(null); //MouseEvent<HTMLDivElement, MouseEvent>
  const [boxTop, setBoxTop] = useState('0');
  const [boxLeft, setBoxLeft] = useState('0');
  const [boxOpacity, setopacity] = useState('0');
  // 人审样式处理
  const poppleWordsDetail = () => {
    let tempText = text;
    if (!manSpamWords) return tempText;
    Object.keys(manSpamWords).map((key: string) => {
      const words = manSpamWords[key];
      if (words?.length > 0) {
        words.forEach((item: string | RegExp) => {
          if (!isContainSpecial(key, item)) return;
          const reg = new RegExp(item, 'g');
          if (key === 'line') {
            tempText = tempText.replace(reg, `<strike>${item}</strike>`);
          } else {
            tempText = tempText.replace(
              reg,
              `<font color="#ffffff" style="background-color: ${colorHight[key]};">${item}</font>`,
            );
          }
        });
      }
    });
    return tempText;
  };
  // poppleWordsDetail
  //  机审样式处理
  const machineWordsDetail = (text: any) => {
    let tempText = text;
    if (machineWords) {
      Object.keys(machineWords).map(key => {
        const words = machineWords[key];
        if (words?.length > 0) {
          words.forEach((item: string | RegExp) => {
            if (!isContainSpecial(key, item)) return;
            const reg = new RegExp(item, 'g');
            if (key === 'line') {
              tempText = tempText.replace(
                reg,
                `<strike  data-check='1'>${item}</strike>`,
              );
            } else {
              tempText = tempText.replace(
                reg,
                `<font color=${colorHight16[key]}>${item}</font>`,
              );
            }
          });
        }
      });
      return tempText;
    }
    return tempText;
  };

  /**
   *  // 敏感词分类整理
   * @param {*} tempWordsArr  处理后的所有敏感词
   * @returns
   */
  const classifyWords = (tempWordsArr: any[]) => {
    const words: any = {
      high: [],
      middle: [],
      low: [],
      risk: [],
      line: [],
    };
    tempWordsArr.forEach((item: { text: string; type: string }) => {
      const { text: tempText, type } = item;
      if (type === 'STRIKE') {
        // 是人审划线标注
        const tempLine: Array<string> = words.line;
        if (tempLine.indexOf(tempText) < 0) tempLine.push(tempText); // 去重
      } else {
        // 是人审高亮标注
        const tempBackArr = words[type];
        if (tempBackArr) {
          // 去重
          if (tempBackArr.indexOf(tempText) < 0) tempBackArr.push(tempText);
        }
      }
    });
    return words;
  };
  // 找出敏感词
  const getWords = () => {
    const { current } = highlighRef;
    const dom = current && current.getElementsByTagName('*');
    const filterDom = filterDomFunc(dom);
    const tempWordsArr: any[] = [];
    filterDom.forEach((item: any) => {
      const {
        innerText: text1,
        offsetLeft,
        offsetWidth,
        type,
        offsetTop,
      } = item;

      let flag = true;
      tempWordsArr.forEach((tempWords, i) => {
        if (
          offsetLeft === tempWords.offsetEnd &&
          offsetTop === tempWords.offsetTop &&
          tempWords.type === type
        ) {
          // 表示是相邻两个统一类型的标志
          tempWordsArr[i] = {
            text: tempWords.text += text1,
            offsetLeft: tempWords?.offsetLeft,
            offsetWidth: offsetWidth + tempWords?.offsetWidth,
            offsetEnd: offsetLeft + offsetWidth,
            offsetTop,
            type,
          };
          flag = false;
        }
      });
      if (flag) {
        tempWordsArr[tempWordsArr.length] = {
          text: text1,
          offsetLeft,
          offsetWidth,
          offsetEnd: offsetLeft + offsetWidth,
          type,
          offsetTop,
          qqq: 'STRIKE',
        };
      }
    });
    return classifyWords(tempWordsArr);
  };

  /**
   * // 监听内容发生改变回调
   * @param {*} oldDomHtml
   * flag:是否是清楚操作
   */
  const onHightChange = (oldDomHtml: any) => {
    let _oldDomHtml = oldDomHtml;
    const newDomHtml = highlighRef?.current?.innerHTML || '';
    // 人审高危
    const highwordsArr = getWords();
    if (typeof onSubmitHtml === 'function') {
      onSubmitHtml({ newDomHtml, highwordsArr, machineWords });
    }
    _oldDomHtml = newDomHtml;
  };

  // 划线
  function strikeThrough() {
    const { current } = highlighRef;
    if (current) current.contentEditable = 'true'; // 禁止输入设置
    const tempOldDomHtml = highlighRef?.current?.innerHTML;
    document.execCommand('strikeThrough', false);
    if (current) current.contentEditable = 'false';
    clearSelection();
    onHightChange(tempOldDomHtml);
  }
  // 清除样式
  function removeFormat() {
    const { current } = highlighRef;
    if (current) current.contentEditable = 'true'; // 禁止输入设置
    const tempOldDomHtml = highlighRef?.current?.innerHTML;
    // 执行两次
    document.execCommand('removeFormat', false);
    document.execCommand('removeFormat', false);
    if (current) current.contentEditable = 'false';
    clearSelection();
    onHightChange(tempOldDomHtml);
  }
  // 设置颜色
  function setFontColor(value: string | undefined) {
    const { current } = highlighRef;
    if (current) current.contentEditable = 'true'; // 禁止输入设置
    const tempOldDomHtml = highlighRef?.current?.innerHTML;
    // document.execCommand("forecolor", false, value);
    document.execCommand('forecolor', false, '#ffffff');
    document.execCommand('backColor', false, value);
    if (current) current.contentEditable = 'false';
    clearSelection();
    onHightChange(tempOldDomHtml);
  }

  // 鼠标回弹，获取元素选中位置
  function getDomSelectLOcal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { width } = highlighRef?.current?.getBoundingClientRect() || {};
    try {
      const range = selectDetail().getRangeAt(0);
      if (range.toString() && width) {
        const { x, y } = getMouseLOcal(e);
        setBoxTop(`${y - 54}px`);
        if (x < width && x > width - 160) {
          setBoxLeft(`${x - 160}px`);
        } else {
          setBoxLeft(`${x + 10}px`);
        }
        setopacity('1');
      } else {
        setopacity('0');
      }
    } catch (error) {
      setopacity('0');
    }
  }
  // 失去焦点弹窗隐藏
  const onMouseOutHandle = () => {
    setTimeout(() => {
      setopacity('0');
    }, 400);
  };

  // 快捷键设置
  const setShortCutKeyFunc = (e: any) => {
    shortCutKeySet(e, (obj: { type: any; color: any }) => {
      const { type, color } = obj;
      switch (type) {
        case 'high':
        case 'middle':
        case 'low':
        case 'risk':
          setFontColor(color);
          break;
        case 'line':
          strikeThrough();
          break;
        case 'clear':
          removeFormat();
          break;
        default:
      }
    }); // 设置快捷键
  };
  useEffect(() => {
    const { current } = highlighRef;
    if (!current) return;
    const detailHtml = machineWordsDetail(poppleWordsDetail());
    // 初始化内容
    current.innerHTML = manSpamHtml || detailHtml;
    // 禁止输入设置
    current.addEventListener('keydown', (e: { preventDefault: () => void }) => {
      setShortCutKeyFunc(e); // 高亮快捷键设置
      // e.preventDefault();
    });
    if (typeof onSubmitHtml === 'function') {
      onSubmitHtml({
        newDomHtml: text,
        highwordsArr: manSpamWords,
        machineWords,
      });
    }
  }, []);
  return (
    <>
      <div
        className="box-button-box"
        style={{
          top: boxTop,
          left: boxLeft,
          opacity: boxOpacity,
          zIndex: boxOpacity === '0' ? -1 : 9999,
        }}
      >
        <div className="box-button-inner">
          <button
            className="hight-btn"
            type="button"
            style={{ background: '#D9001B' }}
            onClick={() => setFontColor(colorHight.high)}
          >
            高{' '}
          </button>
          <button
            className="hight-btn"
            type="button"
            style={{ background: '#F59A23' }}
            onClick={() => setFontColor(colorHight.middle)}
          >
            中{' '}
          </button>
          <button
            className="hight-btn"
            type="button"
            style={{ background: '#70B603' }}
            onClick={() => setFontColor(colorHight.low)}
          >
            低{' '}
          </button>
          <button
            className="hight-btn"
            type="button"
            style={{ background: '#8400FF' }}
            onClick={() => setFontColor(colorHight.risk)}
          >
            风{' '}
          </button>
          <button
            className="hight-btn-img"
            type="button"
            onClick={() => removeFormat()}
          >
            <img
              className="hight-img"
              alt=""
              src="//imagev2.xmcdn.com/storages/fdf0-audiofreehighqps/05/38/CKwRIaIFIbPcAAACzQDlurYS.png"
            />{' '}
          </button>
          <button
            className="hight-btn-img"
            type="button"
            onClick={() => strikeThrough()}
          >
            <img
              className="hight-img"
              alt=""
              src="//imagev2.xmcdn.com/storages/c1e0-audiofreehighqps/A7/C3/CKwRIRwFIbPcAAADfgDlurX-.png"
            />{' '}
          </button>
        </div>
      </div>
      <div
        ref={highlighRef}
        className="editableText"
        onMouseUp={e => getDomSelectLOcal(e)}
        // onBlur={onMouseOutHandle}
        tabIndex={0}
        // outline={0}
        // hidefocus="true"
        contentEditable="false"
        suppressContentEditableWarning
        data-test="box"
      ></div>
    </>
  );
};
export default RemarkText;

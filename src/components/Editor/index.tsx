import React, { useState, useEffect } from 'react';
import BraftEditor from 'braft-editor';
import classNames from 'classnames';
import 'braft-editor/dist/index.css';
// import text from './text';
import './style/index.less';
// const words = '毛泽东,共产党'.split(',')
interface PropsInterface {
  type?: 'input' | 'textArea';
  id: string;
  maxLength?: any;
  onChange?: any;
  prohibitedWords?: any;
  contentStyle?: any;
  value?: string;
  placeholder: string;
}
const dislodgeEmpty = (str: string) => {
  return str.replace(/\s+/g, '').replace(/[\n|\r|\r\n]/g, '');
};
export default function(props: any) {
  const {
    type = 'textArea',
    id,
    maxLength,
    onChange,
    prohibitedWords,
    contentStyle,
    placecolor,
    isMaxActive,
    ...aaa
  } = props;
  // const raftEditorClass = {
  //   err: 'raftEditor-box-err',
  //   normal: 'raftEditor-box-normal'
  // }
  const prohibitedWordsTip = (prohibitedWords: string) => {
    // return `请删除修改如上敏感词后再次提交发布：${prohibitedWords.replace(new RegExp(',', 'g'), '、').replace(new RegExp('&&', 'g'), '..')}`
    return `请删除修改如上词组：${prohibitedWords
      .replace(new RegExp(',', 'g'), '、')
      .replace(new RegExp('&&', 'g'), '..')}`;
  };
  // const classes = classNames('tool-tip', raftEditorClass[prohibitedWords ? 'err' : 'normal']);//有违禁词，框框变红逻辑
  const classes = classNames('tool-tip', 'raftEditor-box-normal', placecolor);

  const isString = typeof props.value === 'string' && props.value != '';
  let tempValue = '';
  try {
    tempValue = isString
      ? props.value.replace(/\n/g, '<br/>')
      : props.value || '';
  } catch (error) {
    console.log(error, '富文本编辑框组件异常');
  }
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(tempValue || '', {
      editorId: id,
    }),
  ); // 设置编辑器初始内容)

  const handleEditorChange = (editorStateValue: any) => {
    // onChange(dislodgeEmpty(editorStateValue.toText()))
    onChange(editorStateValue.toText());

    // editorState.isEmpty() 判断内容是否为空
    // editorState.toText()获取没有标签的文本

    setEditorState(editorStateValue);
  };
  const currentTextLength = dislodgeEmpty(editorState.toText()).length;
  if (type === 'textArea') {
    return (
      <div>
        <div className={'raftEditor-box ' + classes} style={contentStyle}>
          <div className="data-count-box">
            <span
              style={{
                color: `${
                  currentTextLength > maxLength && isMaxActive
                    ? 'rgba(250, 40, 0, 1)'
                    : '#222'
                }`,
              }}
            >
              {maxLength ? `${currentTextLength}` : ''}
            </span>
            {maxLength ? `/${maxLength}` : ''}
          </div>
          <BraftEditor
            {...aaa}
            maxLength
            contentStyle={contentStyle}
            onChange={handleEditorChange}
            defaultValue={editorState}
            stripPastedStyles={true} //粘贴过来的内容不带样式
            // value={editorState}
          />
        </div>
        <div className="prohibiti-words-top-box">
          {prohibitedWords && prohibitedWordsTip(prohibitedWords)}
        </div>
      </div>
    );
  } else if (type === 'input') {
    return (
      <div>
        {/* <div className={'raftEditor-box raftEditor-box-input ' + classes} data-count={maxLength ? `${editorState.toText().length}/${maxLength}` : ''} style={contentStyle}> */}
        <div
          className={'raftEditor-box raftEditor-box-input ' + classes}
          style={contentStyle}
        >
          <div className="data-count-box">
            <span className="current-data-length">
              {maxLength ? `${currentTextLength}` : ''}
            </span>
            {maxLength ? `/${maxLength}` : ''}
          </div>
          <BraftEditor
            {...aaa}
            maxLength
            contentStyle={contentStyle}
            onChange={handleEditorChange}
            defaultValue={editorState}
            stripPastedStyles={true} //粘贴过来的内容不带样式
            // value={editorState}
          />
        </div>
        <div className="prohibiti-words-top-box">
          {prohibitedWords && prohibitedWordsTip(prohibitedWords)}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

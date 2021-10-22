import React from 'react';
import { shallow, mount } from 'enzyme';
import Remark from './index';
describe('manSpamHtml相关', () => {
  it('当manSpamHtml为空时，没有机审和人审敏感词，展示text的下发内容', () => {
    const text = '会为背景，描写了封建制度对儿童天性的束';
    const wrapper = mount(<Remark text={text} />);
    const countElem = wrapper.find("[data-test='box']");
    // 期望countElem的内容为text
    expect(countElem.text()).toEqual(text);
  });
});

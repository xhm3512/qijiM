import React from 'react';
import { shallow } from 'enzyme';
import UndoList from './TodoList';
describe('UndoList组件相关', () => {
  it('当列表数据为空时 count 数目为0 列表无内容', () => {
    const wrapper = shallow(<UndoList list={[]} />);

    const countElem = wrapper.find("[data-test='count']");
    const listIEtems = wrapper.find("[data-test='list-item']");

    // 期望countElem属性下的文本为 0
    expect(countElem.text()).toEqual('数据量：0');

    // 期望listIEtems属性的长度为0
    expect(listIEtems.length).toEqual(0);
  });

  it('当列表数据不为空时 count 数目现实数据长度 列表不为空', () => {
    const listData = ['李白', '韩信', '虞姬', '小乔'];

    const wrapper = shallow(<UndoList list={listData} />);

    const countElem = wrapper.find("[data-test='count']");
    const listIEtems = wrapper.find("[data-test='list-item']");

    // 期望countElem属性下的文本为 4
    expect(countElem.text()).toEqual('数据量：4');

    // 期望listIEtems属性的长度为4
    expect(listIEtems.length).toEqual(4);
  });

  it('当列表数据不为空时 点击某个删除按钮 要存在删除按钮', () => {
    const listData = ['李白', '韩信', '虞姬', '小乔'];

    const wrapper = shallow(<UndoList list={listData} />);

    const deleteItems = wrapper.find("[data-test='delete-item']");
    // 这里就根据属性长度来判断就好了
    expect(deleteItems.length).toEqual(4);
  });

  it('当列表数据不为空时 点击某个删除按钮 会调用删除方法', () => {
    const listData = ['李白', '韩信', '虞姬', '小乔'];
    const fn = jest.fn();
    const index = 1;

    const wrapper = shallow(<UndoList deleteItem={fn} list={listData} />);

    const deleteItems = wrapper.find("[data-test='delete-item']");

    // 这里表示模拟执行点击事件 调用deleteItem方法
    // at() 从数组中找到下标
    deleteItems.at(index).simulate('click');

    // 期望调用了这个方法 而且传递了index下标参数 1 进去
    expect(fn).toHaveBeenLastCalledWith(index);
  });

  it('当某一项被点击时 触发执行 changeStatus 函数', () => {
    const listData = ['李白', '韩信', '虞姬', '小乔'];
    const fn = jest.fn();
    const index = 1;

    const wrapper = shallow(<UndoList changeStatus={fn} list={listData} />);

    const changeStatus = wrapper.find("[data-test='list-item']");

    // 这里表示模拟执行点击事件 调用 changeStatus 方法
    // at() 从数组中找到下标
    changeStatus.at(index).simulate('click');

    // 期望调用了这个方法 而且传递了index下标参数 1 进去
    expect(fn).toHaveBeenLastCalledWith(index);
  });
});

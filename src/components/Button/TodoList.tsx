import React, { Component } from 'react';

interface IUndoListProps {
  deleteItem?: Function;
  list: any;
  changeStatus?: Function;
}

class UndoList extends Component<IUndoListProps> {
  render() {
    const { list, deleteItem, changeStatus } = this.props;

    return (
      <div className="content">
        <div className="content-count" data-test="count">
          数据量：{list.length}
        </div>
        <div>
          {list.map((item: string, index: number) => {
            return (
              <div
                className="content-con"
                onClick={() => {
                  changeStatus && changeStatus(index);
                }}
                data-test="list-item"
                key={`${item}-${index}`}
              >
                <div className="content-con">{item}</div>
                <div
                  data-test="delete-item"
                  onClick={() => {
                    deleteItem && deleteItem(index);
                  }}
                >
                  删除
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default UndoList;

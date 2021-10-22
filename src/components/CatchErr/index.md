---
title: CatchErr 异常捕获
group:
  title: 其他
---

## hook

Demo:

```tsx
import * as React from 'react';
const Err = () => {
  return <div>errCom</div>;
};
const abnormalLog = { l: 1, d: 'function', f: 'notice_render', textErr: Err() };
import { CatchErr } from 'qiji';

const FuncFunc = () => {
  return (
    <>
      <div>func</div>
      {/* {hooks} */}
    </>
  );
};

export default CatchErr(abnormalLog)(FuncFunc);
```

## class

Demo:

```tsx
import * as React from 'react';
const Err = () => {
  return <div>errCom</div>;
};
const abnormalLog = { l: 1, d: 'function', f: 'notice_render', textErr: Err() };
import { CatchErr } from 'qiji';
@CatchErr(abnormalLog, 'eeee')
class ClassFunc extends React.Component {
  componentDidMount() {}
  handleClick = () => {
    // throw Error("fff")
    // setTimeout(()=>{
    //     console.log(fff);
    // })
  };
  render() {
    return (
      <div onClick={this.handleClick}>
        class
        {/* {classDemo} */}
      </div>
    );
  }
}

export default ClassFunc;
```

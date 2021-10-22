import * as React from 'react';
import {
  Component,
  ComponentClass,
  FunctionComponent,
  forwardRef,
  Ref,
  ReactNode,
} from 'react';
import DefaultErrorBoundary from './components/DefaultErrorBoundary'; //componentDidCatch
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorProps,
} from './interface/propsInterface';
import { isComponentClass } from './util/index';

const catchreacterror = (abnormalLog: ErrorProps) => (
  InnerComponent: ComponentClass | FunctionComponent,
) => {
  // 是class组件
  if (isComponentClass(InnerComponent)) {
    type ComposedComponentInstance = InstanceType<typeof InnerComponent>; //ts type关键字，用来给一个定义类型取一个新名字

    type ComponnetProps = {
      forwardedRef?: Ref<ComposedComponentInstance>;
      children?: ReactNode;
      abnormalLog?: { l: string; d: string; f: string; textErr: string };
    };
    class WrapperComponent extends Component<ComponnetProps, {}> {
      render() {
        const { forwardedRef } = this.props;
        return (
          <DefaultErrorBoundary {...abnormalLog}>
            {isComponentClass(InnerComponent) ? (
              <InnerComponent {...this.props} ref={forwardedRef} />
            ) : (
              <InnerComponent {...this.props} />
            )}
          </DefaultErrorBoundary>
        );
      }
    }
    return forwardRef<ComposedComponentInstance, ComponnetProps>(
      (props, ref) => <WrapperComponent forwardedRef={ref} {...props} />,
    );
  } else {
    console.log(111, 'function');
    type ComponnetProps = {
      children?: ReactNode;
      abnormalLog?: { l: string; d: string; f: string; textErr: string };
    };

    return (props: ComponnetProps) => (
      <DefaultErrorBoundary {...abnormalLog}>
        <InnerComponent {...props} />
      </DefaultErrorBoundary>
    );
  }
};

export default catchreacterror;

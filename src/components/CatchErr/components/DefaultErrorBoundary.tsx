import * as React from 'react';
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorProps,
} from '../interface/propsInterface';

export class DefaultErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorProps
> {
  readonly state: Readonly<ErrorBoundaryState> = {
    hasError: false,
  };

  static getDerivedStateFromError(err: Error) {
    return {
      hasError: true,
      err,
    };
  }

  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.log('异常上报', err, info);
    this.setState({
      hasError: true,
    });
  }
  render() {
    if (this.state.hasError) {
      return this.props.textErr;
    }
    return this.props.children;
  }
}
export default DefaultErrorBoundary;

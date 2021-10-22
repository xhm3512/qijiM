export function isComponentClass<T>(
  Component: React.ComponentClass<T> | React.StatelessComponent<T>,
): Component is React.ComponentClass<T> {
  return Component.prototype && Component.prototype.render;
}

export function isReactMemo(
  Component:
    | React.MemoExoticComponent<React.ComponentType<any>>
    | React.FunctionComponent,
): Component is React.MemoExoticComponent<React.ComponentType<any>> {
  return typeof Component !== 'function' && !!Component['$$typeof'];
}

export default {
  isComponentClass,
};

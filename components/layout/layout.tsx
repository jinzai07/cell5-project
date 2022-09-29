import { ReactNode } from 'react';

type LayoutProp = {
  children: ReactNode;
};
const Layout = (props: LayoutProp) => {
  return <>{props.children}</>;
};

export default Layout;

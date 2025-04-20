declare module 'react-scroll' {
  import * as React from 'react';

  export interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
    to: string;
    containerId?: string;
    activeClass?: string;
    spy?: boolean;
    smooth?: boolean;
    offset?: number;
    duration?: number;
    delay?: number;
    isDynamic?: boolean;
    onSetActive?: (to: string) => void;
    onSetInactive?: (to: string) => void;
    ignoreCancelEvents?: boolean;
  }

  export class Link extends React.Component<LinkProps> {}
}

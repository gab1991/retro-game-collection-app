/* eslint-disable import/no-default-export */

declare module '*.scss' {
  const content: { [key: string]: string };
  export default content;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

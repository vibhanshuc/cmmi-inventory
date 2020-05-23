import { lazy } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function getPageNameFromPathName(pathname) {
  return pathname
    .split('/')
    .filter((item) => item !== '/')
    .join('');
}

export const lazyLoadWithDelay = (componentPath, delay = 300) => {
  return lazy(() => {
    return Promise.all([
      componentPath(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([moduleExports]) => moduleExports);
  });
};

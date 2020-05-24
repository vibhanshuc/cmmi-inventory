import { lazy } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function getPageNameFromPathName(pathname) {
  return pathname
    .split('/')
    .filter((item) => item !== '/')
    .join('');
}

export function getIdFromParams(pathName) {
  const parts = pathName.split('/types/');

  if (parts.length > 1) {
    return parts[1];
  }
  return undefined;
}

export const lazyLoadWithDelay = (componentPath, delay = 300) => {
  return lazy(() => {
    return Promise.all([
      componentPath(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([moduleExports]) => moduleExports);
  });
};

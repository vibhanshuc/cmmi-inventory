// eslint-disable-next-line import/prefer-default-export
export function getPageNameFromPathName(pathname) {
  console.log(
    { pathname },
    pathname
      .split('/')
      .filter((item) => item !== '/')
      .join(''),
  );
  return pathname
    .split('/')
    .filter((item) => item !== '/')
    .join('');
}

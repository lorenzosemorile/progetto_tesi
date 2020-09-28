export const read_cookie = () => {

  let cookie = document.cookie;
  if (typeof cookie !== 'string') return {};
  cookie = cookie.split('; ');
  cookie = cookie.find(row => row.startsWith('emotional')) || '';

  if (!cookie) return {};
  cookie = cookie.split('=')[1];
  return JSON.parse(cookie);

};
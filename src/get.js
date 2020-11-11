let cache = {};
let errors = {};

module.exports = async function (url) {
  if (cache[url]) return cache[url];

  if (errors[url]) return null;

  const res = await fetch(url);
  if (res.status === 200) {
    let svg = await res.text();
    cache[url] = svg;
    return svg;
  } else {
    errors[url] = true;
    return null;
  }
};
